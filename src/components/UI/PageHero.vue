<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
})
</script>

<template>
  <section class="page-hero relative overflow-hidden py-16 md:py-20 mb-8">
    <div class="gradient-orb gradient-orb--teal w-64 h-64 -top-20 right-0 opacity-20" />
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
  background: radial-gradient(ellipse 60% 80% at 50% 0%, rgba(18, 247, 214, 0.08), transparent);
}
</style>
