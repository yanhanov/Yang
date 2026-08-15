<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal, usePageSeo } from '@/shared/lib'
import {
  blogs,
  getBlogBySlug,
  getBlogTitle,
  getBlogParagraphs,
  getBlogExcerpt,
  getBlogSlug,
  BlogCard,
  getBlogCategory,
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
const category = computed(() => (blog.value ? getBlogCategory(blog.value, locale.value) : ''))

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
    <div class="article-shell">
      <article class="article" itemscope itemtype="https://schema.org/BlogPosting">
        <meta itemprop="headline" :content="title" />
        <meta itemprop="description" :content="excerpt" />
        <meta itemprop="datePublished" :content="blog.date" />
        <meta itemprop="dateModified" :content="blog.date" />
        <meta itemprop="author" :content="t('blog.author')" />
        <link itemprop="mainEntityOfPage" :href="absoluteUrl(articlePath)" />
        <link v-if="blog.img" itemprop="image" :href="absoluteUrl(blog.img)" />

        <div class="article__wrap">
          <RouterLink to="/blogs" class="article__back reveal">
            ← {{ $t('blog.back') }}
          </RouterLink>

          <header class="article__head reveal">
            <p class="article__kicker">{{ category }}</p>
            <h1 class="article__title" itemprop="headline">{{ title }}</h1>
            <div class="article__meta">
              <time :datetime="blog.date" itemprop="datePublished">{{ formattedDate }}</time>
              <span aria-hidden="true">·</span>
              <span>{{ readingTime }}</span>
              <span aria-hidden="true">·</span>
              <address itemprop="author" itemscope itemtype="https://schema.org/Person">
                <span itemprop="name">{{ $t('blog.author') }}</span>
              </address>
            </div>
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

          <section v-if="moreArticles.length" class="article__related" :aria-label="$t('blog.more')">
            <p class="article__related-kicker reveal">{{ $t('blog.more-label') }}</p>
            <h2 class="article__related-title reveal">{{ $t('blog.more') }}</h2>
            <div class="article__related-list reveal reveal-delay-1">
              <BlogCard
                v-for="item in moreArticles"
                :key="item.id"
                :blog="item"
                layout="row"
              />
            </div>
          </section>
        </div>
      </article>
    </div>
  </template>
</template>

<style scoped>
.article-shell {
  min-height: 100dvh;
  background:
    radial-gradient(ellipse 70% 45% at 12% 0%, rgba(196, 181, 253, 0.12), transparent 52%),
    var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
  padding: 5.5rem 1.25rem 5rem;
  box-sizing: border-box;
}

.article__wrap {
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
}

.article__back {
  display: inline-flex;
  margin-bottom: 1.75rem;
  font-size: 0.875rem;
  color: var(--now-muted);
}

.article__back:hover {
  color: var(--now-ink);
}

.article__kicker {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.article__title {
  margin: 0;
  font-size: clamp(2.2rem, 6vw, 3.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  margin-top: 1.1rem;
  font-size: 0.875rem;
  color: var(--now-muted);
}

.article__meta address {
  margin: 0;
  font-style: normal;
}

.article__cover {
  margin: 2rem 0 2.5rem;
  overflow: hidden;
  border-radius: 1.25rem;
  border: 1px solid rgba(250, 250, 250, 0.08);
  aspect-ratio: 16 / 9;
  background: #111113;
}

.article__cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.article__paragraph {
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.85;
  color: var(--now-muted);
}

.article__paragraph + .article__paragraph {
  margin-top: 1.5rem;
}

.article__paragraph--lead {
  font-size: 1.2rem;
  line-height: 1.75;
  color: var(--now-ink);
}

.article__related {
  margin-top: 3.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.article__related-kicker {
  margin: 0 0 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.article__related-title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.article__related-list {
  margin-top: 0.5rem;
}

@media (min-width: 48rem) {
  .article__paragraph {
    font-size: 1.125rem;
    line-height: 1.9;
  }

  .article__paragraph--lead {
    font-size: 1.28rem;
  }
}
</style>
