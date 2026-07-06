<script setup>
import { RouterView } from 'vue-router'
import { usePageVisible } from '@/shared/lib'
import { SiteHeader } from '@/widgets/site-header'
import { SiteFooter } from '@/widgets/site-footer'
import { ScrollProgress } from '@/shared/ui/scroll-progress'
import { BackToTop } from '@/shared/ui/back-to-top'
import { CursorGlow } from '@/shared/ui/cursor-glow'

usePageVisible()
</script>

<template>
  <div class="app-shell">
    <CursorGlow />
    <ScrollProgress />
    <SiteHeader />
    <main class="app-shell__main pt-[3.75rem] relative z-10 page-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
