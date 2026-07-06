import { onMounted, onUnmounted } from 'vue'
import { useRafThrottle } from './useRafThrottle'

export function useTilt(refEl, max = 8) {
  let el
  let throttle
  let rect
  let resizeObserver

  const updateRect = () => {
    if (!el) return
    rect = el.getBoundingClientRect()
  }

  const applyMove = (e) => {
    if (!el || !rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`
  }

  const onLeave = () => {
    throttle?.cancel()
    if (!el) return
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    el = refEl.value
    if (!el) return

    updateRect()
    throttle = useRafThrottle(applyMove)
    el.style.transition = 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
    el.addEventListener('mousemove', throttle.handler, { passive: true })
    el.addEventListener('mouseleave', onLeave)

    resizeObserver = new ResizeObserver(updateRect)
    resizeObserver.observe(el)
    window.addEventListener('resize', updateRect, { passive: true })
  })

  onUnmounted(() => {
    throttle?.cancel()
    resizeObserver?.disconnect()
    window.removeEventListener('resize', updateRect)
    if (!el) return
    el.removeEventListener('mousemove', throttle?.handler)
    el.removeEventListener('mouseleave', onLeave)
  })
}
