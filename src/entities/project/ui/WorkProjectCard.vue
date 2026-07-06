<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
})

const { t } = useI18n()

const tag = computed(() => (props.project.url ? 'a' : 'article'))

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
  <component
    :is="tag"
    :href="project.url || undefined"
    :target="project.url ? '_blank' : undefined"
    :rel="project.url ? 'noopener noreferrer' : undefined"
    class="project-card group"
    :class="{
      'project-card--featured': featured,
      'project-card--linked': project.url,
    }"
  >
    <div class="project-card__media">
      <img
        v-if="project.img"
        :src="project.img"
        :alt="t(project.titleKey)"
        class="project-card__img"
        loading="lazy"
        decoding="async"
      />
      <div class="project-card__shade" aria-hidden="true" />
      <div class="project-card__top">
        <span class="project-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
        <span v-if="project.url" class="project-card__visit">
          {{ $t('home.view-project') }}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </div>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title secont-font">{{ t(project.titleKey) }}</h3>
      <p class="project-card__desc">{{ t(project.descKey) }}</p>
      <div class="project-card__tags">
        <span v-for="item in project.tags" :key="item" class="project-card__tag">
          <TechIcon v-if="tagIcons[item]" :name="tagIcons[item]" :size="13" />
          {{ item }}
        </span>
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 1.25rem;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(41, 47, 54, 0.96) 0%, rgba(26, 30, 35, 0.98) 100%);
  border: 1px solid rgba(67, 69, 77, 0.9);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 12px 40px -24px rgba(0, 0, 0, 0.65);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(18, 247, 214, 0.55),
    transparent 35%,
    rgba(12, 115, 184, 0.35) 70%,
    transparent
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}

.project-card--linked {
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: rgba(18, 247, 214, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 24px 60px -28px rgba(18, 247, 214, 0.28);
}

.project-card:hover::before {
  opacity: 1;
}

.project-card__media {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #12161b;
}

.project-card--featured .project-card__media {
  aspect-ratio: 21 / 9;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.project-card:hover .project-card__img {
  transform: scale(1.04);
}

.project-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(18, 22, 27, 0.05) 0%,
    rgba(18, 22, 27, 0.15) 45%,
    rgba(26, 30, 35, 0.92) 100%
  );
  pointer-events: none;
}

.project-card__top {
  position: absolute;
  inset: 0.875rem 0.875rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  z-index: 1;
}

.project-card__index,
.project-card__visit {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border-radius: 9999px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(18, 247, 214, 0.22);
}

.project-card__index {
  color: var(--brand);
  background: rgba(0, 0, 0, 0.45);
}

.project-card__visit {
  color: #fff;
  background: rgba(18, 247, 214, 0.14);
  opacity: 0;
  transform: translateY(-4px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    background 0.3s ease;
}

.project-card:hover .project-card__visit {
  opacity: 1;
  transform: translateY(0);
}

.project-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem 1.25rem 1.35rem;
}

.project-card--featured .project-card__body {
  padding: 1.35rem 1.5rem 1.5rem;
}

.project-card__title {
  font-size: 1.2rem;
  line-height: 1.25;
  font-weight: 500;
  color: #fff;
  transition: color 0.25s ease;
}

.project-card--featured .project-card__title {
  font-size: clamp(1.35rem, 2vw, 1.65rem);
}

.project-card:hover .project-card__title {
  color: var(--brand);
}

.project-card__desc {
  margin-top: 0.55rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card--featured .project-card__desc {
  -webkit-line-clamp: 2;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: auto;
  padding-top: 1rem;
}

.project-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 9999px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem;
  color: var(--brand);
  background: rgba(18, 247, 214, 0.08);
  border: 1px solid rgba(18, 247, 214, 0.18);
}
</style>
