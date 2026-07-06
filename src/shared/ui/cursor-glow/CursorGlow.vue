<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRafThrottle } from '@/shared/lib'

const glow = ref(null)
let visible = false
let throttle
let moveHandler

const applyMove = (e) => {
  const el = glow.value
  if (!el) return

  el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`

  if (!visible) {
    visible = true
    el.style.opacity = '1'
  }
}

const onLeave = () => {
  throttle?.cancel()
  const el = glow.value
  if (!el) return
  visible = false
  el.style.opacity = '0'
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.matchMedia('(pointer: fine)').matches) return

  throttle = useRafThrottle(applyMove)
  moveHandler = throttle.handler
  window.addEventListener('mousemove', moveHandler, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  throttle?.cancel()
  if (moveHandler) window.removeEventListener('mousemove', moveHandler)
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
  width: 360px;
  height: 360px;
  margin: -180px 0 0 -180px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 247, 214, 0.06) 0%, transparent 65%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  contain: strict;
  transition: opacity 0.4s ease;
}
</style>
