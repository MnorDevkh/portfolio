<script setup lang="ts">
import { ref } from 'vue'
import { person, projects, skillGroups } from '../data/portfolio'
import profilePhotoUrl from '../assets/BoeurnMnor.JPG'

const rootEl = ref<HTMLElement | null>(null)

defineExpose({ rootEl })
</script>

<template>
  <div id="pdf-root" ref="rootEl" class="pdf-root" aria-hidden="true">
    <header class="pdf-root__header">
      <img
        class="pdf-root__photo"
        :src="profilePhotoUrl"
        width="120"
        height="120"
        alt=""
      />
      <div>
        <h1 class="pdf-root__name">{{ person.name }}</h1>
        <p class="pdf-root__title">{{ person.title }}</p>
        <p class="pdf-root__contact">{{ person.email }}</p>
      </div>
    </header>

    <section class="pdf-block">
      <h2>About</h2>
      <p v-for="(para, i) in person.bioParagraphs" :key="i" class="pdf-p">{{ para }}</p>
    </section>

    <section class="pdf-block">
      <h2>Skills</h2>
      <div v-for="group in skillGroups" :key="group.title" class="pdf-skill-group">
        <h3>{{ group.title }}</h3>
        <p class="pdf-p">{{ group.items.map((x) => x.label).join(' · ') }}</p>
      </div>
    </section>

    <section class="pdf-block">
      <h2>Projects</h2>
      <article v-for="p in projects" :key="p.title" class="pdf-project">
        <h3>{{ p.title }}</h3>
        <p class="pdf-p">{{ p.description }}</p>
        <p class="pdf-p pdf-p--muted"><strong>Stack:</strong> {{ p.stack.join(', ') }}</p>
      </article>
    </section>

    <section class="pdf-block pdf-block--last">
      <h2>Contact</h2>
      <p class="pdf-p">{{ person.email }}</p>
      <p class="pdf-p">LinkedIn: {{ person.linkedin }}</p>
      <p class="pdf-p">GitHub: {{ person.github }}</p>
    </section>
  </div>
</template>

<style scoped>
.pdf-root {
  position: absolute;
  left: -12000px;
  top: 0;
  width: 190mm;
  max-width: 720px;
  padding: 14mm 12mm;
  background: #ffffff;
  color: #0f172a;
  font-family: 'Segoe UI', system-ui, sans-serif;
  font-size: 11pt;
  line-height: 1.45;
  box-sizing: border-box;
}

.pdf-root__header {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #cbd5e1;
}

.pdf-root__photo {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #38bdf8;
  flex-shrink: 0;
}

.pdf-root__name {
  margin: 0 0 4px;
  font-size: 22pt;
  color: #0f172a;
}

.pdf-root__title {
  margin: 0 0 6px;
  font-size: 12pt;
  color: #0369a1;
  font-weight: 600;
}

.pdf-root__contact {
  margin: 0;
  font-size: 10pt;
  color: #334155;
}

.pdf-block {
  margin-bottom: 12px;
  page-break-inside: avoid;
}

.pdf-block--last {
  margin-bottom: 0;
}

.pdf-block h2 {
  margin: 0 0 6px;
  font-size: 12pt;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 2px;
}

.pdf-skill-group h3,
.pdf-project h3 {
  margin: 8px 0 4px;
  font-size: 10.5pt;
  color: #1e293b;
}

.pdf-p {
  margin: 0 0 6px;
  color: #334155;
}

.pdf-p--muted {
  color: #64748b;
  font-size: 10pt;
}

.pdf-project {
  page-break-inside: avoid;
  margin-bottom: 8px;
}
</style>
