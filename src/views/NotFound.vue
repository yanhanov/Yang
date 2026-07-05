<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page-top-gradient min-h-[70vh] flex items-center justify-center py-16">
    <div class="page-top-gradient__mesh" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--left" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--right" aria-hidden="true" />

    <div class="container relative text-center reveal revealed">
      <p class="section-label mb-4">// 404</p>
      <h1 class="gradient-text text-8xl secont-font font-medium">404</h1>
      <p class="mt-4 text-[var(--text-muted)] text-lg">{{ $t('notfound.text') }}</p>
      <RouterLink to="/" class="btn-primary mt-8 inline-flex">
        {{ $t('notfound.back') }}
      </RouterLink>
    </div>
  </section>
</template>
