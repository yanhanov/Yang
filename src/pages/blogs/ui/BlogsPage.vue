<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal, usePageSeo } from '@/shared/lib'
import {
  blogs,
  BlogCard,
  getBlogTitle,
  getBlogExcerpt,
  getBlogSlug,
} from '@/entities/blog'
import {
  SITE_AUTHOR,
  SITE_AUTHOR_URL,
  SITE_NAME,
  absoluteUrl,
} from '@/shared/config/site'

const { locale, t } = useI18n()

useScrollReveal()

const articles = computed(() => [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)))
const featured = computed(() => articles.value[0] ?? null)
const rest = computed(() => articles.value.slice(1))

usePageSeo(() => {
  const title = `${t('blog.seo.list-title')} | ${SITE_NAME}`
  const description = t('blog.seo.list-description')

  return {
    title,
    description,
    path: '/blogs',
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          '@id': absoluteUrl('/blogs'),
          name: t('blog.seo.list-title'),
          description,
          url: absoluteUrl('/blogs'),
          inLanguage: locale.value,
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: SITE_AUTHOR_URL,
          },
          blogPost: articles.value.map((blog) => ({
            '@type': 'BlogPosting',
            headline: getBlogTitle(blog, locale.value),
            description: getBlogExcerpt(blog, locale.value),
            url: absoluteUrl(`/blogs/${getBlogSlug(blog)}`),
            datePublished: blog.date,
            image: absoluteUrl(blog.img),
            author: {
              '@type': 'Person',
              name: SITE_AUTHOR,
              url: SITE_AUTHOR_URL,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: t('blog.seo.breadcrumb-home'),
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: t('blog.seo.breadcrumb-blog'),
              item: absoluteUrl('/blogs'),
            },
          ],
        },
      ],
    },
  }
})
</script>

<template>
  <div class="blogs-shell">
    <header class="blogs-head">
      <p class="blogs-head__kicker">2026 · Now</p>
      <div class="blogs-head__row">
        <h1 class="blogs-head__title">{{ $t('blogs') }}</h1>
        <p class="blogs-head__count">{{ $t('blog.count', { n: articles.length }) }}</p>
      </div>
      <p class="blogs-head__sub">{{ $t('blogs-sub') }}</p>
    </header>

    <section class="blogs-page" aria-labelledby="blogs-heading">
      <h2 id="blogs-heading" class="sr-only">{{ $t('blogs') }}</h2>

      <BlogCard
        v-if="featured"
        class="reveal"
        :blog="featured"
        layout="feature"
      />

      <div v-if="rest.length" class="blogs-list reveal reveal-delay-1">
        <BlogCard
          v-for="blog in rest"
          :key="blog.id"
          :blog="blog"
          layout="row"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.blogs-shell {
  min-height: 100dvh;
  background:
    radial-gradient(ellipse 70% 45% at 12% 0%, rgba(196, 181, 253, 0.14), transparent 52%),
    radial-gradient(ellipse 45% 35% at 92% 18%, rgba(56, 189, 248, 0.07), transparent 48%),
    var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
  padding: 5.5rem 1.25rem 5rem;
  box-sizing: border-box;
}

.blogs-head,
.blogs-page {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
}

.blogs-head {
  margin-bottom: 2.75rem;
}

.blogs-head__kicker {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.blogs-head__row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1.25rem;
}

.blogs-head__title {
  margin: 0;
  font-size: clamp(2.6rem, 8vw, 4.75rem);
  font-weight: 600;
  line-height: 0.92;
  letter-spacing: -0.055em;
}

.blogs-head__count {
  margin: 0;
  font-size: 0.85rem;
  color: var(--now-muted);
}

.blogs-head__sub {
  margin: 1rem 0 0;
  max-width: 28rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--now-muted);
}

.blogs-list {
  margin-top: 0.25rem;
}
</style>
