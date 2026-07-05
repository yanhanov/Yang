<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const glow = ref(null)
let visible = false

const onMove = (e) => {
  const el = glow.value
  if (!el) return

  el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`

  if (!visible) {
    visible = true
    el.style.opacity = '1'
  }
}

const onLeave = () => {
  const el = glow.value
  if (!el) return
  visible = false
  el.style.opacity = '0'
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  window.addEventListener('mousemove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  document.documentElement.removeEventListener('mouseleave', onLeave)
})
</script>

<template>
  <div ref="glow" class="cursor-glow" aria-hidden="true" />
</template>

<style scoped>
.cursor-glow {
  position: fixed;
  left: 0;
  top: 0;
  width: 480px;
  height: 480px;
  margin: -240px 0 0 -240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 247, 214, 0.07) 0%, transparent 65%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  will-change: transform;
  transition: opacity 0.4s ease;
}
</style>
