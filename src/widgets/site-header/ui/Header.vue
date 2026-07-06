<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollFrame } from '@/shared/lib'
import { LangChange } from '@/features/locale-switch'

const { t } = useI18n()
const route = useRoute()
const menuIsActive = ref(false)
const scrolled = ref(false)
const isHome = computed(() => route.path === '/')

const pageLinks = [
  { to: '/', labelKey: 'header.nav.home' },
  { to: '/portfolio', labelKey: 'header.nav.about' },
  { to: '/blogs', labelKey: 'header.nav.awards' },
]

const sectionLinks = [
  { href: '#about', labelKey: 'header.sections.about' },
  { href: '#experience', labelKey: 'header.sections.experience' },
  { href: '#projects', labelKey: 'header.sections.projects' },
  { href: '#skills', labelKey: 'header.sections.skills' },
  { href: '#contact', labelKey: 'header.sections.contact' },
]

watch(menuIsActive, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)

const closeMenu = () => {
  menuIsActive.value = false
}

const isActive = (path) => route.path === path

function onKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

useScrollFrame(() => {
  const next = window.scrollY > 16
  if (next !== scrolled.value) scrolled.value = next
})
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--scrolled': scrolled,
      'site-header--menu-open': menuIsActive,
    }"
  >
    <div
      v-if="menuIsActive"
      class="site-header__backdrop md:hidden"
      @click="closeMenu"
      aria-hidden="true"
    />

    <div class="container site-header__inner">
      <router-link to="/" class="site-header__logo base-font" @click="closeMenu">
        <span class="site-header__logo-mark" aria-hidden="true">&lt;/&gt;</span>
        <span class="site-header__logo-name">yan hanov</span>
      </router-link>

      <nav class="site-header__nav hidden md:flex" aria-label="Main">
        <div class="site-header__pill">
          <router-link
            v-for="link in pageLinks"
            :key="link.to"
            :to="link.to"
            class="site-header__link nav-link"
            :class="{ 'is-active': isActive(link.to) }"
          >
            {{ t(link.labelKey) }}
          </router-link>

          <template v-if="isHome">
            <span class="site-header__divider" aria-hidden="true" />
            <a
              v-for="link in sectionLinks"
              :key="link.href"
              :href="link.href"
              class="site-header__link site-header__link--section nav-link"
            >
              {{ t(link.labelKey) }}
            </a>
          </template>
        </div>
      </nav>

      <div class="site-header__actions">
        <a
          href="/yan-hanov.pdf"
          download="yan-hanov.pdf"
          class="site-header__resume btn-ghost hidden sm:inline-flex"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3V15M12 15L8 11M12 15L16 11M5 21H19"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ t('header.nav.resume') }}
        </a>
        <LangChange class="hidden md:block" />
        <button
          type="button"
          class="site-header__burger md:hidden"
          :class="{ 'site-header__burger--open': menuIsActive }"
          :aria-expanded="menuIsActive"
          aria-label="Menu"
          @click="menuIsActive = !menuIsActive"
        >
          <span class="site-header__burger-box">
            <span class="site-header__burger-line" />
            <span class="site-header__burger-line" />
            <span class="site-header__burger-line" />
          </span>
        </button>
      </div>
    </div>

    <nav
      class="site-header__drawer md:hidden"
      :class="{ 'site-header__drawer--open': menuIsActive }"
      aria-label="Mobile"
      :aria-hidden="!menuIsActive"
    >
      <div class="site-header__drawer-head">
        <p class="site-header__drawer-label section-label">{{ t('header.menu-label') }}</p>
        <button
          type="button"
          class="site-header__drawer-close"
          aria-label="Close menu"
          @click="closeMenu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div class="site-header__drawer-body">
        <div class="site-header__drawer-group">
          <router-link
            v-for="(link, i) in pageLinks"
            :key="link.to"
            :to="link.to"
            class="site-header__drawer-item"
            :class="{ 'site-header__drawer-item--active': isActive(link.to) }"
            :style="{ '--i': i }"
            @click="closeMenu"
          >
            <span class="site-header__drawer-index base-font">{{
              String(i + 1).padStart(2, '0')
            }}</span>
            <span class="site-header__drawer-title secont-font">{{ t(link.labelKey) }}</span>
            <svg
              class="site-header__drawer-arrow"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
              />
            </svg>
          </router-link>
        </div>

        <template v-if="isHome">
          <p class="site-header__drawer-label section-label">{{ t('header.sections-label') }}</p>
          <div class="site-header__drawer-sections">
            <a
              v-for="(link, i) in sectionLinks"
              :key="link.href"
              :href="link.href"
              class="site-header__drawer-chip base-font"
              :style="{ '--i': i + pageLinks.length }"
              @click="closeMenu"
            >
              {{ t(link.labelKey) }}
            </a>
          </div>
        </template>
      </div>

      <div class="site-header__drawer-foot">
        <LangChange segmented />
        <div class="site-header__drawer-actions">
          <a
            href="/yan-hanov.pdf"
            download="yan-hanov.pdf"
            class="site-header__drawer-resume btn-primary"
            @click="closeMenu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3V15M12 15L8 11M12 15L16 11M5 21H19"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ t('header.nav.resume') }}
          </a>
          <a
            href="https://t.me/yanhanov"
            target="_blank"
            rel="noopener noreferrer"
            class="site-header__drawer-telegram btn-ghost"
            @click="closeMenu"
          >
            {{ t('header.nav.telegram') }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  border-bottom: 1px solid transparent;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.site-header--scrolled,
.site-header--menu-open {
  background-color: rgba(26, 30, 35, 0.96);
  border-color: var(--border);
  box-shadow: 0 8px 32px -12px rgba(0, 0, 0, 0.55);
}

.site-header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 3.75rem;
}

.site-header__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  flex-shrink: 0;
  z-index: 102;
}

.site-header__logo-mark {
  font-size: 1.125rem;
  color: var(--brand);
  transition: opacity 0.2s;
}

.site-header__logo-name {
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

.site-header__logo:hover .site-header__logo-mark {
  opacity: 0.75;
}

.site-header__nav {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.site-header__pill {
  display: flex;
  align-items: center;
  gap: 0.125rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: rgba(34, 38, 45, 0.72);
  border: 1px solid var(--border-accent);
}

.site-header__link {
  padding: 0.4375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  white-space: nowrap;
  transition:
    color 0.2s,
    background 0.2s;
}

.site-header__link::after {
  display: none;
}

.site-header__link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.site-header__link.is-active {
  color: var(--brand);
  background: var(--brand-dim);
}

.site-header__link--section {
  display: none;
  font-size: 0.75rem;
}

@media (min-width: 64rem) {
  .site-header__link--section {
    display: inline-flex;
  }
}

.site-header__divider {
  width: 1px;
  height: 1.125rem;
  margin: 0 0.25rem;
  background: var(--border);
  flex-shrink: 0;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  z-index: 102;
}

.site-header__resume {
  font-size: 0.75rem;
  padding: 0.5rem 0.875rem;
  gap: 0.375rem;
}

.site-header__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  z-index: 100;
  animation: header-fade-in 0.25s ease;
}

.site-header__drawer {
  position: fixed;
  inset: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  background: rgba(18, 21, 25, 0.98);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
  overflow: hidden;
}

.site-header__drawer--open {
  opacity: 1;
  visibility: visible;
}

.site-header__drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  min-height: 3.75rem;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--border);
}

.site-header__drawer-label {
  margin: 0;
}

.site-header__drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  color: var(--text-muted);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.site-header__drawer-close:hover {
  color: var(--brand);
  border-color: var(--border-accent);
}

.site-header__drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.25rem 1rem;
  -webkit-overflow-scrolling: touch;
}

.site-header__drawer-body > .site-header__drawer-label {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

.site-header__drawer-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.site-header__drawer-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1rem 1rem;
  border-radius: 1rem;
  background: rgba(34, 38, 45, 0.55);
  border: 1px solid var(--border);
  opacity: 0;
  transform: translateY(0.75rem);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease,
    border-color 0.2s,
    background 0.2s;
  transition-delay: calc(var(--i, 0) * 0.05s + 0.05s);
}

.site-header__drawer--open .site-header__drawer-item {
  opacity: 1;
  transform: translateY(0);
}

.site-header__drawer-item:hover {
  border-color: var(--border-accent);
  background: rgba(34, 38, 45, 0.85);
}

.site-header__drawer-item--active {
  border-color: rgba(18, 247, 214, 0.35);
  background: var(--brand-dim);
}

.site-header__drawer-item--active .site-header__drawer-index {
  color: var(--brand);
  opacity: 0.85;
}

.site-header__drawer-item--active .site-header__drawer-title {
  color: var(--brand);
}

.site-header__drawer-index {
  flex-shrink: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--brand);
  opacity: 0.45;
}

.site-header__drawer-title {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.3;
}

.site-header__drawer-arrow {
  flex-shrink: 0;
  color: var(--text-muted);
  opacity: 0.5;
  transition:
    opacity 0.2s,
    transform 0.2s,
    color 0.2s;
}

.site-header__drawer-item:hover .site-header__drawer-arrow {
  opacity: 1;
  color: var(--brand);
  transform: translateX(2px);
}

.site-header__drawer-sections {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.site-header__drawer-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.625rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: rgba(34, 38, 45, 0.45);
  border: 1px solid var(--border);
  opacity: 0;
  transform: translateY(0.5rem);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
  transition-delay: calc(var(--i, 0) * 0.04s + 0.1s);
}

.site-header__drawer--open .site-header__drawer-chip {
  opacity: 1;
  transform: translateY(0);
}

.site-header__drawer-chip:hover {
  color: var(--brand);
  border-color: var(--border-accent);
  background: var(--brand-dim);
}

.site-header__drawer-foot {
  flex-shrink: 0;
  padding: 1rem 1.25rem calc(1rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--border);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.site-header__drawer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
}

.site-header__drawer-resume,
.site-header__drawer-telegram {
  justify-content: center;
  font-size: 0.8125rem;
  padding: 0.75rem 0.875rem;
  gap: 0.375rem;
}

/* Burger */
.site-header__burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border-radius: 0.75rem;
  background: rgba(34, 38, 45, 0.72);
  border: 1px solid var(--border-accent);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
}

.site-header__burger:hover {
  border-color: rgba(18, 247, 214, 0.35);
}

.site-header__burger--open {
  border-color: rgba(18, 247, 214, 0.4);
  background: var(--brand-dim);
}

.site-header__burger-box {
  position: relative;
  width: 1.125rem;
  height: 0.875rem;
  display: block;
}

.site-header__burger-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition:
    transform 0.25s ease,
    top 0.25s ease,
    opacity 0.2s ease,
    background 0.2s;
}

.site-header__burger-line:nth-child(1) {
  top: 0;
}

.site-header__burger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.site-header__burger-line:nth-child(3) {
  bottom: 0;
}

.site-header__burger--open .site-header__burger-line {
  background: var(--brand);
}

.site-header__burger--open .site-header__burger-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.site-header__burger--open .site-header__burger-line:nth-child(2) {
  opacity: 0;
}

.site-header__burger--open .site-header__burger-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

@media (min-width: 48rem) {
  .site-header__burger,
  .site-header__drawer,
  .site-header__backdrop {
    display: none;
  }

  .site-header__nav {
    display: flex;
  }
}

@media (max-width: 47.99rem) {
  .site-header__nav {
    display: none;
  }
}

@keyframes header-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header__drawer-item,
  .site-header__drawer-chip {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
