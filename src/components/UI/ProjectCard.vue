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
    class="project-card group block"
    :class="project.url ? 'cursor-pointer' : ''"
  >
    <div class="project-card__media" :class="featured ? 'project-card__media--featured' : ''">
      <img
        :src="project.img"
        :alt="project.title"
        class="project-card__img"
        loading="lazy"
        decoding="async"
      />
      <div class="project-card__shade" />
      <span class="project-card__index base-font">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <div v-if="project.tags?.length" class="project-card__tags">
        <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="project-card__tag base-font">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="project-card__body">
      <h3 class="project-card__title secont-font">
        {{ project.title }}
        <svg
          v-if="project.url"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          class="project-card__title-icon"
          aria-hidden="true"
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </h3>
      <p class="project-card__desc">
        <span v-if="locale === 'en'">{{ project.aboutEn }}</span>
        <span v-else>{{ project.aboutRu }}</span>
      </p>
      <div v-if="project.url" class="project-card__cta base-font">
        <span>{{ $t('home.view-project') }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(34, 38, 45, 0.92);
  border: 1px solid var(--border-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  contain: layout paint;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

@media (hover: hover) {
  .project-card:hover {
    transform: translateY(-4px);
    border-color: rgba(18, 247, 214, 0.35);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 20px 60px -24px rgba(18, 247, 214, 0.2);
  }
}

.project-card__media {
  position: relative;
  overflow: hidden;
  height: 12rem;
}

.project-card__media--featured {
  height: 15rem;
}

.project-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (hover: hover) {
  .project-card__img {
    transition: transform 0.45s ease;
  }

  .project-card:hover .project-card__img {
    transform: scale(1.04);
  }
}

.project-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, var(--bg), transparent 55%);
  pointer-events: none;
}

.project-card__index {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  color: var(--brand);
  background: rgba(26, 30, 35, 0.88);
  border: 1px solid var(--border-accent);
}

.project-card__tags {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.project-card__tag {
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.65rem;
  color: var(--text-muted);
  background: rgba(26, 30, 35, 0.88);
  border: 1px solid rgba(67, 69, 77, 0.5);
}

.project-card__body {
  padding: 1.5rem;
}

.project-card__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

@media (hover: hover) {
  .project-card:hover .project-card__title {
    color: var(--brand);
  }
}

.project-card__title-icon {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

@media (hover: hover) {
  .project-card:hover .project-card__title-icon {
    opacity: 1;
  }
}

.project-card__desc {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.project-card__cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--brand);
  opacity: 0;
  transition: opacity 0.2s ease;
}

@media (hover: hover) {
  .project-card:hover .project-card__cta {
    opacity: 1;
  }
}
</style>
