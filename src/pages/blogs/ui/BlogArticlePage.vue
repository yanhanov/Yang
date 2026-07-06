<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { PageHero } from '@/shared/ui/page-hero'
import { SectionHeading } from '@/shared/ui/section-heading'
import { useScrollReveal } from '@/shared/lib'
import { blogs, getBlogBySlug, getBlogTitle, getBlogParagraphs, BlogCard } from '@/entities/blog'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

useScrollReveal()

const blog = computed(() => getBlogBySlug(route.params.article))

const title = computed(() => (blog.value ? getBlogTitle(blog.value, locale.value) : ''))

const paragraphs = computed(() =>
  blog.value ? getBlogParagraphs(blog.value, locale.value) : [],
)

const readingTime = computed(() => {
  const words = paragraphs.value.join(' ').split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 180))
  return t('blog.reading-time', { n: minutes })
})

const formattedDate = computed(() => {
  if (!blog.value?.date) return ''
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-US' : 'ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(blog.value.date))
})

const heroSubtitle = computed(() => {
  const parts = [formattedDate.value, readingTime.value].filter(Boolean)
  return parts.join(' · ')
})

const moreArticles = computed(() =>
  blogs.filter((item) => item.id !== blog.value?.id).slice(0, 2),
)

watch(
  () => route.params.article,
  (slug) => {
    if (!getBlogBySlug(slug)) {
      router.replace({ name: 'not-found' })
    }
  },
  { immediate: true },
)
</script>

<template>
  <template v-if="blog">
    <PageHero label="// article" :title="title" :subtitle="heroSubtitle" />

    <article class="article mb-20">
      <div class="container">
        <div class="article__layout">
          <RouterLink to="/blogs" class="article__back btn-ghost reveal">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5M5 12L11 6M5 12L11 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            {{ $t('blog.back') }}
          </RouterLink>

          <figure v-if="blog.img" class="article__cover reveal reveal-delay-1">
            <img :src="blog.img" :alt="title" loading="eager" decoding="async" />
          </figure>

          <div class="article__prose reveal reveal-delay-2">
            <p
              v-for="(paragraph, index) in paragraphs"
              :key="index"
              class="article__paragraph"
              :class="{ 'article__paragraph--lead': index === 0 }"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <section v-if="moreArticles.length" class="article__related">
          <SectionHeading
            class="reveal"
            :label="$t('blog.more-label')"
            :title="$t('blog.more')"
          />
          <div class="article__related-grid reveal reveal-delay-1">
            <BlogCard v-for="item in moreArticles" :key="item.id" :blog="item" />
          </div>
        </section>
      </div>
    </article>
  </template>
</template>

<style scoped>
.article__layout {
  max-width: 42rem;
  margin: 0 auto;
}

.article__back {
  margin-bottom: 1.5rem;
}

.article__cover {
  margin: 0 0 2.5rem;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid var(--border-accent);
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, rgba(18, 247, 214, 0.06), rgba(12, 115, 184, 0.1));
}

.article__cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.article__prose {
  padding-bottom: 0.5rem;
}

.article__paragraph {
  font-size: 1.0625rem;
  line-height: 1.85;
  color: var(--text-muted);
}

.article__paragraph + .article__paragraph {
  margin-top: 1.5rem;
}

.article__paragraph--lead {
  font-size: 1.2rem;
  line-height: 1.75;
  color: var(--text);
}

.article__related {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border);
}

.article__related-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .article__paragraph {
    font-size: 1.125rem;
    line-height: 1.9;
  }

  .article__paragraph--lead {
    font-size: 1.3rem;
  }

  .article__related-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
</style>
