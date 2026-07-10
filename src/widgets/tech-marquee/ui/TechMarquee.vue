<script setup>
import { TechIcon } from '@/shared/ui/tech-icon'

const techs = [
  { icon: 'vue', label: 'Vue 3' },
  { icon: 'typescript', label: 'TypeScript' },
  { icon: 'nuxt', label: 'Nuxt.js' },
  { icon: 'react', label: 'React' },
  { icon: 'nextjs', label: 'Next.js' },
  { icon: 'javascript', label: 'JavaScript' },
  { icon: 'tailwind', label: 'Tailwind' },
  { icon: 'node', label: 'Node.js' },
  { icon: 'api', label: 'REST API' },
  { icon: 'postgres', label: 'PostgreSQL' },
  { icon: 'docker', label: 'Docker' },
  { icon: 'flutter', label: 'Flutter' },
  { icon: 'reactnative', label: 'React Native' },
  { icon: 'rust', label: 'Rust' },
  { icon: 'git', label: 'Git' },
]
</script>

<template>
  <div class="marquee-wrap">
    <div class="marquee-track">
      <div
        v-for="(tech, i) in [...techs, ...techs]"
        :key="`${tech.icon}-${i}`"
        class="marquee-pill"
      >
        <TechIcon :name="tech.icon" :size="20" />
        <span class="marquee-pill__label">{{ tech.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  padding-block: 1.25rem;
  border-block: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  background: color-mix(in srgb, var(--bg) 40%, transparent);
  contain: paint;
  isolation: isolate;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  will-change: transform;
  animation: marquee 32s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-pill {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  background: var(--bg-elevated);
  transition:
    border-color 0.2s,
    background 0.2s;
}

.marquee-pill__label {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.marquee-pill:hover {
  border-color: var(--brand);
  background: var(--brand-dim);
}

@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 0.75rem;
    padding-inline: 1rem;
  }
}
</style>
