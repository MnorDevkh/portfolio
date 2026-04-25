<script setup lang="ts">
import { person } from '../data/portfolio'
import profilePhotoUrl from '../assets/BoeurnMnor.JPG'

defineProps<{
  busy: boolean
}>()

const emit = defineEmits<{
  exportPdf: []
  scrollSkills: []
}>()
</script>

<template>
  <section id="top" class="hero section">
    <div class="hero__grid container">
      <div class="hero__photo-wrap">
        <img
          class="hero__photo"
          :src="profilePhotoUrl"
          width="200"
          height="200"
          alt="Portrait of Boeurn Mnor"
        />
      </div>
      <div class="hero__content">
        <p class="hero__eyebrow">Portfolio &amp; resume</p>
        <h1>{{ person.name }}</h1>
        <p class="hero__title">{{ person.title }}</p>
        <div id="about" class="hero__bio">
          <p v-for="(para, i) in person.bioParagraphs" :key="i">{{ para }}</p>
        </div>
        <div class="hero__cta">
          <button
            type="button"
            class="btn btn--primary btn--large"
            :disabled="busy"
            @click="emit('exportPdf')"
          >
            {{ busy ? 'Generating PDF…' : 'Download PDF' }}
          </button>
          <button type="button" class="btn btn--ghost btn--large" @click="emit('scrollSkills')">
            View skills
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 220px) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 2.75rem);
  align-items: start;
}

.hero__photo-wrap {
  justify-self: center;
}

.hero__photo {
  width: min(200px, 70vw);
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(56, 189, 248, 0.35);
  box-shadow: var(--shadow);
  background: var(--surface);
}

.hero__eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.72rem;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.hero__title {
  font-size: clamp(1.1rem, 2.5vw, 1.35rem);
  color: var(--accent);
  font-weight: 600;
  margin: 0 0 1.25rem;
}

.hero__bio {
  margin-bottom: 1.5rem;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.btn {
  border-radius: 10px;
  font: inherit;
  font-weight: 600;
  padding: 0.65rem 1.15rem;
  cursor: pointer;
  border: 1px solid transparent;
}

.btn:disabled {
  opacity: 0.65;
  cursor: wait;
}

.btn--large {
  font-size: 1rem;
}

.btn--primary {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: #0f172a;
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 4px 18px rgba(14, 165, 233, 0.35);
}

.btn--ghost {
  background: transparent;
  color: var(--accent);
  border-color: rgba(56, 189, 248, 0.45);
}

@media (max-width: 640px) {
  .hero__grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__cta {
    justify-content: center;
  }
}
</style>
