<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import TypingRoles from './TypingRoles.vue'

const root = ref(null)
const away = ref(false)
let io

onMounted(() => {
  if (!root.value) return
  io = new IntersectionObserver(
    ([entry]) => {
      away.value = !entry.isIntersecting
    },
    { threshold: 0.08 },
  )
  io.observe(root.value)
})

onUnmounted(() => {
  io?.disconnect()
})
</script>

<template>
  <section
    id="hero"
    ref="root"
    class="hero"
    :class="{ 'hero--away': away }"
    data-era-panel
  >
    <div class="hero__media" aria-hidden="true">
      <div class="hero__photo-wrap">
        <img
          src="/hero.png"
          alt=""
          class="hero__photo"
          width="1024"
          height="576"
          decoding="async"
          fetchpriority="high"
        />
      </div>
      <div class="hero__mist">
        <span class="hero__mist-layer hero__mist-layer--a" />
        <span class="hero__mist-layer hero__mist-layer--b" />
      </div>
      <div class="hero__veil" />
    </div>

    <div class="hero__inner">
      <p class="hero__status">
        <span class="hero__status-dot" aria-hidden="true" />
        {{ $t('home.hero-badge') }}
      </p>

      <h1 class="hero__title">
        <span class="hero__title-line">{{ $t('home.bio-name') }}</span>
        <span class="hero__title-line">{{ $t('home.hero-surname') }}</span>
      </h1>

      <p class="hero__role">
        <TypingRoles />
      </p>

      <p class="hero__desc">{{ $t('home.hero-text') }}</p>

      <div class="hero__actions">
        <a
          href="https://t.me/yanhanov"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-opening"
        >
          {{ $t('home.hero-talk') }}
        </a>
        <RouterLink to="/projects" class="btn-opening-ghost">
          {{ $t('home.view-projects') }}
        </RouterLink>
      </div>

      <p class="hero__loc">{{ $t('home.bio-job') }}</p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: var(--opening-bg);
  color: var(--opening-text);
  font-family: var(--opening-font);
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.hero__photo-wrap {
  position: absolute;
  inset: -6%;
  animation: hero-drift 40s ease-in-out 1.4s infinite alternate;
}

.hero:not(.hero--away) .hero__photo-wrap {
  will-change: transform;
}

.hero__photo {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 82% 50%;
  animation: hero-photo 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__mist {
  position: absolute;
  inset: 0;
}

.hero__mist-layer {
  position: absolute;
  inset: -8%;
}

.hero__mist-layer--a {
  background:
    radial-gradient(ellipse 55% 40% at 18% 78%, rgba(244, 240, 234, 0.22), transparent 70%),
    radial-gradient(ellipse 40% 35% at 72% 88%, rgba(180, 160, 130, 0.14), transparent 72%);
  animation: hero-mist-a 22s ease-in-out infinite alternate;
}

.hero__mist-layer--b {
  background:
    radial-gradient(ellipse 50% 32% at 88% 42%, rgba(244, 240, 234, 0.1), transparent 74%),
    radial-gradient(ellipse 45% 28% at 40% 18%, rgba(120, 100, 80, 0.12), transparent 72%);
  animation: hero-mist-b 30s ease-in-out infinite alternate;
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      105deg,
      rgba(14, 12, 10, 0.94) 0%,
      rgba(14, 12, 10, 0.82) 32%,
      rgba(14, 12, 10, 0.38) 58%,
      rgba(14, 12, 10, 0.18) 100%
    ),
    linear-gradient(0deg, rgba(14, 12, 10, 0.78) 0%, transparent 46%);
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 7rem 1.25rem 4.5rem;
  box-sizing: border-box;
  animation: hero-in 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--opening-muted);
}

.hero__status-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #6fbf73;
}

.hero__title {
  margin: 1.25rem 0 0;
  display: flex;
  flex-direction: column;
  font-size: clamp(3.75rem, 14vw, 8.5rem);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.055em;
  color: var(--opening-text);
}

.hero__title-line {
  display: block;
}

.hero__role {
  margin: 1.5rem 0 0;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  min-height: 1.5em;
}

.hero__desc {
  margin: 0.85rem 0 0;
  max-width: 28rem;
  font-size: 1.02rem;
  line-height: 1.65;
  letter-spacing: -0.01em;
  color: var(--opening-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 2rem;
}

.hero__actions :deep(.btn-opening-ghost) {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.hero__loc {
  margin: 2.25rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 240, 234, 0.45);
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-photo {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hero-drift {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-2.4%, 1.2%, 0);
  }
}

@keyframes hero-mist-a {
  from {
    transform: translate3d(-2%, 2%, 0);
  }
  to {
    transform: translate3d(4%, -3%, 0);
  }
}

@keyframes hero-mist-b {
  from {
    transform: translate3d(3%, -1%, 0);
  }
  to {
    transform: translate3d(-4%, 3%, 0);
  }
}

.hero--away .hero__photo-wrap,
.hero--away .hero__mist-layer,
:global(html.is-scrolling) .hero__photo-wrap,
:global(html.page-hidden) .hero__photo-wrap,
:global(html.is-scrolling) .hero__mist-layer,
:global(html.page-hidden) .hero__mist-layer {
  animation-play-state: paused;
}

@media (max-width: 47.99rem) {
  .hero {
    height: auto;
    max-height: none;
    min-height: 100dvh;
  }

  .hero__photo-wrap {
    inset: 0;
    animation: none;
  }

  .hero__photo {
    object-position: 88% 48%;
    animation: none;
  }

  .hero__mist {
    display: none;
  }

  .hero__veil {
    background:
      linear-gradient(180deg, rgba(14, 12, 10, 0.5) 0%, rgba(14, 12, 10, 0.72) 38%, rgba(14, 12, 10, 0.96) 100%),
      linear-gradient(90deg, rgba(14, 12, 10, 0.72) 0%, transparent 62%);
  }

  .hero__inner {
    padding-top: 6.5rem;
    padding-bottom: 3.25rem;
    animation: none;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__actions :deep(.btn-opening),
  .hero__actions :deep(.btn-opening-ghost) {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__inner,
  .hero__photo,
  .hero__photo-wrap,
  .hero__mist-layer {
    animation: none;
  }
}
</style>
