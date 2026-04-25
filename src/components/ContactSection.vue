<script setup lang="ts">
import { person } from '../data/portfolio'

defineProps<{
  busy: boolean
}>()

const emit = defineEmits<{
  exportPdf: []
}>()
</script>

<template>
  <section id="contact" class="section section--alt">
    <div class="container contact">
      <h2>Contact</h2>
      <p class="lede">Reach me by email or connect on LinkedIn and GitHub.</p>
      <p class="pdf-row">
        <button
          type="button"
          class="btn-pdf"
          :disabled="busy"
          @click="emit('exportPdf')"
        >
          {{ busy ? 'Generating PDF…' : 'Download resume as PDF' }}
        </button>
      </p>
      <ul class="actions">
        <li>
          <a class="pill pill--primary" :href="`mailto:${person.email}`">{{ person.email }}</a>
        </li>
        <li>
          <a
            class="pill pill--outline"
            :href="person.linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
          </a>
        </li>
        <li>
          <a
            class="pill pill--outline"
            :href="person.github"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.lede {
  max-width: 42rem;
  margin-bottom: 1rem;
}

.pdf-row {
  margin: 0 0 1.25rem;
}

.btn-pdf {
  border-radius: 10px;
  font: inherit;
  font-weight: 600;
  padding: 0.55rem 1rem;
  cursor: pointer;
  border: 1px solid rgba(56, 189, 248, 0.5);
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3);
}

.btn-pdf:hover:not(:disabled) {
  filter: brightness(1.05);
}

.btn-pdf:disabled {
  opacity: 0.65;
  cursor: wait;
}

.actions {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  align-items: flex-start;
}

.pill {
  display: inline-block;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  border: 1px solid var(--border);
  max-width: 100%;
  word-break: break-word;
}

.pill--primary {
  background: var(--accent-dim);
  color: var(--accent);
  border-color: rgba(56, 189, 248, 0.35);
}

.pill--outline {
  background: transparent;
  color: var(--text);
  border-color: rgba(148, 163, 184, 0.45);
}

.pill--outline:hover {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
