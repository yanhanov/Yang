<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero page-top-gradient relative overflow-hidden mb-8">
    <div class="page-top-gradient__mesh" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--left" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--right" aria-hidden="true" />

    <div class="page-hero__inner container relative text-center">
      <p v-if="label" class="section-label mb-3">{{ label }}</p>
      <h1 class="gradient-text text-4xl md:text-5xl secont-font font-medium tracking-tight">
        {{ title }}
      </h1>
      <p
        v-if="subtitle"
        class="mt-3 text-[var(--text-muted)] max-w-lg mx-auto text-sm md:text-base"
      >
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17rem;
  border-bottom: 1px solid var(--border-accent);
}

.page-hero__inner {
  width: 100%;
  padding: 0;
}

@media (min-width: 768px) {
  .page-hero {
    min-height: 12.5rem;
    padding-bottom: 1.75rem;
  }
}
</style>
