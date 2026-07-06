<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { PageHero } from '@/shared/ui/page-hero'
import { SectionHeading } from '@/shared/ui/section-heading'
import { useScrollReveal, usePageSeo } from '@/shared/lib'
import {
  blogs,
  getBlogBySlug,
  getBlogTitle,
  getBlogParagraphs,
  getBlogExcerpt,
  getBlogSlug,
  BlogCard,
} from '@/entities/blog'
import {
  SITE_AUTHOR,
  SITE_AUTHOR_URL,
  SITE_NAME,
  absoluteUrl,
} from '@/shared/config/site'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

useScrollReveal()

const blog = computed(() => getBlogBySlug(route.params.article))

const title = computed(() => (blog.value ? getBlogTitle(blog.value, locale.value) : ''))

const paragraphs = computed(() =>
  blog.value ? getBlogParagraphs(blog.value, locale.value) : [],
)

const excerpt = computed(() =>
  blog.value ? getBlogExcerpt(blog.value, locale.value, 160) : '',
)

const wordCount = computed(() =>
  paragraphs.value.join(' ').split(/\s+/).filter(Boolean).length,
)

const readingMinutes = computed(() =>
  Math.max(1, Math.round(wordCount.value / 180)),
)

const readingTime = computed(() => t('blog.reading-time', { n: readingMinutes.value }))

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

const articlePath = computed(() =>
  blog.value ? `/blogs/${getBlogSlug(blog.value)}` : route.path,
)

const moreArticles = computed(() =>
  blogs.filter((item) => item.id !== blog.value?.id).slice(0, 2),
)

usePageSeo(() => {
  if (!blog.value) return null

  const pageTitle = `${title.value} | ${t('blog.seo.title-suffix')} | ${SITE_NAME}`

  return {
    title: pageTitle,
    description: excerpt.value,
    path: articlePath.value,
    image: blog.value.img,
    type: 'article',
    publishedTime: `${blog.value.date}T00:00:00+05:00`,
    modifiedTime: `${blog.value.date}T00:00:00+05:00`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': absoluteUrl(articlePath.value),
          headline: title.value,
          description: excerpt.value,
          image: [absoluteUrl(blog.value.img)],
          datePublished: blog.value.date,
          dateModified: blog.value.date,
          inLanguage: locale.value,
          wordCount: wordCount.value,
          timeRequired: `PT${readingMinutes.value}M`,
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: SITE_AUTHOR_URL,
          },
          publisher: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: SITE_AUTHOR_URL,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': absoluteUrl(articlePath.value),
          },
          isPartOf: {
            '@type': 'Blog',
            name: t('blog.seo.list-title'),
            url: absoluteUrl('/blogs'),
          },
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
            {
              '@type': 'ListItem',
              position: 3,
              name: title.value,
              item: absoluteUrl(articlePath.value),
            },
          ],
        },
      ],
    },
  }
})

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

    <article class="article mb-20" itemscope itemtype="https://schema.org/BlogPosting">
      <meta itemprop="headline" :content="title" />
      <meta itemprop="description" :content="excerpt" />
      <meta itemprop="datePublished" :content="blog.date" />
      <meta itemprop="dateModified" :content="blog.date" />
      <meta itemprop="author" :content="t('blog.author')" />
      <link itemprop="mainEntityOfPage" :href="absoluteUrl(articlePath)" />
      <link v-if="blog.img" itemprop="image" :href="absoluteUrl(blog.img)" />

      <div class="container">
        <div class="article__layout">
          <nav class="article__breadcrumb reveal" aria-label="Breadcrumb">
            <ol class="article__breadcrumb-list">
              <li>
                <RouterLink to="/">{{ $t('blog.seo.breadcrumb-home') }}</RouterLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <RouterLink to="/blogs">{{ $t('blog.seo.breadcrumb-blog') }}</RouterLink>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{{ title }}</li>
            </ol>
          </nav>

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

          <header class="article__meta reveal reveal-delay-1">
            <time class="article__date" :datetime="blog.date" itemprop="datePublished">
              {{ formattedDate }}
            </time>
            <span class="article__meta-sep" aria-hidden="true">·</span>
            <span class="article__reading-time">{{ readingTime }}</span>
            <span class="article__meta-sep" aria-hidden="true">·</span>
            <address class="article__author" itemprop="author" itemscope itemtype="https://schema.org/Person">
              <span itemprop="name">{{ $t('blog.author') }}</span>
            </address>
          </header>

          <figure v-if="blog.img" class="article__cover reveal reveal-delay-1">
            <img :src="blog.img" :alt="title" loading="eager" decoding="async" itemprop="image" />
          </figure>

          <div class="article__prose reveal reveal-delay-2" itemprop="articleBody">
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

        <section v-if="moreArticles.length" class="article__related" :aria-label="$t('blog.more')">
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

.article__breadcrumb {
  margin-bottom: 1rem;
}

.article__breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: var(--text-muted);
}

.article__breadcrumb-list a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.article__breadcrumb-list a:hover {
  color: var(--accent);
}

.article__breadcrumb-list li[aria-current='page'] {
  color: var(--text);
}

.article__back {
  margin-bottom: 1.5rem;
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  margin-bottom: 1.75rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.article__date,
.article__reading-time,
.article__author {
  font-style: normal;
}

.article__meta-sep {
  opacity: 0.5;
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
