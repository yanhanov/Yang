<script setup>
import { RouterView } from 'vue-router'
import { usePageVisible } from '@/shared/lib'
import { SiteHeader } from '@/widgets/site-header'
import { SiteFooter } from '@/widgets/site-footer'

usePageVisible()
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-shell__main pt-14 relative z-10 page-main">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>
