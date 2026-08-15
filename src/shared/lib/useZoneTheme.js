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

const ZONE_IDS = Object.keys(ZONE_BY_ID)

export function useZoneTheme() {
  const route = useRoute()
  const zone = ref('opening')

  function update() {
    if (route.path.startsWith('/projects')) {
      zone.value = 'y2k'
      return
    }

    if (route.path !== '/') {
      zone.value = 'opening'
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
