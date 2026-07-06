<script setup>
import { computed } from 'vue'
import { PageHero } from '@/shared/ui/page-hero'
import { useScrollReveal } from '@/shared/lib'
import { blogs, BlogCard } from '@/entities/blog'

useScrollReveal()

const articles = computed(() => [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)))
</script>

<template>
  <PageHero label="// blog" :title="$t('blogs')" :subtitle="$t('blogs-sub')" />
  <section class="blogs-page mb-20">
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
