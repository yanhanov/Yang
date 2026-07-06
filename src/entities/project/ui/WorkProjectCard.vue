<script setup>
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'

defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { t } = useI18n()

const tagIcons = {
  'Vue 3': 'vue',
  Vue: 'vue',
  TypeScript: 'typescript',
  TS: 'typescript',
  Lead: null,
  Architecture: null,
  'REST API': 'api',
  Performance: null,
  EdTech: null,
  Nuxt: 'nuxt',
}
</script>

<template>
  <a
    :href="project.url || '#'"
    :target="project.url ? '_blank' : undefined"
    class="group block glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(18,247,214,0.2)]"
    :class="!project.url && 'pointer-events-none'"
  >
    <div class="p-6 md:p-8">
      <div class="flex items-start justify-between gap-4">
        <span class="base-font text-xs color-brand opacity-60">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div v-if="project.url" class="opacity-0 group-hover:opacity-100 transition-opacity color-brand">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <h3 class="secont-font text-xl md:text-2xl font-medium mt-3 group-hover:color-brand transition-colors">
        {{ t(project.titleKey) }}
      </h3>
      <p class="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
        {{ t(project.descKey) }}
      </p>
      <div class="flex flex-wrap gap-2 mt-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="inline-flex items-center gap-1.5 text-xs base-font px-2.5 py-1 rounded-full bg-[var(--brand-dim)] color-brand border border-[var(--border-accent)]"
        >
          <TechIcon v-if="tagIcons[tag]" :name="tagIcons[tag]" :size="14" />
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>
