<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollFrame, useZoneTheme } from '@/shared/lib'
import { LangChange } from '@/features/locale-switch'

const { t } = useI18n()
const route = useRoute()
const menuIsActive = ref(false)
const scrolled = ref(false)
const isHome = computed(() => route.path === '/')
const zone = useZoneTheme()
const clear = computed(() => isHome.value && zone.value === 'opening' && !scrolled.value && !menuIsActive.value)

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
    :data-zone="zone"
    :class="{
      'site-header--clear': clear,
      'site-header--solid': !clear,
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
        <LangChange inline class="hidden md:flex" />
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
  --hdr-ink: var(--opening-text);
  --hdr-muted: var(--opening-muted);
  --hdr-bar: rgba(14, 12, 10, 0.72);
  --hdr-border: rgba(244, 240, 234, 0.12);
  --hdr-cta: var(--opening-text);
  --hdr-cta-ink: var(--opening-bg);
  --hdr-radius: 26px;
  --hdr-font: var(--opening-font);
  --hdr-shadow: 0 12px 40px -24px rgba(0, 0, 0, 0.7);
  --hdr-blur: 16px;
  --hdr-drawer: var(--opening-bg);

  position: fixed;
  inset: 0 0 auto;
  z-index: 100;
  padding: 0.75rem 1.25rem 0;
  font-family: var(--hdr-font);
  color: var(--hdr-ink);
  pointer-events: none;
  transition:
    color 0.35s ease,
    --hdr-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.site-header[data-zone='about'] {
  --hdr-ink: #111111;
  --hdr-muted: #444444;
  --hdr-bar: #ffffff;
  --hdr-border: #808080;
  --hdr-cta: #0000ee;
  --hdr-cta-ink: #ffffff;
  --hdr-radius: 0px;
  --hdr-font: var(--about-font-body);
  --hdr-shadow: none;
  --hdr-blur: 0px;
  --hdr-drawer: #dcdcdc;
}

.site-header[data-zone='exp'] {
  --hdr-ink: #000000;
  --hdr-muted: #222222;
  --hdr-bar: #c0c0c0;
  --hdr-border: transparent;
  --hdr-cta: #c0c0c0;
  --hdr-cta-ink: #000000;
  --hdr-radius: 0px;
  --hdr-font: var(--exp-font);
  --hdr-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
  --hdr-blur: 0px;
  --hdr-drawer: #008080;
}

.site-header[data-zone='y2k'] {
  --hdr-ink: var(--y2k-ink);
  --hdr-muted: var(--y2k-muted);
  --hdr-bar: rgba(8, 8, 20, 0.82);
  --hdr-border: rgba(57, 243, 255, 0.35);
  --hdr-cta: var(--y2k-cyan);
  --hdr-cta-ink: #050510;
  --hdr-radius: 4px;
  --hdr-font: var(--y2k-font);
  --hdr-shadow: 0 0 24px rgba(255, 43, 214, 0.18);
  --hdr-drawer: var(--y2k-bg);
}

.site-header[data-zone='web2'] {
  --hdr-ink: var(--web2-ink);
  --hdr-muted: var(--web2-muted);
  --hdr-bar: linear-gradient(#ffffff, #d7e8f5);
  --hdr-border: rgba(255, 255, 255, 0.8);
  --hdr-cta: var(--web2-accent);
  --hdr-cta-ink: #ffffff;
  --hdr-radius: 26px;
  --hdr-font: var(--web2-font);
  --hdr-shadow:
    inset 0 1px 0 #fff,
    0 2px 6px rgba(43, 90, 130, 0.18);
  --hdr-blur: 0px;
  --hdr-drawer: var(--web2-bg);
}

.site-header[data-zone='para'] {
  --hdr-ink: var(--para-ink);
  --hdr-muted: var(--para-muted);
  --hdr-bar: rgba(20, 24, 32, 0.72);
  --hdr-border: rgba(244, 239, 230, 0.12);
  --hdr-cta: var(--para-accent);
  --hdr-cta-ink: #141820;
  --hdr-radius: 0px;
  --hdr-font: var(--para-font);
  --hdr-shadow: none;
  --hdr-blur: 0px;
  --hdr-drawer: var(--para-bg);
}

.site-header[data-zone='flat'] {
  --hdr-ink: #ffffff;
  --hdr-muted: rgba(255, 255, 255, 0.78);
  --hdr-bar: #00a4ef;
  --hdr-border: transparent;
  --hdr-cta: #ffffff;
  --hdr-cta-ink: #00a4ef;
  --hdr-radius: 0px;
  --hdr-font: var(--flat-font);
  --hdr-shadow: none;
  --hdr-blur: 0px;
  --hdr-drawer: #00a4ef;
}

.site-header[data-zone='glass'] {
  --hdr-ink: var(--glass-ink);
  --hdr-muted: var(--glass-muted);
  --hdr-bar: rgba(255, 255, 255, 0.1);
  --hdr-border: rgba(255, 255, 255, 0.16);
  --hdr-cta: var(--glass-ink);
  --hdr-cta-ink: var(--glass-bg);
  --hdr-radius: 20px;
  --hdr-font: var(--glass-font);
  --hdr-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  --hdr-blur: 18px;
  --hdr-drawer: var(--glass-bg);
}

.site-header[data-zone='now'] {
  --hdr-ink: var(--now-ink);
  --hdr-muted: var(--now-muted);
  --hdr-bar: rgba(9, 9, 11, 0.72);
  --hdr-border: rgba(250, 250, 250, 0.12);
  --hdr-cta: var(--now-ink);
  --hdr-cta-ink: var(--now-bg);
  --hdr-radius: 26px;
  --hdr-font: var(--now-font);
  --hdr-shadow: 0 12px 40px -24px rgba(0, 0, 0, 0.7);
  --hdr-drawer: var(--now-bg);
}

.site-header::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 7rem;
  background: linear-gradient(180deg, rgba(14, 12, 10, 0.55), transparent);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.site-header[data-zone='opening']:not(.site-header--solid)::before {
  opacity: 0.85;
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
  border-radius: var(--hdr-radius);
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    border-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.site-header--solid .site-header__bar {
  background: var(--hdr-bar);
  border-color: var(--hdr-border);
  box-shadow: var(--hdr-shadow);
  backdrop-filter: blur(var(--hdr-blur));
  -webkit-backdrop-filter: blur(var(--hdr-blur));
}

.site-header__logo {
  justify-self: start;
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.045em;
  color: var(--hdr-ink);
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
  color: var(--hdr-muted);
  transition: color 0.15s ease;
}

.site-header__link::after {
  content: '';
  position: absolute;
  left: 0.85rem;
  right: 0.85rem;
  bottom: 0.2rem;
  height: 1px;
  background: var(--hdr-ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.site-header__link:hover,
.site-header__link.is-active {
  color: var(--hdr-ink);
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

.site-header__actions :deep(.lang__inline),
.site-header__actions :deep(.lang__slash) {
  font-family: inherit;
  color: var(--hdr-muted);
}

.site-header__actions :deep(.lang__inline:hover),
.site-header__actions :deep(.lang__inline--active) {
  color: var(--hdr-ink);
}

.site-header__resume {
  align-items: center;
  padding: 0.4rem 0.9rem;
  border-radius: var(--hdr-radius);
  background: var(--hdr-cta);
  color: var(--hdr-cta-ink);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition:
    opacity 0.15s ease,
    border-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.35s ease,
    color 0.35s ease;
}

.site-header__resume:hover {
  opacity: 0.88;
}

.site-header[data-zone='exp'] .site-header__resume {
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
}

.site-header[data-zone='web2'] .site-header__resume {
  background: linear-gradient(#7ec8f8, var(--web2-accent) 48%, #2176b8);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 2px 0 #1a5f96;
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
  background: var(--hdr-drawer);
  color: var(--hdr-ink);
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
  border-bottom: 1px solid var(--hdr-border);
}

.site-header__drawer-label {
  margin: 0;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--hdr-muted);
}

.site-header__drawer-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--hdr-radius);
  border: 1px solid var(--hdr-border);
  background: transparent;
  color: var(--hdr-muted);
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
  border-bottom: 1px solid var(--hdr-border);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  color: var(--hdr-ink);
}

.site-header__drawer-item--active {
  color: var(--hdr-ink);
}

.site-header__drawer-foot {
  padding: 1rem 1.25rem calc(1rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--hdr-border);
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
  border-radius: var(--hdr-radius);
  border: 1px solid var(--hdr-border);
  background: transparent;
  cursor: pointer;
  transition: border-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1);
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
  background: var(--hdr-ink);
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
