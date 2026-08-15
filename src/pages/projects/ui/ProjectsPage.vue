<script setup>
import { projects, WorkProjectCard } from '@/entities/project'
import { usePageSeo } from '@/shared/lib'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

usePageSeo(() => ({
  title: `${t('projects')} | Yan Hanov`,
  description: t('projects-sub'),
  path: '/projects',
}))
</script>

<template>
  <section class="projects-page">
    <div class="projects-page__inner">
      <header class="projects-page__head">
        <p class="projects-page__kicker">2026 · Now</p>
        <h1 class="projects-page__title">{{ $t('projects') }}</h1>
        <p class="projects-page__sub">{{ $t('projects-sub') }}</p>
      </header>

      <div class="projects-page__grid">
        <WorkProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :index="i"
          tone="now"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-page {
  min-height: 100dvh;
  background:
    radial-gradient(ellipse 70% 50% at 20% 0%, rgba(196, 181, 253, 0.12), transparent 50%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(56, 189, 248, 0.06), transparent 46%),
    var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
}

.projects-page__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 5.5rem 1.25rem 5rem;
  box-sizing: border-box;
}

.projects-page__head {
  margin-bottom: 2.5rem;
  max-width: 36rem;
}

.projects-page__kicker {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.projects-page__title {
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 4.5rem);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.05em;
}

.projects-page__sub {
  margin: 1rem 0 0;
  max-width: 32rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--now-muted);
}

.projects-page__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .projects-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
}
</style>
