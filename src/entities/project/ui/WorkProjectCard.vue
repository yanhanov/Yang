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
    class="project-card"
    :class="{
      'project-card--featured': featured,
      'project-card--linked': project.url,
    }"
  >
    <div class="project-card__meta">
      <span class="project-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span v-if="project.url" class="project-card__visit">{{ $t('home.view-project') }} ↗</span>
    </div>

    <div class="project-card__media">
      <img
        v-if="project.img"
        :src="project.img"
        :alt="t(project.titleKey)"
        class="project-card__img"
        width="640"
        height="400"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title">{{ t(project.titleKey) }}</h3>
      <p class="project-card__desc">{{ t(project.descKey) }}</p>
      <div class="project-card__tags">
        <span v-for="item in project.tags" :key="item" class="project-card__tag">
          <TechIcon v-if="tagIcons[item]" :name="tagIcons[item]" :size="12" />
          {{ item }}
        </span>
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #141428 0%, #090914 100%);
  border: 1px solid color-mix(in srgb, var(--y2k-cyan) 35%, transparent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 0 0 1px #000,
    0 0 24px rgba(255, 43, 214, 0.12);
  color: var(--y2k-ink);
  font-family: var(--y2k-font);
}

.project-card--linked {
  cursor: pointer;
}

.project-card--linked:hover {
  border-color: var(--y2k-accent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 0 28px rgba(255, 43, 214, 0.28);
}

.project-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid rgba(57, 243, 255, 0.2);
}

.project-card__index {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--y2k-cyan);
}

.project-card__visit {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--y2k-muted);
}

.project-card--linked:hover .project-card__visit {
  color: var(--y2k-accent);
}

.project-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid rgba(57, 243, 255, 0.18);
  background: #070712;
}

.project-card--featured .project-card__media {
  aspect-ratio: 21 / 9;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: contrast(1.1) saturate(0.85) hue-rotate(12deg);
  transition: filter 0.2s ease, transform 0.35s ease;
}

.project-card--linked:hover .project-card__img {
  filter: contrast(1.05) saturate(1);
  transform: scale(1.03);
}

.project-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1rem 0.85rem 1.1rem;
}

.project-card__title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.project-card__desc {
  margin: 0.55rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--y2k-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 0.9rem;
}

.project-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.4rem;
  border: 1px solid rgba(57, 243, 255, 0.35);
  font-size: 0.625rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--y2k-cyan);
}
</style>
