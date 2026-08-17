import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const SELECTOR = '[data-era-panel]'
const ANIM_MS = 850
const WHEEL_THRESHOLD = 40
const INERTIA_DELTA = 14
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

function normalizeDeltaY(event) {
  let dy = event.deltaY
  if (event.deltaMode === 1) dy *= 16
  else if (event.deltaMode === 2) dy *= window.innerHeight
  return dy
}

export function useEraDeck() {
  const route = useRoute()

  let animating = false
  let targetIndex = -1
  let acc = 0
  let lockedUntil = 0
  let lastWheelAt = 0
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
    if (targetIndex >= 0) return targetIndex
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

    animating = true
    acc = 0
    targetIndex = index
    window.clearTimeout(unlockTimer)

    const html = document.documentElement
    html.classList.add('era-deck--jump')
    const top = Math.round(window.scrollY + target.getBoundingClientRect().top)
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })

    const wait = prefersReducedMotion() ? 80 : ANIM_MS
    lockedUntil = performance.now() + wait
    unlockTimer = window.setTimeout(() => {
      animating = false
      targetIndex = -1
      acc = 0
      html.classList.remove('era-deck--jump')
    }, wait)
  }

  function step(direction) {
    if (animating || !active()) return
    go(currentIndex() + direction)
  }

  function onWheel(event) {
    if (!active()) return
    if (event.ctrlKey) return
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

    const dy = normalizeDeltaY(event)
    if (!dy) return

    const index = currentIndex()
    const panel = panels[index]
    if (innerCanScroll(panel, dy)) return

    const atStart = index === 0 && dy < 0
    const atEnd = index === panels.length - 1 && dy > 0
    if (atStart || atEnd) return

    event.preventDefault()

    const now = performance.now()
    const gap = now - lastWheelAt
    lastWheelAt = now

    if (now < lockedUntil || animating) return

    if (gap > 140) acc = 0
    if (Math.abs(dy) < INERTIA_DELTA && gap < 90) return

    acc += dy
    if (Math.abs(acc) < WHEEL_THRESHOLD) return

    const direction = acc > 0 ? 1 : -1
    acc = 0
    go(index + direction)
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
    document.documentElement.classList.remove('era-deck', 'era-deck--jump')
  })
}
