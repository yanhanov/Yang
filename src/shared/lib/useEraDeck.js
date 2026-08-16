import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const SELECTOR = '[data-era-panel]'
const LOCK_MS = 720
const DESKTOP_MQ = '(min-width: 48rem)'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isDesktopDeck() {
  return window.matchMedia(DESKTOP_MQ).matches
}

function canScroll(el, dy) {
  if (!el) return false
  const top = el.scrollTop
  const max = el.scrollHeight - el.clientHeight
  if (max <= 1) return false
  if (dy > 0) return top < max - 1
  return top > 1
}

function innerCanScroll(panel, dy) {
  if (!panel || !dy) return false
  const nodes = [panel, ...panel.querySelectorAll('*')]
  for (const el of nodes) {
    const { overflowY } = getComputedStyle(el)
    if (overflowY !== 'auto' && overflowY !== 'scroll') continue
    if (canScroll(el, dy)) return true
  }
  return false
}

export function useEraDeck() {
  const route = useRoute()

  let locked = false
  let unlockTimer = 0
  let panels = []
  let mq

  function isHome() {
    return route.path === '/'
  }

  function active() {
    return isHome() && isDesktopDeck()
  }

  function syncClass() {
    document.documentElement.classList.toggle('era-deck', active())
  }

  function collect() {
    panels = [...document.querySelectorAll(SELECTOR)]
  }

  function currentIndex() {
    collect()
    const probe = window.innerHeight * 0.45
    let index = 0
    for (let i = 0; i < panels.length; i += 1) {
      if (panels[i].getBoundingClientRect().top <= probe) index = i
    }
    return index
  }

  function go(next) {
    if (!active()) return
    collect()
    if (!panels.length) return
    const index = Math.max(0, Math.min(panels.length - 1, next))
    const target = panels[index]
    if (!target) return

    locked = true
    window.clearTimeout(unlockTimer)
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
    unlockTimer = window.setTimeout(() => {
      locked = false
    }, prefersReducedMotion() ? 80 : LOCK_MS)
  }

  function step(direction) {
    if (locked || !active()) return
    go(currentIndex() + direction)
  }

  function onWheel(event) {
    if (!active()) return
    if (event.ctrlKey) return
    const dy = event.deltaY
    if (Math.abs(dy) < 6) return

    const index = currentIndex()
    const panel = panels[index]
    if (innerCanScroll(panel, dy)) return

    const atStart = index === 0 && dy < 0
    const atEnd = index === panels.length - 1 && dy > 0
    if (atStart || atEnd) return

    event.preventDefault()
    step(dy > 0 ? 1 : -1)
  }

  function onKey(event) {
    if (!active()) return
    const tag = event.target?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target?.isContentEditable) return

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      step(-1)
    } else if (event.key === ' ') {
      event.preventDefault()
      step(event.shiftKey ? -1 : 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      go(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      collect()
      go(panels.length - 1)
    }
  }

  function onClick(event) {
    if (!active()) return
    const link = event.target.closest?.('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href')?.slice(1)
    if (!id) return
    collect()
    const index = panels.findIndex((el) => el.id === id)
    if (index < 0) return
    event.preventDefault()
    go(index)
  }

  function onResize() {
    syncClass()
    if (active()) collect()
  }

  watch(() => route.path, syncClass, { immediate: true })

  onMounted(() => {
    mq = window.matchMedia(DESKTOP_MQ)
    syncClass()
    collect()
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    mq.addEventListener?.('change', onResize)
  })

  onUnmounted(() => {
    window.clearTimeout(unlockTimer)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('click', onClick)
    window.removeEventListener('resize', onResize)
    mq?.removeEventListener?.('change', onResize)
    document.documentElement.classList.remove('era-deck')
  })
}
