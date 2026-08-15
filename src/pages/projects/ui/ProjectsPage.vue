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
        <p class="projects-page__kicker">2000 · Y2K</p>
        <h1 class="projects-page__title">{{ $t('projects') }}</h1>
        <p class="projects-page__sub">{{ $t('projects-sub') }}</p>
      </header>

      <div class="projects-page__grid">
        <WorkProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-page {
  min-height: calc(100dvh - 3.5rem);
  background: var(--y2k-bg);
  color: var(--y2k-ink);
  font-family: var(--y2k-font);
}

.projects-page__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 4.5rem 1.25rem 5rem;
  box-sizing: border-box;
}

.projects-page__head {
  margin-bottom: 2rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgba(57, 243, 255, 0.28);
}

.projects-page__kicker {
  margin: 0 0 0.65rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--y2k-cyan);
}

.projects-page__title {
  margin: 0;
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.projects-page__sub {
  margin: 0.85rem 0 0;
  max-width: 30rem;
  color: var(--y2k-muted);
}

.projects-page__grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 48rem) {
  .projects-page__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
