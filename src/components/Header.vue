<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollFrame } from '@/composables/useScrollFrame'
import LangChange from './UI/LangChange.vue'

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
  { href: '#skills', labelKey: 'header.sections.skills' },
  { href: '#contact', labelKey: 'header.sections.contact' },
]

watch(menuIsActive, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const closeMenu = () => {
  menuIsActive.value = false
}

const isActive = (path) => route.path === path

useScrollFrame(() => {
  const next = window.scrollY > 16
  if (next !== scrolled.value) scrolled.value = next
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'site-header--scrolled': scrolled }"
  >
    <div
      v-if="menuIsActive"
      class="site-header__backdrop md:hidden"
      @click="closeMenu"
      aria-hidden="true"
    />

    <div class="container site-header__inner">
      <router-link to="/" class="site-header__logo" @click="closeMenu">
        <span class="site-header__logo-mark base-font" aria-hidden="true">&lt;/&gt;</span>
        <span class="site-header__logo-name secont-font">Yan</span>
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
        <LangChange />
        <button
          type="button"
          class="site-header__burger md:hidden hamburger--emphatic"
          :class="{ active: menuIsActive }"
          :aria-expanded="menuIsActive"
          aria-label="Menu"
          @click="menuIsActive = !menuIsActive"
        >
          <span class="burger-box">
            <span class="burger-inner" />
          </span>
        </button>
      </div>
    </div>

    <nav
      class="site-header__drawer md:hidden"
      :class="{ 'site-header__drawer--open': menuIsActive }"
      aria-label="Mobile"
    >
      <p class="site-header__drawer-label section-label">{{ t('header.menu-label') }}</p>

      <div class="site-header__drawer-group">
        <router-link
          v-for="link in pageLinks"
          :key="link.to"
          :to="link.to"
          class="site-header__drawer-link"
          :class="{ 'site-header__drawer-link--active': isActive(link.to) }"
          @click="closeMenu"
        >
          {{ t(link.labelKey) }}
        </router-link>
      </div>

      <template v-if="isHome">
        <p class="site-header__drawer-label section-label">{{ t('header.sections-label') }}</p>
        <div class="site-header__drawer-group">
          <a
            v-for="link in sectionLinks"
            :key="link.href"
            :href="link.href"
            class="site-header__drawer-link site-header__drawer-link--section"
            @click="closeMenu"
          >
            {{ t(link.labelKey) }}
          </a>
        </div>
      </template>

      <a
        href="/yan-hanov.pdf"
        download="yan-hanov.pdf"
        class="site-header__drawer-resume btn-primary"
        @click="closeMenu"
      >
        {{ t('header.nav.resume') }}
      </a>
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

.site-header--scrolled {
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
  z-index: 2;
}

.site-header__logo-mark {
  font-size: 1.125rem;
  color: var(--brand);
  transition: opacity 0.2s;
}

.site-header__logo-name {
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.02em;
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
  z-index: 2;
}

.site-header__resume {
  font-size: 0.75rem;
  padding: 0.5rem 0.875rem;
  gap: 0.375rem;
}

.site-header__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  z-index: 40;
  animation: header-fade-in 0.25s ease;
}

.site-header__drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-direction: column;
  width: min(88%, 20rem);
  height: 100dvh;
  padding: 5rem 1.5rem 1.5rem;
  background: rgba(22, 26, 31, 0.98);
  border-left: 1px solid var(--border-accent);
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  overflow-y: auto;
}

.site-header__drawer--open {
  transform: translateX(0);
}

.site-header__drawer-label {
  margin-bottom: 0.75rem;
}

.site-header__drawer-label + .site-header__drawer-group {
  margin-bottom: 1.75rem;
}

.site-header__drawer-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.75rem;
}

.site-header__drawer-link {
  padding: 0.75rem 0.875rem;
  border-radius: 0.75rem;
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.0625rem;
  font-weight: 500;
  color: var(--text);
  transition:
    color 0.2s,
    background 0.2s;
}

.site-header__drawer-link:hover {
  background: rgba(255, 255, 255, 0.04);
  color: var(--brand);
}

.site-header__drawer-link--active {
  color: var(--brand);
  background: var(--brand-dim);
}

.site-header__drawer-link--section {
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--text-muted);
}

.site-header__drawer-resume {
  margin-top: auto;
  width: 100%;
  justify-content: center;
  font-size: 0.9375rem;
}

/* Burger */
.site-header__burger {
  padding: 0.3125rem 0;
  cursor: pointer;
  background: transparent;
  border: none;
  overflow: visible;
}

.burger-box {
  width: 2.5rem;
  height: 1.5rem;
  position: relative;
  display: block;
}

.burger-inner {
  display: block;
  top: 50%;
  margin-top: -0.125rem;
}

.burger-inner,
.burger-inner::before,
.burger-inner::after {
  width: 1.625rem;
  height: 2px;
  background-color: var(--text);
  border-radius: 2px;
  position: absolute;
  transition-property: transform, background-color;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}

.burger-inner::before,
.burger-inner::after {
  content: '';
  display: block;
}

.burger-inner::before {
  top: -0.5rem;
}

.burger-inner::after {
  bottom: -0.5rem;
}

.hamburger--emphatic {
  overflow: hidden;
}

.hamburger--emphatic .burger-inner {
  transition: background-color 0.125s 0.175s ease-in;
}

.hamburger--emphatic .burger-inner::before {
  left: 0;
  transition:
    transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
    top 0.05s 0.125s linear,
    left 0.125s 0.175s ease-in;
}

.hamburger--emphatic .burger-inner::after {
  top: 0.5rem;
  right: 0;
  transition:
    transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
    top 0.05s 0.125s linear,
    right 0.125s 0.175s ease-in;
}

.hamburger--emphatic.active .burger-inner {
  transition-delay: 0s;
  background-color: transparent !important;
}

.hamburger--emphatic.active .burger-inner::before {
  left: -5rem;
  top: -5rem;
  transform: translate3d(5rem, 5rem, 0) rotate(45deg);
  transition:
    left 0.125s ease-out,
    top 0.05s 0.125s linear,
    transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.hamburger--emphatic.active .burger-inner::after {
  right: -5rem;
  top: -5rem;
  transform: translate3d(-5rem, 5rem, 0) rotate(-45deg);
  transition:
    right 0.125s ease-out,
    top 0.05s 0.125s linear,
    transform 0.125s 0.175s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.hamburger--emphatic.active .burger-inner::before,
.hamburger--emphatic.active .burger-inner::after {
  background-color: var(--brand);
}

@keyframes header-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
