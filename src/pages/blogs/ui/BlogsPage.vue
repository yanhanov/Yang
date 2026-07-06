<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { PageHero } from '@/shared/ui/page-hero'
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
  <PageHero label="// blog" :title="$t('blogs')" :subtitle="$t('blogs-sub')" />
  <section class="blogs-page mb-20" aria-labelledby="blogs-heading">
    <h2 id="blogs-heading" class="sr-only">{{ $t('blogs') }}</h2>
    <div class="container">
      <p class="blogs-page__count base-font reveal">{{ $t('blog.count', { n: articles.length }) }}</p>
      <div class="blogs-grid reveal reveal-delay-1">
        <BlogCard v-for="blog in articles" :key="blog.id" :blog="blog" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.blogs-page__count {
  margin-bottom: 1.25rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.blogs-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .blogs-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
</style>
