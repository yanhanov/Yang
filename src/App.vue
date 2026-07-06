<script setup>
import { RouterView } from 'vue-router'
import { usePageVisible } from '@/composables/usePageVisible'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import ScrollProgress from './components/UI/ScrollProgress.vue'
import BackToTop from './components/UI/BackToTop.vue'
import CursorGlow from './components/UI/CursorGlow.vue'

usePageVisible()
</script>

<template>
  <CursorGlow />
  <ScrollProgress />
  <Header />
  <main class="pt-[3.75rem] relative z-10 page-main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <Footer />
  <BackToTop />
</template>
