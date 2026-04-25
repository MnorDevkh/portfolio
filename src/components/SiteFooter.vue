<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p>© {{ year }} Boeurn Mnor. Static client-side portfolio — no server runtime.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-block: 1.5rem;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.88rem;
}

.footer__inner {
  text-align: center;
}
</style>
