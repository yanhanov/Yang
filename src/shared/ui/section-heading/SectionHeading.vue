<script setup>
defineProps({
  label: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  center: { type: Boolean, default: true },
})
</script>

<template>
  <div class="mb-12" :class="center ? 'text-center' : ''">
    <p v-if="label" class="section-label mb-3">{{ label }}</p>
    <h2 class="secont-font text-3xl md:text-5xl font-medium tracking-tight">{{ title }}</h2>
    <p v-if="subtitle" class="mt-3 text-[var(--text-muted)] max-w-lg" :class="center ? 'mx-auto' : ''">
      {{ subtitle }}
    </p>
  </div>
</template>
