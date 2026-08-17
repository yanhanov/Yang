import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'era-preference'

export const ERA_META = {
  opening: { year: '2026', name: 'Cinematic' },
  about: { year: '1993', name: 'Mosaic', light: true },
  exp: { year: '1996', name: 'Tables' },
  y2k: { year: '2000', name: 'Y2K' },
  web2: { year: '2005', name: 'Zen Garden', light: true },
  para: { year: '2011', name: 'Parallax' },
  flat: { year: '2013', name: 'Flat', light: true },
  glass: { year: '2020', name: 'Glass' },
  now: { year: '2026', name: 'Now' },
}

export const ERA_IDS = Object.keys(ERA_META)

export const ERA_OPTIONS = ERA_IDS.map((id) => ({
  id,
  year: ERA_META[id].year,
  name: ERA_META[id].name,
  light: Boolean(ERA_META[id].light),
}))

function readStored() {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'auto' || ERA_IDS.includes(value)) return value
  } catch {
    /* ignore */
  }
  return 'auto'
}

const preference = ref(typeof window !== 'undefined' ? readStored() : 'auto')
const scrollZone = ref('opening')

function syncHtml() {
  if (typeof document === 'undefined') return
  const locked = preference.value !== 'auto'
  document.documentElement.dataset.eraMode = locked ? 'locked' : 'auto'
  if (locked) document.documentElement.dataset.era = preference.value
  else document.documentElement.removeAttribute('data-era')
}

function persist(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
}

export function setEraPreference(value) {
  if (value !== 'auto' && !ERA_IDS.includes(value)) return
  preference.value = value
  persist(value)
  syncHtml()
}

export function setScrollZone(zone) {
  if (scrollZone.value !== zone) scrollZone.value = zone
}

export function useEraPreference() {
  const isLocked = computed(() => preference.value !== 'auto')
  const activeEra = computed(() =>
    isLocked.value ? preference.value : scrollZone.value,
  )

  syncHtml()

  return {
    preference,
    isLocked,
    activeEra,
    setPreference: setEraPreference,
    options: ERA_OPTIONS,
  }
}

if (typeof window !== 'undefined') {
  syncHtml()
  watch(preference, syncHtml)
}
