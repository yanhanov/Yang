import { onMounted, onUnmounted } from 'vue'

export function useTilt(refEl, max = 8) {
  let el

  const onMove = (e) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  }

  const onLeave = () => {
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    el = refEl.value
    if (!el) return

    el.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
  })

  onUnmounted(() => {
    if (!el) return
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  })
}
