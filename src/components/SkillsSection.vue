<script setup lang="ts">
import { skillGroups } from '../data/portfolio'
import SkillBadge from './SkillBadge.vue'
</script>

<template>
  <section id="skills" class="section section--alt">
    <div class="container">
      <h2>Skills</h2>
      <p class="lede">Technologies and tools I work with across the stack.</p>
      <div class="groups">
        <article v-for="group in skillGroups" :key="group.title" class="group">
          <h3>{{ group.title }}</h3>
          <div class="badges">
            <SkillBadge v-for="item in group.items" :key="item.label" :icon-key="item.iconKey" :label="item.label" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lede {
  max-width: 42rem;
  margin-bottom: 2rem;
}

.groups {
  display: grid;
  gap: 2rem;
}

.group {
  padding: 1.25rem 1.35rem;
  border-radius: var(--radius);
  background: var(--bg);
  border: 1px solid var(--border);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
