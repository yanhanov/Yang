<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  project: { type: Object, required: true },
  featured: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
})

const { locale } = useI18n()
</script>

<template>
  <component
    :is="project.url ? 'a' : 'article'"
    :href="project.url || undefined"
    :target="project.url ? '_blank' : undefined"
    :rel="project.url ? 'noopener noreferrer' : undefined"
    class="project-card group relative overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(18,247,214,0.2)] block"
    :class="[featured ? 'md:col-span-2' : '', project.url ? 'cursor-pointer' : '']"
  >
    <div class="relative overflow-hidden" :class="featured ? 'h-60' : 'h-48'">
      <img
        :src="project.img"
        :alt="project.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
      <span
        class="absolute top-4 left-4 base-font text-xs px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm color-brand border border-[var(--border-accent)]"
      >
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <div
        v-if="project.tags?.length"
        class="absolute bottom-4 left-4 flex flex-wrap gap-1.5"
      >
        <span
          v-for="tag in project.tags.slice(0, 3)"
          :key="tag"
          class="text-[0.65rem] base-font px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-[var(--text-muted)] border border-[var(--border)]/50"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <h3 class="secont-font text-xl font-medium group-hover:color-brand transition-colors flex items-center gap-2">
        {{ project.title }}
        <svg
          v-if="project.url"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          class="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </h3>
      <p class="mt-2 text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
        <span v-if="locale === 'en'">{{ project.aboutEn }}</span>
        <span v-else>{{ project.aboutRu }}</span>
      </p>
      <div
        class="mt-4 flex items-center gap-2 text-sm color-brand opacity-0 group-hover:opacity-100 transition-opacity base-font"
      >
        <span>{{ $t('home.view-project') }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </component>
</template>
