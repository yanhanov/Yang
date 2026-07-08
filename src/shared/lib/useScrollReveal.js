import { onMounted, onUnmounted, nextTick, watch } from 'vue'

function isInViewport(el) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

function revealElement(el) {
  el.classList.add('revealed')
}

export function useScrollReveal(watchSource) {
  let observer

  const observe = () => {
    nextTick(() => {
      requestAnimationFrame(() => {
        document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
          if (isInViewport(el)) {
            revealElement(el)
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
          if (!entry.isIntersecting) return
          revealElement(entry.target)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.05, rootMargin: '80px 0px -40px 0px' },
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
