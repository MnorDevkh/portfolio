import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Jimp } from 'jimp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../public/icons')
mkdirSync(outDir, { recursive: true })

async function writeSquare(size, filename) {
  const image = new Jimp({ width: size, height: size, color: '#0f172a' })
  await image.write(join(outDir, filename))
}

await writeSquare(192, 'pwa-192x192.png')
await writeSquare(512, 'pwa-512x512.png')
await writeSquare(512, 'pwa-512x512-maskable.png')
