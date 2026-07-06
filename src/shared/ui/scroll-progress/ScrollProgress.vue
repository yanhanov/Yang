<script setup>
import { ref } from 'vue'
import { useScrollFrame } from '@/shared/lib'

const bar = ref(null)

useScrollFrame(() => {
  const el = bar.value
  if (!el) return

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
  el.style.width = `${pct}%`
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
  height: 2px;
  z-index: 200;
  background: linear-gradient(90deg, var(--brand), #0c73b8);
  box-shadow: 0 0 12px var(--brand);
  contain: strict;
}
</style>
