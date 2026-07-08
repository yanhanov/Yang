<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useTilt, useInView } from '@/shared/lib'
import TypingRoles from './TypingRoles.vue'
import { TechIcon } from '@/shared/ui/tech-icon'

const stats = ref({ products: 0, tech: 0, years: 0 })
const targets = { products: 6, tech: 15, years: 3 }
const profileCard = ref(null)
const profileSection = ref(null)
const profileInView = useInView(profileSection)

const focusStack = [
  { icon: 'vue', labelKey: 'home.profile-focus.frontend' },
  { icon: 'flutter', labelKey: 'home.profile-focus.mobile' },
  { icon: 'rust', labelKey: 'home.profile-focus.rust' },
]

const socials = [
  {
    href: 'mailto:yanhanow@gmail.ru',
    label: 'Email',
    icon: 'email',
  },
  {
    href: 'https://t.me/yanhanov',
    label: 'Telegram',
    icon: 'telegram',
  },
  {
    href: 'https://github.com/yanhanov',
    label: 'GitHub',
    icon: 'github',
  },
  {
    href: 'https://linkedin.com/in/yanhanov',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
]

useTilt(profileCard, 6)

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
    class="page-section page-section--hero hero-section page-top-gradient relative overflow-hidden min-h-screen flex items-start lg:items-center pt-16 pb-12 md:pt-20 lg:py-16"
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
            <RouterLink to="/projects" class="btn-ghost">
              {{ $t('home.view-projects') }}
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
        <div ref="profileSection" class="hero-profile reveal reveal-delay-1">
          <div class="hero-profile__glow" aria-hidden="true" />
          <div ref="profileCard" class="hero-profile__tilt">
            <div class="hero-terminal hero-profile__window glow-border">
              <div class="hero-terminal__bar hero-profile__bar">
                <div class="hero-profile__bar-left">
                  <span class="hero-terminal__dot bg-[#ff5f57]" />
                  <span class="hero-terminal__dot bg-[#febc2e]" />
                  <span class="hero-terminal__dot bg-[#28c840]" />
                  <span class="hero-terminal__file base-font">profile.vue</span>
                </div>
                <span class="hero-profile__status base-font">
                  <span class="hero-profile__status-dot" />
                  <span class="hero-profile__status-text">{{
                    $t('home.hero-terminal-comment')
                  }}</span>
                </span>
              </div>

              <div class="hero-profile__body">
                <div class="hero-profile__header">
                  <div
                    class="hero-profile__photo-wrap avatar-ring"
                    :class="{ 'avatar-ring--paused': !profileInView }"
                  >
                    <picture>
                      <source
                        srcset="/yan-profile-140.webp 140w, /yan-profile-280.webp 280w"
                        sizes="(min-width: 64rem) 136px, 112px"
                        type="image/webp"
                      />
                      <img
                        src="/yan-profile-140.webp"
                        alt="Yazmyrat Hanov"
                        class="hero-profile__photo"
                        width="140"
                        height="158"
                        decoding="async"
                        fetchpriority="high"
                      />
                    </picture>
                  </div>

                  <div class="hero-profile__info">
                    <p class="hero-profile__name secont-font">{{ $t('home.bio-fullname') }}</p>
                    <p class="hero-profile__role base-font">{{ $t('home.bio-prof') }}</p>
                    <p class="hero-profile__location base-font">{{ $t('home.bio-job') }}</p>
                  </div>
                </div>

                <div class="hero-profile__stack">
                  <span class="hero-profile__stack-label base-font">{{
                    $t('home.profile-focus.label')
                  }}</span>
                  <div class="hero-profile__stack-tags">
                    <template v-for="(item, i) in focusStack" :key="item.icon">
                      <span
                        v-if="i > 0"
                        class="hero-profile__stack-sep hero-profile__stack-sep--tag"
                        aria-hidden="true"
                        >|</span
                      >
                      <span class="hero-profile__tag hero-profile__tag--focus base-font">
                        <TechIcon :name="item.icon" :size="16" />
                        {{ $t(item.labelKey) }}
                      </span>
                    </template>
                  </div>
                </div>

                <div class="hero-profile__editor">
                  <div class="hero-profile__lines base-font" aria-hidden="true">
                    <span v-for="n in 7" :key="n">{{ n }}</span>
                  </div>
                  <pre
                    class="hero-profile__code base-font"
                    aria-label="Profile data"
                  ><code><span class="tok-comment">// yanhanov.com</span>
<span class="tok-keyword">export const</span> <span class="tok-prop">profile</span> <span class="tok-punct">= {</span>
  <span class="tok-prop">email</span><span class="tok-punct">:</span> <a href="mailto:yanhanow@gmail.ru" class="tok-string hero-profile__link">'yanhanow@gmail.ru'</a><span class="tok-punct">,</span>
  <span class="tok-prop">location</span><span class="tok-punct">:</span> <span class="tok-string">'{{ $t('home.bio-con') }}'</span><span class="tok-punct">,</span>
  <span class="tok-prop">remote</span><span class="tok-punct">:</span> <span class="tok-bool">true</span><span class="tok-punct">,</span>
  <span class="tok-prop">focus</span><span class="tok-punct">:</span> <span class="tok-punct">[</span><span class="tok-string">'{{ $t('home.profile-focus.frontend') }}'</span><span class="tok-punct">,</span> <span class="tok-string">'{{ $t('home.profile-focus.mobile') }}'</span><span class="tok-punct">,</span> <span class="tok-string">'{{ $t('home.profile-focus.rust') }}'</span><span class="tok-punct">],</span>
<span class="tok-punct">}</span></code></pre>
                </div>

                <div class="hero-profile__footer">
                  <div class="hero-profile__socials">
                    <a
                      v-for="item in socials"
                      :key="item.icon"
                      :href="item.href"
                      :aria-label="item.label"
                      class="hero-profile__social"
                      :target="item.icon === 'email' ? undefined : '_blank'"
                      :rel="item.icon === 'email' ? undefined : 'noopener noreferrer'"
                    >
                      <svg
                        v-if="item.icon === 'email'"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        aria-hidden="true"
                      >
                        <rect x="4" y="6" width="16" height="12" rx="2" />
                        <path d="M4 6l8 6 8-6" stroke-linecap="round" />
                      </svg>
                      <svg
                        v-else-if="item.icon === 'telegram'"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="16"
                        height="16"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"
                        />
                      </svg>
                      <svg
                        v-else-if="item.icon === 'github'"
                        width="16"
                        height="16"
                        viewBox="0 0 17 17"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M8.99998 0.872253C7.02121 0.872335 5.10703 1.57651 3.59995 2.85879C2.09287 4.14107 1.09123 5.91777 0.77426 7.87099C0.457287 9.82421 0.845664 11.8265 1.8699 13.5195C2.89413 15.2126 4.48739 16.486 6.36458 17.1118C6.78125 17.1848 6.9375 16.9348 6.9375 16.716C6.9375 16.5181 6.92707 15.8618 6.92707 15.1639C4.83332 15.5493 4.29165 14.6535 4.12498 14.1848C3.94005 13.7289 3.64688 13.3249 3.27082 13.0077C2.97915 12.8514 2.56248 12.466 3.26039 12.4556C3.52688 12.4845 3.78247 12.5773 4.00551 12.7259C4.22854 12.8746 4.41245 13.0749 4.54165 13.3097C4.65562 13.5145 4.80888 13.6947 4.99264 13.8402C5.1764 13.9856 5.38704 14.0933 5.61251 14.1572C5.83797 14.221 6.07382 14.2398 6.30655 14.2123C6.53927 14.1849 6.76429 14.1118 6.96872 13.9972C7.00479 13.5736 7.1936 13.1775 7.49998 12.8827C5.64582 12.6744 3.70832 11.9556 3.70832 8.76811C3.6966 7.9399 4.00222 7.13859 4.56248 6.52853C4.30772 5.80871 4.33753 5.01877 4.64582 4.3202C4.64582 4.3202 5.34371 4.10144 6.93748 5.17436C8.30105 4.79934 9.74057 4.79934 11.1041 5.17436C12.6979 4.09103 13.3958 4.3202 13.3958 4.3202C13.7041 5.01876 13.734 5.80872 13.4791 6.52853C14.0411 7.13755 14.347 7.93956 14.3333 8.76811C14.3333 11.966 12.3854 12.6744 10.5312 12.8827C10.7301 13.0843 10.8833 13.3263 10.9803 13.5923C11.0774 13.8583 11.1161 14.1421 11.0937 14.4244C11.0937 15.539 11.0833 16.4348 11.0833 16.716C11.0833 16.9348 11.2396 17.1952 11.6562 17.1119C13.5301 16.4809 15.1188 15.2046 16.1387 13.5106C17.1585 11.8167 17.5432 9.81544 17.224 7.86412C16.9049 5.91279 15.9026 4.1384 14.3962 2.85768C12.8898 1.57696 10.9772 0.873283 8.99998 0.872253Z"
                        />
                      </svg>
                      <svg
                        v-else
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </a>
                  </div>

                  <div class="hero-profile__actions">
                    <a
                      href="https://t.me/yanhanov"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-primary hero-profile__btn text-sm"
                    >
                      {{ $t('home.bio-write') }}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
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
  position: relative;
  display: flex;
  justify-content: center;
}

.hero-profile__glow {
  position: absolute;
  inset: 5% 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 247, 214, 0.22) 0%, rgba(18, 247, 214, 0.06) 50%, transparent 72%);
  pointer-events: none;
}

.hero-profile__tilt {
  position: relative;
  width: 100%;
  max-width: 32rem;
  min-width: 0;
  transform-style: preserve-3d;
}

.hero-profile__window {
  width: 100%;
  max-width: none;
  min-width: 0;
  margin-top: 0;
  border-color: var(--border-accent);
  background: rgba(34, 38, 45, 0.94);
  box-shadow:
    0 32px 80px -40px rgba(0, 0, 0, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition:
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.hero-profile__tilt:hover .hero-profile__window {
  box-shadow:
    0 40px 96px -36px rgba(0, 0, 0, 0.92),
    0 0 0 1px rgba(18, 247, 214, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.hero-profile__bar {
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
}

.hero-profile__bar-left {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  min-width: 0;
  overflow: hidden;
}

.hero-profile__status {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  max-width: 52%;
  padding: 0.2rem 0.625rem;
  border-radius: 999px;
  border: 1px solid rgba(18, 247, 214, 0.25);
  background: rgba(18, 247, 214, 0.06);
  font-size: 0.625rem;
  color: var(--brand);
  letter-spacing: 0.02em;
}

.hero-profile__status-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-profile__status-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: var(--brand);
  box-shadow: 0 0 8px var(--brand);
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-profile__body {
  padding: 1.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}

.hero-profile__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.hero-profile__photo-wrap {
  position: relative;
  flex-shrink: 0;
  width: 10.5rem;
  height: 10.5rem;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--brand), transparent 40%, var(--brand));
  animation: avatar-spin 5s linear infinite;
  opacity: 0.55;
}

.avatar-ring--paused::before {
  animation-play-state: paused;
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: var(--bg-elevated);
}

@keyframes avatar-spin {
  to {
    transform: rotate(360deg);
  }
}

.hero-profile__photo-wrap picture {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
}

.hero-profile__photo {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  border: 2px solid rgba(18, 247, 214, 0.35);
}

.hero-profile__info {
  min-width: 0;
}

.hero-profile__name {
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--text);
}

.hero-profile__role {
  margin-top: 0.375rem;
  font-size: 0.8125rem;
  color: var(--brand);
  letter-spacing: 0.02em;
}

.hero-profile__location {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

.hero-profile__stack {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.hero-profile__stack-label {
  font-size: 0.625rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.hero-profile__stack-sep {
  margin-inline: 0.5rem;
  color: var(--brand);
  opacity: 0.4;
  font-weight: 400;
}

.hero-profile__stack-sep--tag {
  margin-inline: 0.125rem;
  font-size: 0.75rem;
}

.hero-profile__stack-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
}

.hero-profile__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3125rem 0.75rem;
  font-size: 0.6875rem;
  color: var(--brand);
  border: 1px solid rgba(18, 247, 214, 0.3);
  background: rgba(18, 247, 214, 0.07);
  border-radius: 999px;
  letter-spacing: 0.02em;
  transition:
    background 0.2s,
    border-color 0.2s;
}

.hero-profile__tag:hover {
  background: rgba(18, 247, 214, 0.12);
  border-color: rgba(18, 247, 214, 0.45);
}

.hero-profile__tag--focus {
  font-size: 0.75rem;
  padding: 0.375rem 0.875rem;
}

.hero-profile__editor {
  display: flex;
  min-width: 0;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background:
    linear-gradient(rgba(18, 247, 214, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(18, 247, 214, 0.02) 1px, transparent 1px), rgba(0, 0, 0, 0.32);
  background-size:
    100% 1.75rem,
    1.75rem 100%,
    auto;
  overflow: hidden;
}

.hero-profile__lines {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 1rem 0.625rem 1rem 0.875rem;
  border-right: 1px solid var(--border);
  font-size: 0.6875rem;
  line-height: 1.75;
  color: rgba(139, 145, 154, 0.55);
  user-select: none;
  text-align: right;
}

.hero-profile__code {
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 1rem 1rem 1rem 0.75rem;
  border: none;
  background: transparent;
  font-size: 0.6875rem;
  line-height: 1.75;
  overflow-x: auto;
  text-align: left;
  white-space: pre;
}

.hero-profile__code code {
  font-family: inherit;
}

.hero-profile__link {
  transition: opacity 0.2s;
}

.hero-profile__link:hover {
  opacity: 0.85;
  text-decoration: underline;
}

.hero-profile__footer {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding-top: 0.25rem;
}

.hero-profile__socials {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.hero-profile__social {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid var(--border-accent);
  color: var(--brand);
  transition:
    background 0.2s,
    transform 0.2s,
    border-color 0.2s;
}

.hero-profile__social:hover {
  background: var(--brand-dim);
  border-color: var(--brand);
  transform: translateY(-2px);
}

.hero-profile__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.hero-profile__btn {
  flex: 1;
  justify-content: center;
  min-width: 0;
}

.hero-profile__btn--ghost {
  flex: 1;
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
  width: 3px;
  height: 6px;
  background: currentColor;
  border-radius: 2px;
  transform: translateX(-50%);
  animation: scroll-dot 2s infinite;
  will-change: transform, opacity;
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
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
  }
}

@media (min-width: 64rem) {
  .hero-profile__tilt {
    max-width: 36rem;
  }

  .hero-profile__header {
    flex-direction: row;
    align-items: center;
    text-align: left;
    gap: 1.25rem;
  }

  .hero-profile__photo-wrap {
    width: 7.5rem;
    height: 7.5rem;
  }

  .hero-profile__stack-tags {
    justify-content: flex-start;
  }

  .hero-profile__name {
    font-size: 1.5rem;
  }

  .hero-profile__role {
    font-size: 0.875rem;
  }

  .hero-profile__tag {
    font-size: 0.75rem;
  }

  .hero-profile__code {
    font-size: 0.75rem;
  }

  .hero-profile__lines {
    font-size: 0.75rem;
  }

  .hero-profile__footer {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .hero-profile__socials {
    justify-content: flex-start;
  }

  .hero-profile__actions {
    flex: 1;
    justify-content: flex-end;
    flex-wrap: nowrap;
  }

  .hero-profile__btn {
    flex: 0 1 auto;
    min-width: 0;
  }
}

@media (max-width: 63.99rem) {
  .hero-profile {
    order: -1;
  }

  .hero-profile__tilt {
    max-width: 100%;
  }

  .hero-stats {
    max-width: none;
  }
}

@media (max-width: 48rem) {
  .hero-profile__glow {
    display: none;
  }

  .hero-profile__tilt:hover .hero-profile__window {
    box-shadow:
      0 32px 80px -40px rgba(0, 0, 0, 0.9),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
}

@media (max-width: 29.99rem) {
  .hero-profile__body {
    padding: 1.125rem 1rem 1rem;
    gap: 1rem;
  }

  .hero-profile__photo-wrap {
    width: 8.75rem;
    height: 8.75rem;
  }

  .hero-profile__name {
    font-size: 1.25rem;
  }

  .hero-profile__code {
    font-size: 0.625rem;
  }

  .hero-profile__lines {
    padding: 0.875rem 0.5rem 0.875rem 0.625rem;
    font-size: 0.625rem;
  }

  .hero-profile__actions {
    flex-direction: column;
  }

  .hero-profile__btn {
    width: 100%;
  }
}

@media (max-width: 22.5rem) {
  .hero-grid {
    gap: 2rem;
  }

  .hero-profile__glow {
    inset: 2% 0;
  }

  .hero-profile__bar {
    padding: 0.5rem 0.625rem;
  }

  .hero-profile__status {
    max-width: none;
    padding: 0.2rem;
  }

  .hero-profile__status-text {
    display: none;
  }

  .hero-terminal__file {
    margin-left: 0.25rem;
    font-size: 0.625rem;
  }

  .hero-terminal__dot {
    width: 0.5rem;
    height: 0.5rem;
  }

  .hero-profile__body {
    padding: 1rem 0.75rem 0.875rem;
    gap: 0.875rem;
  }

  .hero-profile__header {
    gap: 0.75rem;
  }

  .hero-profile__photo-wrap {
    width: 7rem;
    height: 7rem;
  }

  .hero-profile__name {
    font-size: 1.0625rem;
  }

  .hero-profile__role {
    font-size: 0.6875rem;
  }

  .hero-profile__location {
    font-size: 0.625rem;
  }

  .hero-profile__stack-tags {
    gap: 0.3125rem;
  }

  .hero-profile__stack-sep--tag {
    display: none;
  }

  .hero-profile__tag--focus {
    font-size: 0.625rem;
    padding: 0.25rem 0.5rem;
  }

  .hero-profile__lines {
    display: none;
  }

  .hero-profile__code {
    font-size: 0.5625rem;
    line-height: 1.65;
    padding: 0.75rem;
  }

  .hero-profile__social {
    width: 1.75rem;
    height: 1.75rem;
  }

  .hero-profile__social svg {
    width: 14px;
    height: 14px;
  }

  .hero-profile__footer {
    gap: 0.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge__dot,
  .hero-profile__status-dot,
  .avatar-ring::before,
  .scroll-hint {
    animation: none;
  }
}
</style>
