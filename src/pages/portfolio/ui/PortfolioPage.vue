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
      <div class="grid md:grid-cols-3 gap-4 reveal reveal-delay-1">
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
