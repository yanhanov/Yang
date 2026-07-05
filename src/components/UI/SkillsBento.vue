<script setup>
import TechIcon from './TechIcon.vue'

const skills = [
  { name: 'Vue 3', icon: 'vue', level: 95, color: '#42b883', span: 'md:col-span-2 md:row-span-2', featured: true },
  { name: 'TypeScript', icon: 'typescript', level: 90, color: '#3178c6', span: '', featured: false },
  { name: 'Nuxt.js', icon: 'nuxt', level: 85, color: '#00dc82', span: '', featured: false },
  { name: 'React / Next.js', icon: 'react', level: 78, color: '#61dafb', span: 'md:col-span-2', featured: false, extra: 'nextjs' },
  { name: 'JavaScript', icon: 'javascript', level: 92, color: '#f0db4f', span: '', featured: false },
  { name: 'REST / WebSockets', icon: 'api', level: 88, color: '#12f7d6', span: '', featured: false, extra: 'websocket' },
  { name: 'Tailwind CSS', icon: 'tailwind', level: 90, color: '#38bdf8', span: '', featured: false },
  { name: 'Flutter / Rust', icon: 'flutter', level: 55, color: '#3fb6d3', span: '', featured: false, extra: 'rust' },
]
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
    <div
      v-for="skill in skills"
      :key="skill.name"
      class="skill-card glass-card p-5 flex flex-col justify-between group"
      :class="skill.span"
      :style="{ '--skill-color': skill.color }"
    >
      <div class="flex items-start justify-between">
        <div
          class="icon-box flex items-center justify-center gap-1.5 rounded-xl transition-transform duration-300 group-hover:scale-110"
          :class="skill.featured ? 'w-16 h-16' : skill.extra ? 'w-14 h-12' : 'w-12 h-12'"
        >
          <TechIcon :name="skill.icon" :size="skill.featured ? 36 : 26" />
          <TechIcon v-if="skill.extra" :name="skill.extra" :size="skill.featured ? 22 : 18" />
        </div>
        <span
          class="text-2xl font-medium secont-font tabular-nums opacity-20 group-hover:opacity-50 transition-opacity"
          :style="{ color: skill.color }"
        >
          {{ skill.level }}%
        </span>
      </div>

      <div class="mt-4">
        <p class="secont-font font-medium" :class="skill.featured ? 'text-xl' : 'text-base'">
          {{ skill.name }}
        </p>
        <div class="mt-3 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
          <div
            class="skill-bar h-full rounded-full"
            :style="{ width: skill.level + '%', background: skill.color }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-card {
  position: relative;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.skill-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, color-mix(in srgb, var(--skill-color) 12%, transparent), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--skill-color) 40%, transparent);
  box-shadow: 0 16px 48px -16px color-mix(in srgb, var(--skill-color) 35%, transparent);
}

.skill-card:hover::before {
  opacity: 1;
}

.icon-box {
  position: relative;
  background: color-mix(in srgb, var(--skill-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--skill-color) 25%, transparent);
}

.skill-bar {
  transform-origin: left;
  animation: growBar 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes growBar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
