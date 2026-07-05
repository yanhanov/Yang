<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="min-h-[70vh] flex items-center justify-center">
    <div class="container text-center reveal revealed">
      <p class="section-label mb-4">// 404</p>
      <h1 class="gradient-text text-8xl secont-font font-medium">404</h1>
      <p class="mt-4 text-[var(--text-muted)] text-lg">{{ $t('notfound.text') }}</p>
      <RouterLink to="/" class="btn-primary mt-8 inline-flex">
        {{ $t('notfound.back') }}
      </RouterLink>
    </div>
  </section>
</template>
