<script setup>
import { ref } from 'vue'
import PageHero from '@/components/UI/PageHero.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { blogs as blogData } from '@/data/blogs'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const blogs = ref([...blogData].reverse())
const activeBlogIds = ref([])

useScrollReveal()

const toggleBlog = (key) => {
  if (activeBlogIds.value.includes(key)) {
    activeBlogIds.value = activeBlogIds.value.filter((id) => id !== key)
  } else {
    activeBlogIds.value.push(key)
  }
}

const isActive = (key) => activeBlogIds.value.includes(key)
</script>

<template>
  <PageHero label="// blog" :title="$t('blogs')" :subtitle="$t('blogs-sub')" />
  <section class="mb-20">
    <div class="container">
      <article
        v-for="blog in blogs"
        :key="blog.key"
        class="reveal glass-card my-5 overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:border-[var(--brand)]/30"
        @click="toggleBlog(blog.key)"
        :class="{
          'max-h-[10000px]': isActive(blog.key),
          'md:max-h-[420px] max-h-[400px]': !isActive(blog.key),
        }"
      >
        <div class="relative overflow-hidden">
          <img
            :src="blog.img"
            :alt="locale === 'en' ? blog.titleEn : blog.titleRu"
            class="w-full h-56 md:h-72 object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg)] to-transparent" />
          <time
            v-if="blog.date"
            class="absolute top-4 right-4 text-xs base-font px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm color-brand border border-[var(--border-accent)]"
          >
            {{ blog.date }}
          </time>
        </div>
        <div class="p-6 md:p-8">
          <p class="section-label mb-2">article</p>
          <h2 class="secont-font font-medium text-xl md:text-2xl leading-snug">
            <span v-if="locale === 'en'">{{ blog.titleEn }}</span>
            <span v-else>{{ blog.titleRu }}</span>
          </h2>
          <p class="mt-4 text-[var(--text-muted)] leading-relaxed">
            <span v-if="locale === 'en'">{{ blog.textEn }}</span>
            <span v-else>{{ blog.textRu }}</span>
          </p>
          <p class="mt-4 text-sm color-brand base-font">
            {{ isActive(blog.key) ? $t('collapse') : $t('read-more') }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>
