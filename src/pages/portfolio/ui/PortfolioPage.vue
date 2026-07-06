<script setup>
import { projects, WorkProjectCard } from '@/entities/project'
import { PageHero } from '@/shared/ui/page-hero'
import { useScrollReveal } from '@/shared/lib'

useScrollReveal()
</script>

<template>
  <PageHero label="// projects" :title="$t('portfolio')" :subtitle="$t('portfolio-sub')" />
  <section class="mb-20">
    <div class="container">
      <div class="portfolio-grid reveal reveal-delay-1">
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
.portfolio-grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
</style>
