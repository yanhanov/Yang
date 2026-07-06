<script setup>
import { computed } from 'vue'
import { techIconMap } from '@/entities/tech'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 28,
  },
})

const src = computed(() => {
  const file = techIconMap[props.name]
  return file ? `/icons/tech/${file}.svg` : null
})
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :width="size"
    :height="size"
    :alt="name"
    class="tech-icon shrink-0"
    loading="lazy"
    decoding="async"
  />
  <span
    v-else
    class="tech-icon-fallback inline-flex items-center justify-center rounded-md bg-[var(--brand-dim)] color-brand base-font text-[0.6em] font-medium"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    {{ name.slice(0, 2).toUpperCase() }}
  </span>
</template>

<style scoped>
.tech-icon {
  display: block;
  object-fit: contain;
}
</style>
