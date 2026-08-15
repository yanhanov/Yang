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
  background: #fff;
  border: 1px solid var(--swiss-rule);
  color: var(--swiss-ink);
  font-family: var(--swiss-font);
  transition: background 0.15s ease;
}

.project-card--linked {
  cursor: pointer;
}

.project-card--linked:hover {
  background: #fff8f7;
}

.project-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  border-bottom: 1px solid var(--swiss-rule);
}

.project-card__index {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--swiss-accent);
}

.project-card__visit {
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--swiss-muted);
}

.project-card--linked:hover .project-card__visit {
  color: var(--swiss-accent);
}

.project-card__media {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--swiss-rule);
  background: #e8e8e6;
}

.project-card--featured .project-card__media {
  aspect-ratio: 21 / 9;
}

.project-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: grayscale(1) contrast(1.05);
  transition: filter 0.2s ease, transform 0.35s ease;
}

.project-card--linked:hover .project-card__img {
  filter: grayscale(0) contrast(1);
  transform: scale(1.02);
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
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.03em;
}

.project-card__desc {
  margin: 0.55rem 0 0;
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--swiss-muted);
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
  border: 1px solid var(--swiss-rule);
  font-size: 0.625rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--swiss-ink);
}
</style>
