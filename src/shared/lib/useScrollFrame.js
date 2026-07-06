import { onMounted, onUnmounted } from 'vue'

const callbacks = new Set()
let ticking = false
let listening = false

function onScrollFrame() {
  ticking = false
  callbacks.forEach((fn) => fn())
}

function scheduleScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(onScrollFrame)
  }
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', scheduleScroll, { passive: true })
}

function stopListening() {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', scheduleScroll)
}

export function useScrollFrame(callback) {
  onMounted(() => {
    callbacks.add(callback)
    if (callbacks.size === 1) startListening()
    callback()
  })

  onUnmounted(() => {
    callbacks.delete(callback)
    if (callbacks.size === 0) stopListening()
  })
}
