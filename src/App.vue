<script setup lang="ts">
import { ref, unref } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import ContactSection from './components/ContactSection.vue'
import PdfResume from './components/PdfResume.vue'
import SiteFooter from './components/SiteFooter.vue'
import { downloadResumePdf } from './lib/exportPdf'

const pdfBusy = ref(false)
const pdfResumeRef = ref<InstanceType<typeof PdfResume> | null>(null)

async function onExportPdf() {
  if (pdfBusy.value) return
  // Exposed template ref may still be a Ref; unref so the export always gets a real HTMLElement.
  const el = unref(pdfResumeRef.value?.rootEl) ?? document.getElementById('pdf-root')
  if (!el) return
  pdfBusy.value = true
  try {
    await downloadResumePdf(el)
  } catch (e) {
    console.error(e)
    window.alert('Could not generate the PDF in this browser. Try again or use Print to PDF from the browser menu.')
  } finally {
    pdfBusy.value = false
  }
}

function scrollToSkills() {
  document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="page">
    <SiteHeader :busy="pdfBusy" @export-pdf="onExportPdf" />
    <main>
      <HeroSection :busy="pdfBusy" @export-pdf="onExportPdf" @scroll-skills="scrollToSkills" />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection :busy="pdfBusy" @export-pdf="onExportPdf" />
    </main>
    <SiteFooter />
    <PdfResume ref="pdfResumeRef" />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100svh;
}

main {
  flex: 1;
}
</style>
