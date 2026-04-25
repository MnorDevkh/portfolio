<script setup lang="ts">
defineProps<{
  busy: boolean
}>()

const emit = defineEmits<{
  exportPdf: []
}>()

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <a class="header__brand" href="#" @click.prevent="scrollTo('top')">Boeurn Mnor</a>
      <nav class="header__nav" aria-label="Primary">
        <button type="button" class="header__link" @click="scrollTo('about')">About</button>
        <button type="button" class="header__link" @click="scrollTo('skills')">Skills</button>
        <button type="button" class="header__link" @click="scrollTo('projects')">Projects</button>
        <button type="button" class="header__link" @click="scrollTo('contact')">Contact</button>
      </nav>
      <div class="header__actions">
        <button
          type="button"
          class="btn btn--primary"
          :disabled="busy"
          @click="emit('exportPdf')"
        >
          {{ busy ? 'Generating…' : 'Download PDF' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 18, 32, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
}

.header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1rem;
  padding-block: 0.65rem;
}

.header__brand {
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}

.header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  justify-content: center;
}

.header__link {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font: inherit;
  cursor: pointer;
  padding: 0.35rem 0.55rem;
  border-radius: 8px;
}

.header__link:hover {
  color: var(--text);
  background: rgba(148, 163, 184, 0.08);
}

.header__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.btn {
  border-radius: 10px;
  font: inherit;
  font-weight: 600;
  padding: 0.55rem 0.9rem;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
}

.btn:disabled {
  opacity: 0.65;
  cursor: wait;
}

.btn--primary {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
  color: #0f172a;
  border-color: rgba(56, 189, 248, 0.5);
  box-shadow: 0 4px 18px rgba(14, 165, 233, 0.35);
}

.btn--primary:hover:not(:disabled) {
  filter: brightness(1.05);
}

.btn--ghost {
  background: transparent;
  color: var(--accent);
  border-color: rgba(56, 189, 248, 0.45);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--accent-dim);
}

@media (max-width: 720px) {
  .header__inner {
    justify-content: center;
  }

  .header__actions {
    width: 100%;
    justify-content: center;
  }
}
</style>
