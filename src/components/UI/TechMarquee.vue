<script setup>
import TechIcon from './TechIcon.vue'

const techs = [
  { icon: 'vue', label: 'Vue 3' },
  { icon: 'typescript', label: 'TypeScript' },
  { icon: 'nuxt', label: 'Nuxt.js' },
  { icon: 'react', label: 'React' },
  { icon: 'nextjs', label: 'Next.js' },
  { icon: 'javascript', label: 'JavaScript' },
  { icon: 'tailwind', label: 'Tailwind' },
  { icon: 'api', label: 'REST API' },
  { icon: 'websocket', label: 'WebSockets' },
  { icon: 'flutter', label: 'Flutter' },
  { icon: 'rust', label: 'Rust' },
  { icon: 'git', label: 'Git' },
]
</script>

<template>
  <div class="marquee-wrap overflow-hidden py-5 border-y border-[var(--border)]/60 bg-[var(--bg)]/40">
    <div class="marquee-track flex items-center gap-4">
      <div
        v-for="(tech, i) in [...techs, ...techs]"
        :key="`${tech.icon}-${i}`"
        class="marquee-pill flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border)]/60 bg-[var(--bg-elevated)]/80 shrink-0"
      >
        <TechIcon :name="tech.icon" :size="20" />
        <span class="text-sm base-font text-[var(--text-muted)]">{{ tech.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-track {
  animation: marquee 40s linear infinite;
  width: max-content;
  will-change: transform;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-pill {
  transition: border-color 0.2s, background 0.2s;
}

.marquee-pill:hover {
  border-color: var(--brand);
  background: var(--brand-dim);
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
