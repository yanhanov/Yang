<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero">
    <div class="page-hero__backdrop" aria-hidden="true">
      <div class="page-hero__glow" />
    </div>

    <div class="page-hero__inner container">
      <p v-if="label" class="section-label page-hero__label">{{ label }}</p>
      <h1 class="page-hero__title secont-font">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero__subtitle">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  margin-top: -3.75rem;
  padding: calc(3.75rem + 2.75rem) 0 2.5rem;
  overflow: hidden;
  isolation: isolate;
  background: var(--surface);
}

.page-hero__backdrop {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(34, 38, 45, 0.55) 0%, transparent 100%);
}

.page-hero__glow {
  position: absolute;
  top: -40%;
  left: 50%;
  width: min(36rem, 90vw);
  height: 12rem;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(18, 247, 214, 0.14) 0%,
    rgba(18, 247, 214, 0.04) 45%,
    transparent 72%
  );
}

.page-hero__inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.page-hero__label {
  margin-bottom: 0.75rem;
}

.page-hero__title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text);
}

.page-hero__subtitle {
  margin: 0.875rem auto 0;
  max-width: 32rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-muted);
}

@media (min-width: 768px) {
  .page-hero {
    padding: calc(3.75rem + 3.25rem) 0 3rem;
  }

  .page-hero__subtitle {
    font-size: 1rem;
  }
}
</style>
