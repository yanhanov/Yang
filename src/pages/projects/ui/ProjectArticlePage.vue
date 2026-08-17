<script setup>
import { computed, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal, usePageSeo } from '@/shared/lib'
import {
  projects,
  getProjectBySlug,
  projectHasPage,
  WorkProjectCard,
} from '@/entities/project'
import { TechIcon } from '@/shared/ui/tech-icon'
import {
  SITE_AUTHOR,
  SITE_AUTHOR_URL,
  SITE_NAME,
  absoluteUrl,
} from '@/shared/config/site'

const route = useRoute()
const router = useRouter()
const { t, tm, te } = useI18n()

useScrollReveal()

const project = computed(() => getProjectBySlug(route.params.project))

const title = computed(() => (project.value ? t(project.value.titleKey) : ''))
const description = computed(() => (project.value ? t(project.value.descKey) : ''))
const role = computed(() =>
  project.value?.roleKey && te(project.value.roleKey) ? t(project.value.roleKey) : '',
)

const paragraphs = computed(() => {
  if (!project.value?.paragraphsKey || !te(project.value.paragraphsKey)) return []
  const value = tm(project.value.paragraphsKey)
  return Array.isArray(value) ? value.map(String) : []
})

const features = computed(() => {
  if (!project.value?.featuresKey || !te(project.value.featuresKey)) return []
  const value = tm(project.value.featuresKey)
  return Array.isArray(value) ? value.map(String) : []
})

const articlePath = computed(() =>
  project.value ? `/projects/${project.value.id}` : route.path,
)

const moreProjects = computed(() =>
  projects.filter((item) => item.id !== project.value?.id).slice(0, 2),
)

const tagIcons = {
  'Vue 3': 'vue',
  Vue: 'vue',
  TypeScript: 'typescript',
  TS: 'typescript',
  Vite: null,
  Extension: null,
  Gemini: null,
  Lead: null,
  Architecture: null,
  'REST API': 'api',
  Performance: null,
  EdTech: null,
  Nuxt: 'nuxt',
}

usePageSeo(() => {
  if (!project.value || !projectHasPage(project.value)) return null

  const pageTitle = `${title.value} | ${t('project.seo.title-suffix')} | ${SITE_NAME}`

  return {
    title: pageTitle,
    description: description.value,
    path: articlePath.value,
    image: project.value.img,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': absoluteUrl(articlePath.value),
          name: title.value,
          description: description.value,
          image: [absoluteUrl(project.value.img)],
          applicationCategory: 'BrowserApplication',
          operatingSystem: 'Firefox, Chrome, Edge',
          author: {
            '@type': 'Person',
            name: SITE_AUTHOR,
            url: SITE_AUTHOR_URL,
          },
          url: absoluteUrl(articlePath.value),
          codeRepository: project.value.github,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: t('project.seo.breadcrumb-home'),
              item: absoluteUrl('/'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: t('project.seo.breadcrumb-projects'),
              item: absoluteUrl('/projects'),
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
  () => route.params.project,
  (slug) => {
    const found = getProjectBySlug(slug)
    if (!found || !projectHasPage(found)) {
      router.replace({ name: 'not-found' })
    }
  },
  { immediate: true },
)
</script>

<template>
  <template v-if="project && projectHasPage(project)">
    <div class="article-shell">
      <article class="article">
        <div class="article__wrap">
          <RouterLink to="/projects" class="article__back reveal">
            ← {{ $t('project.back') }}
          </RouterLink>

          <header class="article__head reveal">
            <p class="article__kicker">{{ role || $t('project.kicker') }}</p>
            <h1 class="article__title">{{ title }}</h1>
            <p class="article__lead">{{ description }}</p>

            <div class="article__meta">
              <span v-if="project.year">{{ project.year }}</span>
              <span v-if="project.year" aria-hidden="true">·</span>
              <div class="article__tags">
                <span v-for="item in project.tags" :key="item" class="article__tag">
                  <TechIcon v-if="tagIcons[item]" :name="tagIcons[item]" :size="12" />
                  {{ item }}
                </span>
              </div>
            </div>

            <div v-if="project.github || project.url" class="article__actions">
              <a
                v-if="project.github"
                class="article__btn"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('project.github') }} ↗
              </a>
              <a
                v-if="project.url"
                class="article__btn article__btn--ghost"
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('project.live') }} ↗
              </a>
            </div>
          </header>

          <figure v-if="project.img" class="article__cover reveal reveal-delay-1">
            <img :src="project.img" :alt="title" loading="eager" decoding="async" />
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

          <section v-if="features.length" class="article__features reveal reveal-delay-2">
            <h2 class="article__features-title">{{ $t('project.features') }}</h2>
            <ul class="article__features-list">
              <li v-for="feature in features" :key="feature">{{ feature }}</li>
            </ul>
          </section>

          <section v-if="moreProjects.length" class="article__related" :aria-label="$t('project.more')">
            <p class="article__related-kicker reveal">{{ $t('project.more-label') }}</p>
            <h2 class="article__related-title reveal">{{ $t('project.more') }}</h2>
            <div class="article__related-list reveal reveal-delay-1">
              <WorkProjectCard
                v-for="(item, i) in moreProjects"
                :key="item.id"
                :project="item"
                :index="i"
                tone="now"
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

.article__lead {
  margin: 1rem 0 0;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--now-muted);
}

.article__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 0.65rem;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  color: var(--now-muted);
}

.article__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.article__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid rgba(250, 250, 250, 0.1);
  background: rgba(250, 250, 250, 0.04);
  font-size: 0.68rem;
  color: var(--now-muted);
}

.article__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.article__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.05rem;
  border-radius: 999px;
  background: var(--now-ink);
  color: var(--now-bg);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}

.article__btn--ghost {
  background: transparent;
  color: var(--now-ink);
  border: 1px solid rgba(250, 250, 250, 0.16);
}

.article__btn:hover {
  opacity: 0.9;
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

.article__features {
  margin-top: 2.75rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.article__features-title {
  margin: 0 0 1rem;
  font-size: 1.35rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.article__features-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.75rem;
}

.article__features-list li {
  position: relative;
  padding-left: 1.15rem;
  color: var(--now-muted);
  line-height: 1.55;
  font-size: 0.98rem;
}

.article__features-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55rem;
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 999px;
  background: var(--now-accent);
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
  margin: 0 0 1rem;
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.article__related-list {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .article__paragraph {
    font-size: 1.125rem;
    line-height: 1.9;
  }

  .article__paragraph--lead {
    font-size: 1.28rem;
  }

  .article__related-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
