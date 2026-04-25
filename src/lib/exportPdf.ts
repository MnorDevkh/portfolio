import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

const PDF_FILENAME = 'BoeurnMnor_Final.pdf'
/** [top, left, bottom, right] in mm (matches html2pdf) */
const MARGIN_MM: [number, number, number, number] = [12, 12, 12, 12]
const A4: { w: number; h: number } = { w: 210, h: 297 }

function waitForImages(container: HTMLElement): Promise<void> {
  const imgs = [...container.querySelectorAll('img')]
  return Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalHeight > 0) {
            resolve()
            return
          }
          const done = () => resolve()
          img.addEventListener('load', done, { once: true })
          img.addEventListener('error', done, { once: true })
        }),
    ),
  ).then(() => undefined)
}

/** Wait and decode so html2canvas sees decoded bitmaps. */
async function ensureImagesDecodable(root: HTMLElement): Promise<void> {
  await waitForImages(root)
  for (const img of root.querySelectorAll<HTMLImageElement>('img')) {
    if (img.decode) {
      try {
        await img.decode()
      } catch {
        /* ignore */
      }
    }
  }
}

/**
 * Puts the resume in the viewport (still hidden behind a zero-opacity trick is avoided:
 * we use a fixed, high z-index, normal opacity, so the pixels exist for canvas).
 * Original `.pdf-root` is off-screen; we override for capture.
 */
const CAPTURE_OVERRIDES: Record<string, string> = {
  position: 'fixed',
  left: '0',
  top: '0',
  // Above app chrome so it actually paints
  zIndex: '2147483000',
  width: '794px',
  maxWidth: '100vw',
  margin: '0',
  opacity: '1',
  visibility: 'visible',
  pointerEvents: 'none',
  transform: 'none',
  overflow: 'visible',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  color: '#0f172a',
}

function getInnerMm(): { innerW: number; innerH: number } {
  const [top, left, bottom, right] = MARGIN_MM
  return { innerW: A4.w - left - right, innerH: A4.h - top - bottom }
}

function buildPdfFromCanvas(canvas: HTMLCanvasElement, filename: string): void {
  const { innerW, innerH } = getInnerMm()
  const m = MARGIN_MM
  const fullH = canvas.height
  const fullW = canvas.width
  if (fullW < 1 || fullH < 1) {
    throw new Error('Snapshot had no painted pixels. Try a different browser or turn off content blockers.')
  }

  // Match one PDF page to this canvas width (same as html2pdf: slice by inner aspect)
  const innerRatio = innerH / innerW
  const pxPageH = Math.floor(fullW * innerRatio)
  if (pxPageH < 1) {
    throw new Error('Page layout math failed during PDF build.')
  }

  const nPages = Math.max(1, Math.ceil(fullH / pxPageH))
  const pageCanvas = document.createElement('canvas')
  const ctx = pageCanvas.getContext('2d')!
  pageCanvas.width = fullW

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const quality = 0.92
  const imgFormat = 'JPEG' as const

  for (let page = 0; page < nPages; page++) {
    const y0 = page * pxPageH
    const sliceH = Math.min(pxPageH, fullH - y0)
    if (sliceH < 1) break

    pageCanvas.height = sliceH
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, fullW, sliceH)
    ctx.drawImage(canvas, 0, y0, fullW, sliceH, 0, 0, fullW, sliceH)

    const hMm = (sliceH * innerW) / fullW
    const imgData = pageCanvas.toDataURL('image/jpeg', quality)
    if (!imgData || imgData.length < 32) {
      throw new Error('Snapshot could not be encoded. Photo may be blocked; try a different browser.')
    }
    if (page > 0) pdf.addPage()
    pdf.addImage(imgData, imgFormat, m[1], m[0], innerW, hMm)
  }

  const blob = pdf.output('blob') as Blob
  if (!blob || blob.size < 300) {
    throw new Error('Generated PDF is empty or invalid.')
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Renders the resume to a PDF: capture with html2canvas, then jsPDF (no html2pdf.js).
 */
export async function downloadResumePdf(source: HTMLElement): Promise<void> {
  const prevCss = source.style.cssText
  Object.assign(source.style, CAPTURE_OVERRIDES)
  // Ensure the layout pass sees our styles
  const prevA11y = source.getAttribute('aria-hidden')
  source.setAttribute('aria-hidden', 'false')

  try {
    await ensureImagesDecodable(source)
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())))

    const w = Math.max(source.scrollWidth, source.offsetWidth, 200)
    const h = Math.max(source.scrollHeight, source.offsetHeight, 200)
    if (w < 4 || h < 4) {
      throw new Error('Resume is not layed out yet. Wait a moment and try again.')
    }

    const scale = 2
    // Do not pass width/height — on some layouts it zeros or blanks the render.
    const canvas = await html2canvas(source, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 20_000,
    })
    if (canvas.width < 2 || canvas.height < 2) {
      throw new Error('The snapshot had no size. If this repeats, try another browser or disable ad blockers.')
    }

    buildPdfFromCanvas(canvas, PDF_FILENAME)
  } finally {
    source.setAttribute('aria-hidden', prevA11y ?? 'true')
    source.style.cssText = prevCss
  }
}

export const downloadPdf = downloadResumePdf
