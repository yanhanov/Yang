<script setup>
import { computed, ref, watch, onUnmounted } from 'vue'
import { ERA_META, useZoneTheme } from '@/shared/lib'

const zone = useZoneTheme()
const era = computed(() => ERA_META[zone.value] ?? ERA_META.opening)
const visible = computed(() => zone.value !== 'opening')
const onLight = computed(() => Boolean(era.value.light))

const displayYear = ref(Number(era.value.year) || 1993)
const displayName = ref(era.value.name)
let tickTimer = 0
let nameTimer = 0

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function clearTimers() {
  window.clearTimeout(tickTimer)
  window.clearTimeout(nameTimer)
  tickTimer = 0
  nameTimer = 0
}

function animateTo(targetYear, targetName) {
  clearTimers()
  const end = Number(targetYear)

  if (!Number.isFinite(end) || prefersReducedMotion() || !visible.value) {
    displayYear.value = Number.isFinite(end) ? end : targetYear
    displayName.value = targetName
    return
  }

  const start = Number(displayYear.value)
  if (!Number.isFinite(start) || start === end) {
    displayYear.value = end
    displayName.value = targetName
    return
  }

  const step = end > start ? 1 : -1
  const steps = Math.abs(end - start)
  const interval = Math.max(28, Math.min(900, 90 + steps * 55) / steps)

  let current = start
  const tick = () => {
    current += step
    displayYear.value = current
    if (current !== end) {
      tickTimer = window.setTimeout(tick, interval)
      return
    }
    nameTimer = window.setTimeout(() => {
      displayName.value = targetName
    }, 40)
  }
  tickTimer = window.setTimeout(tick, interval)
}

watch(
  () => [era.value.year, era.value.name],
  ([year, name]) => animateTo(year, name),
)

watch(visible, (on) => {
  if (on) animateTo(era.value.year, era.value.name)
  else {
    clearTimers()
    displayYear.value = Number(era.value.year) || displayYear.value
    displayName.value = era.value.name
  }
})

onUnmounted(clearTimers)
</script>

<template>
  <div class="era" :class="{ 'era--on': visible, 'era--light': onLight }" aria-hidden="true">
    <div class="era__veil" />
    <div class="era__stamp">
      <p class="era__year">{{ displayYear }}</p>
      <div class="era__name-slot">
        <Transition name="era-name">
          <p :key="displayName" class="era__name">{{ displayName }}</p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.era {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  min-height: 8.5rem;
  padding: 1.15rem;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.era--on {
  opacity: 1;
}

.era__veil {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(12, 10, 8, 0.42) 100%);
  transition: opacity 0.45s ease;
}

.era--light.era--on .era__veil {
  opacity: 1;
}

.era--light .era__year,
.era--light .era__name {
  mix-blend-mode: normal;
}

.era__stamp {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.era__year {
  margin: 0;
  font-family: 'Literata', Georgia, serif;
  font-size: clamp(2.4rem, 6vw, 4.25rem);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: #fff;
  mix-blend-mode: difference;
  font-variant-numeric: tabular-nums;
}

.era__name-slot {
  position: relative;
  height: 0.9rem;
}

.era__name {
  position: absolute;
  inset: 0 auto auto 0;
  margin: 0;
  font-family: 'Onest', system-ui, sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #fff;
  mix-blend-mode: difference;
  white-space: nowrap;
}

.era-name-enter-active,
.era-name-leave-active {
  transition: opacity 0.45s ease;
}

.era-name-enter-from,
.era-name-leave-to {
  opacity: 0;
}

@media (max-width: 47.99rem) {
  .era {
    padding: 0.85rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .era,
  .era__veil,
  .era-name-enter-active,
  .era-name-leave-active {
    transition: none;
  }
}
</style>
