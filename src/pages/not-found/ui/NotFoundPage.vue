<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="notfound">
    <div class="notfound__inner">
      <p class="notfound__kicker">404</p>
      <h1 class="notfound__title">404</h1>
      <p class="notfound__text">{{ $t('notfound.text') }}</p>
      <RouterLink to="/" class="notfound__btn">
        {{ $t('notfound.back') }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5.5rem 1.25rem 4rem;
  box-sizing: border-box;
  background:
    radial-gradient(ellipse 70% 45% at 20% 0%, rgba(196, 181, 253, 0.12), transparent 52%),
    var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
  text-align: center;
}

.notfound__kicker {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--now-accent);
}

.notfound__title {
  margin: 0;
  font-size: clamp(5rem, 18vw, 9rem);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.06em;
}

.notfound__text {
  margin: 1rem 0 0;
  color: var(--now-muted);
  font-size: 1.05rem;
}

.notfound__btn {
  display: inline-flex;
  margin-top: 1.75rem;
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  background: var(--now-ink);
  color: var(--now-bg);
  font-size: 0.9rem;
  font-weight: 600;
}

.notfound__btn:hover {
  opacity: 0.88;
}
</style>
