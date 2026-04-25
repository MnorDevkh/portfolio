<script setup lang="ts">
import { projects } from '../data/portfolio'
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <h2>Projects</h2>
      <p class="lede">Three representative builds — descriptions are illustrative portfolio samples.</p>
      <ul class="cards">
        <li v-for="project in projects" :key="project.title" class="card">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <ul class="stack" aria-label="Tech stack">
            <li v-for="t in project.stack" :key="t">{{ t }}</li>
          </ul>
          <a class="card__link" :href="project.href" @click.prevent>View project (placeholder)</a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.lede {
  max-width: 42rem;
  margin-bottom: 2rem;
}

.cards {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.25rem;
}

.card {
  padding: 1.35rem 1.5rem;
  border-radius: var(--radius);
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.stack {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.stack li {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.card__link {
  margin-top: auto;
  font-weight: 600;
  text-decoration: none;
  align-self: flex-start;
}

.card__link:hover {
  text-decoration: underline;
}
</style>
