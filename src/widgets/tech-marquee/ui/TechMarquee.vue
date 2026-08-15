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
  <div class="marquee-wrap" aria-hidden="true">
    <div class="marquee-track">
      <div
        v-for="(tech, i) in [...techs, ...techs]"
        :key="`${tech.icon}-${i}`"
        class="marquee-item"
      >
        <TechIcon :name="tech.icon" :size="16" />
        <span>{{ tech.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-wrap {
  overflow: hidden;
  padding-block: 0.85rem;
  border-block: 1px solid rgba(244, 240, 234, 0.12);
  background: #0e0c0a;
  color: #f4f0ea;
  font-family: var(--opening-font);
  contain: paint;
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  width: max-content;
  animation: marquee 34s linear infinite;
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a39e96;
  white-space: nowrap;
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
    gap: 0.85rem 1.25rem;
    padding-inline: 1rem;
  }
}
</style>
