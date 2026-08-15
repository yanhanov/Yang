<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero">
    <div class="page-hero__inner">
      <p v-if="label" class="page-hero__label">{{ label }}</p>
      <h1 class="page-hero__title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 4.5rem 0 0;
  background: transparent;
  color: var(--now-ink);
  font-family: var(--now-font);
}

.page-hero__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 0 1.25rem;
  box-sizing: border-box;
  text-align: left;
}

.page-hero__label {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.page-hero__title {
  margin: 0;
  max-width: 42rem;
  font-size: clamp(2.4rem, 7vw, 4.25rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.05em;
  color: var(--now-ink);
}

.page-hero__subtitle {
  margin: 1rem 0 0;
  max-width: 32rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--now-muted);
}

@media (min-width: 48rem) {
  .page-hero {
    padding-top: 5rem;
  }
}
</style>
