import { onMounted, onUnmounted, nextTick, watch } from 'vue'

function isInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function useScrollReveal(watchSource) {
  let observer

  const observe = () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
          if (isInViewport(el)) {
            el.classList.add('revealed')
          } else {
            observer?.observe(el)
          }
        })
      })
    })
  }

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    )

    observe()

    if (watchSource) {
      watch(watchSource, (val) => {
        if (!val) observe()
      })
    }
  })

  onUnmounted(() => observer?.disconnect())
}
