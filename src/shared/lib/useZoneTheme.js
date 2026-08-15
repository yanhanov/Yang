import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollFrame } from './useScrollFrame.js'

const ZONE_BY_ID = {
  hero: 'opening',
  about: 'about',
  experience: 'exp',
  projects: 'y2k',
  skills: 'web2',
  'what-i-do': 'para',
  languages: 'flat',
  process: 'glass',
  contact: 'now',
}

export const ERA_META = {
  opening: { year: '2026', name: 'Now' },
  about: { year: '1993', name: 'Mosaic', light: true },
  exp: { year: '1996', name: 'Tables' },
  y2k: { year: '2000', name: 'Y2K' },
  web2: { year: '2005', name: 'Zen Garden', light: true },
  para: { year: '2011', name: 'Parallax' },
  flat: { year: '2013', name: 'Flat', light: true },
  glass: { year: '2020', name: 'Glass' },
  now: { year: '2026', name: 'Now' },
}

const ZONE_IDS = Object.keys(ZONE_BY_ID)

export function useZoneTheme() {
  const route = useRoute()
  const zone = ref('opening')

  function update() {
    if (route.path.startsWith('/projects') || route.path.startsWith('/blogs')) {
      zone.value = 'now'
      return
    }

    if (route.path !== '/') {
      zone.value = 'now'
      return
    }

    const probe = 88
    let next = 'opening'

    for (const id of ZONE_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      if (el.getBoundingClientRect().top <= probe) next = ZONE_BY_ID[id]
    }

    if (zone.value !== next) zone.value = next
  }

  useScrollFrame(update)
  watch(() => route.path, update)

  return zone
}
