import { onMounted, onUnmounted } from 'vue'

const callbacks = new Set()
let ticking = false
let listening = false
let scrollClassTimer = null

function setScrollingState(active) {
  document.documentElement.classList.toggle('is-scrolling', active)
}

function onScrollFrame() {
  ticking = false
  callbacks.forEach((fn) => fn())
}

function scheduleScroll() {
  setScrollingState(true)
  clearTimeout(scrollClassTimer)
  scrollClassTimer = setTimeout(() => setScrollingState(false), 120)

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
  clearTimeout(scrollClassTimer)
  setScrollingState(false)
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
