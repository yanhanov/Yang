<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero page-top-gradient relative overflow-hidden py-16 md:py-20 mb-8">
    <div class="page-top-gradient__mesh" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--left" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--right" aria-hidden="true" />

    <div class="container relative text-center">
      <p v-if="label" class="section-label mb-4">{{ label }}</p>
      <h1 class="gradient-text text-4xl md:text-6xl secont-font font-medium tracking-tight">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 text-[var(--text-muted)] max-w-lg mx-auto">{{ subtitle }}</p>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  border-bottom: 1px solid var(--border-accent);
}
</style>
