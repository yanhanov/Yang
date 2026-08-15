<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getBlogTitle, getBlogExcerpt, getBlogCategory } from '@/entities/blog'

const props = defineProps({
  blog: { type: Object, required: true },
  layout: {
    type: String,
    default: 'card',
    validator: (v) => ['card', 'feature', 'row'].includes(v),
  },
})

const { locale, t } = useI18n()

const title = computed(() => getBlogTitle(props.blog, locale.value))
const excerpt = computed(() => getBlogExcerpt(props.blog, locale.value))
const category = computed(() => getBlogCategory(props.blog, locale.value))

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
  <RouterLink
    :to="`/blogs/${blog.id}`"
    class="blog-card"
    :class="`blog-card--${layout}`"
  >
    <div class="blog-card__media">
      <img
        v-if="blog.img"
        :src="blog.img"
        :alt="title"
        class="blog-card__img"
        loading="lazy"
        decoding="async"
      />
    </div>

    <div class="blog-card__body">
      <div class="blog-card__meta">
        <span class="blog-card__category">{{ category }}</span>
        <time v-if="blog.date" class="blog-card__date" :datetime="blog.date">{{ formattedDate }}</time>
        <span v-if="layout === 'feature'" class="blog-card__badge">{{ t('blog.latest') }}</span>
      </div>
      <h2 class="blog-card__title">{{ title }}</h2>
      <p v-if="layout !== 'row'" class="blog-card__excerpt">{{ excerpt }}</p>
      <span class="blog-card__cta">{{ $t('read-more') }} →</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.blog-card {
  display: grid;
  color: var(--now-ink);
  font-family: var(--now-font);
  transition: opacity 0.25s ease;
}

.blog-card:hover {
  opacity: 0.92;
}

.blog-card__media {
  overflow: hidden;
  background: #111113;
}

.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.blog-card:hover .blog-card__img {
  transform: scale(1.03);
}

.blog-card__body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.blog-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.65rem;
}

.blog-card__date {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--now-muted);
}

.blog-card__category {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.blog-card__badge {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.blog-card__title {
  margin: 0;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--now-ink);
}

.blog-card__excerpt {
  margin: 0.75rem 0 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--now-muted);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-card__cta {
  margin-top: auto;
  padding-top: 1.1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--now-ink);
}

/* Feature — lead story */
.blog-card--feature {
  gap: 1.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

@media (min-width: 48rem) {
  .blog-card--feature {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    gap: 2.5rem;
    padding-bottom: 3rem;
  }
}

.blog-card--feature .blog-card__media {
  aspect-ratio: 16 / 10;
  border-radius: 1.25rem;
}

.blog-card--feature .blog-card__title {
  font-size: clamp(1.85rem, 4.5vw, 3rem);
  line-height: 1.05;
}

.blog-card--feature .blog-card__excerpt {
  -webkit-line-clamp: 4;
  font-size: 1.02rem;
}

/* Row — compact list */
.blog-card--row {
  grid-template-columns: 7.5rem 1fr;
  gap: 1.1rem;
  align-items: center;
  padding: 1.25rem 0;
  border-bottom: 1px solid rgba(250, 250, 250, 0.08);
}

@media (min-width: 40rem) {
  .blog-card--row {
    grid-template-columns: 11rem 1fr;
    gap: 1.5rem;
  }
}

.blog-card--row .blog-card__media {
  aspect-ratio: 4 / 3;
  border-radius: 0.85rem;
}

.blog-card--row .blog-card__title {
  font-size: 1.15rem;
  line-height: 1.25;
}

.blog-card--row .blog-card__cta {
  padding-top: 0.55rem;
}

.blog-card--row .blog-card__meta {
  margin-bottom: 0.4rem;
}

/* Card — related grid */
.blog-card--card {
  height: 100%;
  overflow: hidden;
  border-radius: 1.25rem;
  background: rgba(250, 250, 250, 0.03);
  border: 1px solid rgba(250, 250, 250, 0.08);
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    opacity 0.25s ease;
}

.blog-card--card:hover {
  opacity: 1;
  border-color: rgba(250, 250, 250, 0.18);
  background: rgba(250, 250, 250, 0.05);
}

.blog-card--card .blog-card__media {
  aspect-ratio: 16 / 9;
  border-bottom: 1px solid rgba(250, 250, 250, 0.06);
}

.blog-card--card .blog-card__body {
  padding: 1.15rem 1.15rem 1.25rem;
  flex: 1;
}

.blog-card--card .blog-card__title {
  font-size: 1.2rem;
  line-height: 1.25;
}
</style>
