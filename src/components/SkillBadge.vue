<script setup lang="ts">
import type { SkillIconKey } from '../skillIconMap'
import { skillIconComponents } from '../skillIconMap'

defineProps<{
  iconKey: SkillIconKey
  label: string
}>()
</script>

<template>
  <span class="skill-badge">
    <component
      :is="skillIconComponents[iconKey]"
      class="skill-badge__icon"
      :size="22"
      stroke="1.5"
      aria-hidden="true"
    />
    <span class="skill-badge__label">{{ $props.label }}</span>
  </span>
</template>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9rem;
}

.skill-badge__icon {
  flex-shrink: 0;
  color: var(--accent);
}

.skill-badge__label {
  line-height: 1.2;
}
</style>
