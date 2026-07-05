<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import TypingRoles from './TypingRoles.vue'
import TechIcon from './TechIcon.vue'

const stats = ref({ products: 0, tech: 0, years: 0 })
const targets = { products: 4, tech: 10, years: 2 }

const stack = [
  { icon: 'vue', label: 'Vue 3' },
  { icon: 'typescript', label: 'TS' },
  { icon: 'nuxt', label: 'Nuxt' },
  { icon: 'react', label: 'React' },
]

onMounted(() => {
  const start = performance.now()
  const duration = 1400

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    stats.value.products = Math.round(ease * targets.products)
    stats.value.tech = Math.round(ease * targets.tech)
    stats.value.years = Math.round(ease * targets.years)
    if (p < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
})
</script>

<template>
  <section
    id="hero"
    class="page-section page-section--hero hero-section page-top-gradient relative overflow-hidden min-h-screen flex items-center py-12 lg:py-16"
  >
    <div class="page-top-gradient__mesh" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--left" aria-hidden="true" />
    <div class="page-top-gradient__glow page-top-gradient__glow--right" aria-hidden="true" />
    <div class="hero-line hero-line--1" aria-hidden="true" />
    <div class="hero-line hero-line--2" aria-hidden="true" />

    <div class="container relative">
      <div class="hero-grid">
        <!-- Left: copy -->
        <div class="hero-copy">
          <div class="reveal">
            <span class="hero-badge">
              <span class="hero-badge__dot" />
              {{ $t('home.hero-badge') }}
            </span>
          </div>

          <p class="hero-eyebrow base-font reveal">{{ $t('home.hero-greeting') }}</p>

          <h1 class="hero-title secont-font reveal">
            <span class="hero-title__name">{{ $t('home.bio-name') }}</span>
            <span class="hero-title__surname gradient-text">{{ $t('home.hero-surname') }}</span>
          </h1>

          <div class="hero-role reveal reveal-delay-1">
            <TypingRoles />
          </div>

          <p class="hero-desc reveal reveal-delay-1">{{ $t('home.hero-text') }}</p>

          <div class="hero-actions reveal reveal-delay-2">
            <a href="https://t.me/yanhanov" target="_blank" class="btn-primary">
              {{ $t('home.hero-talk') }}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </a>
            <RouterLink to="/portfolio" class="btn-ghost">
              {{ $t('home.featured-more') }}
            </RouterLink>
            <a
              href="/yan-hanov.pdf"
              download="yan-hanov.pdf"
              class="btn-ghost hidden sm:inline-flex"
            >
              {{ $t('home.bio-cv') }}
            </a>
          </div>

          <div class="hero-stats reveal reveal-delay-2">
            <div
              v-for="(stat, i) in [
                { val: stats.products, label: 'home.hero-products' },
                { val: stats.tech, label: 'home.hero-tech' },
                { val: stats.years, label: 'home.hero-years' },
              ]"
              :key="stat.label"
              class="hero-stat"
              :class="{ 'hero-stat--border': i < 2 }"
            >
              <span class="hero-stat__val secont-font">{{ stat.val }}+</span>
              <span class="hero-stat__label">{{ $t(stat.label) }}</span>
            </div>
          </div>
        </div>

        <!-- Right: profile -->
        <div class="hero-profile reveal reveal-delay-1">
          <div class="hero-terminal hero-profile__window">
            <div class="hero-terminal__bar">
              <span class="hero-terminal__dot bg-[#ff5f57]" />
              <span class="hero-terminal__dot bg-[#febc2e]" />
              <span class="hero-terminal__dot bg-[#28c840]" />
              <span class="hero-terminal__file base-font">profile.vue</span>
            </div>

            <div class="hero-profile__body">
              <div class="hero-profile__photo-wrap">
                <img
                  src="/yan-profile.png"
                  alt="Yazmyrat Hanov"
                  class="hero-profile__photo"
                  width="224"
                  height="224"
                />
              </div>

              <div class="hero-profile__info">
                <p class="hero-profile__name secont-font">{{ $t('home.bio-fullname') }}</p>
                <p class="hero-profile__role base-font">{{ $t('home.bio-prof') }}</p>
              </div>

              <div class="hero-profile__stack">
                <span v-for="item in stack" :key="item.icon" class="hero-profile__tag base-font">
                  <TechIcon :name="item.icon" :size="16" />
                  {{ item.label }}
                </span>
              </div>

              <div class="hero-profile__meta base-font">
                <p>
                  <span class="tok-prop">email</span><span class="tok-punct">:</span>
                  <a href="mailto:yanhanow@gmail.ru" class="tok-string hero-profile__link"
                    >'yanhanow@gmail.ru'</a
                  ><span class="tok-punct">,</span>
                </p>
                <p>
                  <span class="tok-prop">location</span><span class="tok-punct">:</span>
                  <span class="tok-string">'{{ $t('home.bio-con') }}'</span
                  ><span class="tok-punct">,</span>
                </p>
                <p>
                  <span class="tok-prop">remote</span><span class="tok-punct">:</span>
                  <span class="tok-bool"> true</span>
                </p>
              </div>

              <a
                href="https://t.me/yanhanov"
                target="_blank"
                class="btn-primary hero-profile__btn text-sm"
              >
                {{ $t('home.bio-write') }}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a href="#about" class="scroll-hint" aria-label="Scroll down">
      <span class="scroll-hint__mouse" />
    </a>
  </section>
</template>

<style scoped>
.hero-section {
  isolation: isolate;
}

.hero-line {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(18, 247, 214, 0.25), transparent);
  pointer-events: none;
}

.hero-line--1 {
  top: 22%;
  left: 0;
  right: 0;
  opacity: 0.4;
}

.hero-line--2 {
  bottom: 18%;
  left: 10%;
  right: 10%;
  opacity: 0.2;
}

.hero-grid {
  display: grid;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 64rem) {
  .hero-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem 3rem;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem 0.375rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 247, 214, 0.35);
  background: rgba(18, 247, 214, 0.08);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.8125rem;
  color: var(--brand);
  letter-spacing: 0.02em;
}

.hero-badge__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 10px var(--brand);
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.85);
  }
}

.hero-eyebrow {
  margin-top: 1.75rem;
  font-size: 0.875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.hero-title {
  margin-top: 0.5rem;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.hero-title__name {
  color: var(--text);
}

.hero-title__surname {
  display: block;
}

.hero-role {
  margin-top: 0.75rem;
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-family: 'IBM Plex Mono', monospace;
  min-height: 2.5rem;
}

.hero-terminal {
  margin-top: 1.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: rgba(26, 30, 35, 0.9);
  overflow: hidden;
  max-width: 32rem;
  box-shadow: 0 24px 64px -32px rgba(0, 0, 0, 0.8);
}

.hero-terminal__bar {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1rem;
  border-bottom: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.25);
}

.hero-terminal__dot {
  width: 0.625rem;
  height: 0.625rem;
  border-radius: 50%;
}

.hero-terminal__file {
  margin-left: 0.5rem;
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.hero-terminal__body {
  padding: 1rem 1.25rem;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: var(--text-muted);
}

.tok-comment {
  color: #6a737d;
}
.tok-keyword {
  color: #ff79c6;
}
.tok-prop {
  color: #8be9fd;
}
.tok-string {
  color: #f1fa8c;
}
.tok-bool {
  color: #bd93f9;
}
.tok-brace {
  color: var(--text);
}
.tok-punct {
  color: var(--text-muted);
}

.hero-desc {
  margin-top: 1.5rem;
  max-width: 34rem;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--text-muted);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-top: 2.5rem;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
  max-width: 32rem;
}

.hero-stat {
  flex: 1;
  min-width: 5.5rem;
  padding: 0 1.25rem;
}

.hero-stat:first-child {
  padding-left: 0;
}

.hero-stat--border {
  border-right: 1px solid var(--border);
}

.hero-stat__val {
  display: block;
  font-size: 2rem;
  font-weight: 500;
  color: var(--brand);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.hero-stat__label {
  display: block;
  margin-top: 0.375rem;
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--text-muted);
}

.hero-profile {
  display: flex;
  justify-content: center;
}

.hero-profile__window {
  width: min(100%, 26rem);
  max-width: none;
  margin-top: 0;
}

.hero-profile__body {
  padding: 1.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-profile__photo-wrap {
  padding: 3px;
  border-radius: 50%;
  border: 1px solid var(--border-accent);
  background: rgba(18, 247, 214, 0.06);
}

.hero-profile__photo {
  display: block;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 2px solid var(--border);
}

.hero-profile__info {
  margin-top: 1.25rem;
}

.hero-profile__name {
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1.3;
  color: var(--text);
}

.hero-profile__role {
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  color: var(--brand);
  letter-spacing: 0.02em;
}

.hero-profile__stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.hero-profile__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  font-size: 0.6875rem;
  color: var(--brand);
  border: 1px solid rgba(18, 247, 214, 0.35);
  background: rgba(18, 247, 214, 0.08);
  border-radius: 999px;
  letter-spacing: 0.02em;
}

.hero-profile__meta {
  width: 100%;
  margin-top: 1.25rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  font-size: 0.8125rem;
  line-height: 1.7;
  text-align: left;
}

.hero-profile__link {
  transition: opacity 0.2s;
}

.hero-profile__link:hover {
  opacity: 0.85;
  text-decoration: underline;
}

.hero-profile__btn {
  width: 100%;
  justify-content: center;
  margin-top: 1.25rem;
}

.scroll-hint {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: var(--brand);
  opacity: 0.5;
  animation: bounce 2s infinite;
}

.scroll-hint__mouse {
  display: block;
  width: 1.25rem;
  height: 2rem;
  border: 2px solid currentColor;
  border-radius: 999px;
  position: relative;
}

.scroll-hint__mouse::after {
  content: '';
  position: absolute;
  top: 0.375rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 6px;
  background: currentColor;
  border-radius: 2px;
  animation: scroll-dot 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(6px);
  }
}

@keyframes scroll-dot {
  0% {
    opacity: 1;
    top: 0.375rem;
  }
  100% {
    opacity: 0;
    top: 0.875rem;
  }
}

@media (max-width: 63.99rem) {
  .hero-profile {
    order: -1;
  }

  .hero-profile__window {
    width: min(100%, 28rem);
  }

  .hero-profile__photo {
    width: 12rem;
    height: 12rem;
  }

  .hero-stats {
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge__dot,
  .scroll-hint {
    animation: none;
  }
}
</style>
