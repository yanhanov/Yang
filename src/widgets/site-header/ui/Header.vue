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
  { to: '/projects', labelKey: 'header.nav.projects' },
  { to: '/blogs', labelKey: 'header.nav.awards' },
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
      'site-header--clear': isHome && !scrolled && !menuIsActive,
      'site-header--solid': scrolled || !isHome || menuIsActive,
      'site-header--menu-open': menuIsActive,
    }"
  >
    <div
      v-if="menuIsActive"
      class="site-header__backdrop md:hidden"
      @click="closeMenu"
      aria-hidden="true"
    />

    <div class="site-header__bar">
      <router-link to="/" class="site-header__logo" @click="closeMenu">
        Yan Hanov
      </router-link>

      <nav class="site-header__nav hidden md:flex" aria-label="Main">
        <router-link
          v-for="link in pageLinks"
          :key="link.to"
          :to="link.to"
          class="site-header__link"
          :class="{ 'is-active': isActive(link.to) }"
        >
          {{ t(link.labelKey) }}
        </router-link>
      </nav>

      <div class="site-header__actions">
        <LangChange opening inline class="hidden md:flex" />
        <a
          href="/yan-hanov.pdf"
          download="yan-hanov.pdf"
          class="site-header__resume hidden sm:inline-flex"
        >
          {{ t('header.nav.resume') }}
        </a>
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
        <p class="site-header__drawer-label">{{ t('header.menu-label') }}</p>
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
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <div class="site-header__drawer-body">
        <router-link
          v-for="link in pageLinks"
          :key="link.to"
          :to="link.to"
          class="site-header__drawer-item"
          :class="{ 'site-header__drawer-item--active': isActive(link.to) }"
          @click="closeMenu"
        >
          {{ t(link.labelKey) }}
        </router-link>
      </div>

      <div class="site-header__drawer-foot">
        <LangChange opening segmented />
        <div class="site-header__drawer-actions">
          <a
            href="/yan-hanov.pdf"
            download="yan-hanov.pdf"
            class="btn-opening"
            @click="closeMenu"
          >
            {{ t('header.nav.resume') }}
          </a>
          <a
            href="https://t.me/yanhanov"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-opening-ghost"
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
  padding: 0.75rem 1.25rem 0;
  font-family: var(--opening-font);
  color: var(--opening-text);
  pointer-events: none;
}

.site-header::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 7rem;
  background: linear-gradient(180deg, rgba(14, 12, 10, 0.55), transparent);
  pointer-events: none;
  opacity: 0.85;
  transition: opacity 0.25s ease;
}

.site-header--solid::before {
  opacity: 0;
}

.site-header__bar,
.site-header__burger,
.site-header__logo,
.site-header__nav,
.site-header__actions,
.site-header__drawer,
.site-header__backdrop {
  pointer-events: auto;
}

.site-header__bar {
  position: relative;
  z-index: 102;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  max-width: 1140px;
  margin-inline: auto;
  min-height: 3.25rem;
  padding: 0 0.85rem 0 1.1rem;
  border: 1px solid transparent;
  border-radius: 999px;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.site-header--solid .site-header__bar {
  background: rgba(14, 12, 10, 0.72);
  border-color: rgba(244, 240, 234, 0.1);
  box-shadow: 0 12px 40px -24px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.site-header__logo {
  justify-self: start;
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.045em;
  color: var(--opening-text);
}

.site-header__nav {
  display: flex;
  align-items: center;
  justify-self: center;
  gap: 0.15rem;
}

.site-header__link {
  position: relative;
  padding: 0.45rem 0.85rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--opening-muted);
  transition: color 0.15s ease;
}

.site-header__link::after {
  content: '';
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: 0.2rem;
  height: 1px;
  background: var(--opening-text);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.site-header__link:hover,
.site-header__link.is-active {
  color: var(--opening-text);
}

.site-header__link.is-active::after {
  transform: scaleX(1);
}

.site-header__actions {
  display: flex;
  align-items: center;
  justify-self: end;
  gap: 0.85rem;
}

.site-header__resume {
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: var(--opening-text);
  color: var(--opening-bg);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: opacity 0.15s ease;
}

.site-header__resume:hover {
  opacity: 0.88;
}

.site-header__backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.55);
}

.site-header__drawer {
  position: fixed;
  inset: 0;
  z-index: 101;
  display: flex;
  flex-direction: column;
  background: var(--opening-bg);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
}

.site-header__drawer--open {
  opacity: 1;
  visibility: visible;
}

.site-header__drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem;
  padding: 0 1.25rem;
  border-bottom: 1px solid var(--opening-border);
}

.site-header__drawer-label {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--opening-muted);
}

.site-header__drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--opening-radius);
  border: 1px solid var(--opening-border);
  background: transparent;
  color: var(--opening-muted);
  cursor: pointer;
}

.site-header__drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 1.25rem 1.5rem;
}

.site-header__drawer-item {
  display: block;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--opening-border);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--opening-text);
}

.site-header__drawer-item--active {
  color: #fff;
}

.site-header__drawer-foot {
  padding: 1rem 1.25rem calc(1rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--opening-border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.site-header__drawer-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.site-header__drawer-actions :deep(.btn-opening),
.site-header__drawer-actions :deep(.btn-opening-ghost) {
  justify-content: center;
}

.site-header__burger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid var(--opening-border);
  background: transparent;
  cursor: pointer;
}

.site-header__burger-box {
  position: relative;
  width: 0.875rem;
  height: 0.625rem;
}

.site-header__burger-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--opening-text);
  transition:
    top 0.2s ease,
    transform 0.2s ease;
}

.site-header__burger-line:first-child {
  top: 0;
}

.site-header__burger-line:last-child {
  bottom: 0;
}

.site-header__burger--open .site-header__burger-line:first-child {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.site-header__burger--open .site-header__burger-line:last-child {
  bottom: auto;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

@media (max-width: 47.99rem) {
  .site-header {
    padding: 0.55rem 0.85rem 0;
  }

  .site-header__bar {
    grid-template-columns: 1fr auto;
    padding-right: 0.45rem;
  }

  .site-header__nav {
    display: none;
  }
}

@media (min-width: 48rem) {
  .site-header__burger,
  .site-header__drawer,
  .site-header__backdrop {
    display: none;
  }
}
</style>
