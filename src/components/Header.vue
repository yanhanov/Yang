<script setup>
import { useRoute } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { useScrollFrame } from '@/composables/useScrollFrame'
import LangChange from './UI/LangChange.vue'

const route = useRoute()
const menuIsActive = ref(false)
const scrolled = ref(false)
const isHome = computed(() => route.path === '/')

watch(menuIsActive, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : 'auto'
})

const closeMenu = () => {
  menuIsActive.value = false
}

useScrollFrame(() => {
  const next = window.scrollY > 20
  if (next !== scrolled.value) scrolled.value = next
})
</script>

<template>
  <header
    class="left-0 w-full mx-auto z-100 fixed border-b header-b-color transition-all duration-300"
    :class="
      scrolled ? 'background-base shadow-lg shadow-black/20' : 'bg-transparent border-transparent'
    "
  >
    <div
      v-if="menuIsActive"
      class="menu-backdrop md:hidden"
      @click="closeMenu"
      aria-hidden="true"
    />
    <div class="container mx-auto">
      <div class="flex justify-between items-center base-font py-2.5 hover-link">
        <div class="text-2xl font-medium">
          <router-link to="/"><span class="color-brand">&lt;/&gt;</span>Yan</router-link>
        </div>
        <nav class="menu flex md:relative md:gap-6 lg:gap-8" :class="{ active: menuIsActive }">
          <router-link
            to="/"
            @click="closeMenu()"
            class="nav-link"
            :class="{ 'color-brand is-active': route.path === '/' }"
          >
            {{ $t('header.nav.home') }}
          </router-link>
          <template v-if="isHome">
            <a href="#about" @click="closeMenu()" class="nav-link hidden lg:inline">
              {{ $t('header.nav.about-section') }}
            </a>
            <a href="#experience" @click="closeMenu()" class="nav-link hidden lg:inline">
              {{ $t('header.nav.experience-section') }}
            </a>
            <a href="#contact" @click="closeMenu()" class="nav-link hidden lg:inline">
              {{ $t('header.nav.contact-section') }}
            </a>
          </template>
          <router-link
            to="/blogs"
            @click="closeMenu()"
            class="nav-link"
            :class="{ 'color-brand is-active': route.path === '/blogs' }"
          >
            {{ $t('header.nav.awards') }}
          </router-link>
          <router-link
            to="/portfolio"
            @click="closeMenu()"
            class="nav-link"
            :class="{ 'color-brand is-active': route.path === '/portfolio' }"
          >
            {{ $t('header.nav.about') }}
          </router-link>
        </nav>
        <div class="flex items-center gap-4">
          <a
            href="/yan-hanov.pdf"
            download="yan-hanov.pdf"
            class="btn-ghost text-xs py-2 px-3 hidden sm:inline-flex"
          >
            {{ $t('header.nav.resume') }}
          </a>
          <LangChange class="relative" />
          <button
            class="burger md:hidden hamburger--emphatic"
            @click="menuIsActive = !menuIsActive"
            :class="{ active: menuIsActive }"
          >
            <div class="burger-box">
              <div class="burger-inner"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<style scoped>
.burger {
  padding: 0.3125rem 0;
  display: none;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  background-color: transparent;
  overflow: visible;
  z-index: 100;
}
.burger:hover {
  opacity: 0.7;
}
.burger.active:hover {
  opacity: 0.7;
}
.burger.active .burger-inner,
.burger.active .burger-inner::before,
.burger.active .burger-inner::after {
  background-color: var(--brand);
}

.burger-box {
  width: 2.5rem;
  height: 1.5rem;
  position: relative;
}

.burger-inner {
  display: block;
  top: 50%;
  margin-top: -0.125rem;
}
.burger-inner,
.burger-inner::before,
.burger-inner::after {
  width: 1.875rem;
  height: 0.25rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  position: absolute;
  transition-property: transform;
  transition-duration: 0.15s;
  transition-timing-function: ease;
}
.burger-inner::before,
.burger-inner::after {
  content: '';
  display: block;
}
.burger-inner::before {
  top: -0.625rem;
}
.burger-inner::after {
  bottom: -0.625rem;
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
  top: 0.625rem;
  right: 0;
  transition:
    transform 0.125s cubic-bezier(0.6, 0.04, 0.98, 0.335),
    top 0.05s 0.125s linear,
    right 0.125s 0.175s ease-in;
}
.hamburger--emphatic.active .burger-inner {
  transition-delay: 0s;
  transition-timing-function: ease-out;
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

@media (max-width: 48rem) {
  .burger {
    display: block;
  }
  .menu-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    z-index: 40;
    animation: fade-in 0.3s ease;
  }
  .menu {
    position: fixed;
    padding: 5rem 2rem 2rem;
    font-size: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(26, 30, 35, 0.98);
    border-left: 1px solid var(--border-accent);
    width: min(85%, 20rem);
    right: -100%;
    height: 100dvh;
    font-weight: 500;
    top: 0;
    color: var(--text);
    transition: right 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 50;
  }
  .menu.active {
    right: 0;
  }
  .menu .nav-link {
    padding: 0.5rem 0;
    font-size: 1.125rem;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
