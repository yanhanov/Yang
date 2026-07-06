<script setup>
import { projects, ProjectCard } from '@/entities/project'
import { PageHero } from '@/shared/ui/page-hero'
import { useScrollReveal } from '@/shared/lib'

useScrollReveal()
</script>

<template>
  <PageHero label="// work" :title="$t('portfolio')" :subtitle="$t('portfolio-sub')" />
  <section class="mb-20">
    <div class="container">
      <div class="grid md:grid-cols-2 gap-6 reveal reveal-delay-1">
        <ProjectCard
          v-for="(project, i) in projects"
          :key="project.id"
          :project="project"
          :featured="i === 0"
          :index="i"
        />
      </div>
    </div>
  </section>
</template>
