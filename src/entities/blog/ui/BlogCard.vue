<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getBlogTitle, getBlogExcerpt } from '@/entities/blog'

const props = defineProps({
  blog: { type: Object, required: true },
})

const { locale } = useI18n()

const title = computed(() => getBlogTitle(props.blog, locale.value))
const excerpt = computed(() => getBlogExcerpt(props.blog, locale.value))

const formattedDate = computed(() => {
  if (!props.blog.date) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(props.blog.date))
})
</script>

<template>
  <RouterLink :to="`/blogs/${blog.id}`" class="blog-card group">
    <div class="blog-card__media">
      <img
        v-if="blog.img"
        :src="blog.img"
        :alt="title"
        class="blog-card__img"
        loading="lazy"
        decoding="async"
      />
      <div class="blog-card__shade" aria-hidden="true" />
      <time v-if="blog.date" class="blog-card__date" :datetime="blog.date">{{ formattedDate }}</time>
    </div>

    <div class="blog-card__body">
      <p class="section-label mb-2">article</p>
      <h2 class="blog-card__title secont-font">{{ title }}</h2>
      <p class="blog-card__excerpt">{{ excerpt }}</p>
      <span class="blog-card__cta base-font">
        {{ $t('read-more') }}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </span>
    </div>
  </RouterLink>
</template>

<style scoped>
.blog-card {
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

.blog-card:hover {
  transform: translateY(-6px);
  border-color: rgba(18, 247, 214, 0.35);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    0 24px 60px -28px rgba(18, 247, 214, 0.22);
}

.blog-card__media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(18, 247, 214, 0.08), rgba(12, 115, 184, 0.12));
}

.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.blog-card:hover .blog-card__img {
  transform: scale(1.04);
}

.blog-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 35%, rgba(26, 30, 35, 0.88) 100%);
  pointer-events: none;
}

.blog-card__date {
  position: absolute;
  top: 0.875rem;
  right: 0.875rem;
  z-index: 1;
  padding: 0.35rem 0.65rem;
  border-radius: 9999px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6875rem;
  color: var(--brand);
  background: rgba(26, 30, 35, 0.88);
  border: 1px solid rgba(18, 247, 214, 0.22);
}

.blog-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.25rem 1.25rem 1.35rem;
}

.blog-card__title {
  font-size: 1.2rem;
  line-height: 1.3;
  font-weight: 500;
  color: #fff;
  transition: color 0.25s ease;
}

.blog-card:hover .blog-card__title {
  color: var(--brand);
}

.blog-card__excerpt {
  margin-top: 0.65rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.8125rem;
  color: var(--brand);
}
</style>
