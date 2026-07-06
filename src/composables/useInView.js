import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(targetRef, options = {}) {
  const inView = ref(false)
  let observer

  onMounted(() => {
    const el = targetRef.value
    if (!el) return

    observer = new IntersectionObserver(
      ([entry]) => {
        inView.value = entry.isIntersecting
      },
      { threshold: 0, rootMargin: '80px 0px', ...options },
    )

    observer.observe(el)
  })

  onUnmounted(() => observer?.disconnect())

  return inView
}
