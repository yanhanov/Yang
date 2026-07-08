<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollFrame } from '@/shared/lib'

const bar = ref(null)
let docHeight = 0

const updateDocHeight = () => {
  docHeight = document.documentElement.scrollHeight - window.innerHeight
}

useScrollFrame(() => {
  const el = bar.value
  if (!el) return

  const pct = docHeight > 0 ? window.scrollY / docHeight : 0
  el.style.transform = `scaleX(${pct})`
})

onMounted(() => {
  updateDocHeight()
  window.addEventListener('resize', updateDocHeight, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDocHeight)
})
</script>

<template>
  <div ref="bar" class="scroll-progress" aria-hidden="true" />
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  z-index: 200;
  transform: scaleX(0);
  transform-origin: left center;
  background: linear-gradient(90deg, var(--brand), #0c73b8);
  box-shadow: 0 0 12px var(--brand);
  contain: strict;
  will-change: transform;
}
</style>
