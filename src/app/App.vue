<script setup>
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import { usePageVisible } from '@/shared/lib'
import { SiteHeader } from '@/widgets/site-header'
import { SiteFooter } from '@/widgets/site-footer'

usePageVisible()

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-shell__main relative z-10 page-main" :class="{ 'pt-14': !isHome }">
      <RouterView v-slot="{ Component, route: viewRoute }">
        <Transition name="page">
          <component :is="Component" :key="viewRoute.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter v-if="!isHome" />
  </div>
</template>
