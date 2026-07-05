<script setup>
import { useI18n } from 'vue-i18n'
import { ref, onMounted, onUnmounted } from 'vue'

const { locale } = useI18n()
const open = ref(false)
const root = ref(null)

function changeLanguage(lang) {
  locale.value = lang
  localStorage.setItem('locale', lang)
  open.value = false
}

function onClickOutside(e) {
  if (root.value && !root.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<template>
  <div ref="root" class="lang">
    <button
      type="button"
      class="lang__trigger base-font"
      :aria-expanded="open"
      @click.stop="open = !open"
    >
      {{ locale === 'en' ? $t('header.english') : $t('header.russian') }}
      <svg
        class="lang__chevron"
        :class="{ 'lang__chevron--open': open }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <div class="lang__menu" :class="{ 'lang__menu--open': open }">
      <button
        type="button"
        class="lang__option"
        :class="{ 'lang__option--active': locale === 'en' }"
        @click="changeLanguage('en')"
      >
        {{ $t('header.english') }}
      </button>
      <button
        type="button"
        class="lang__option"
        :class="{ 'lang__option--active': locale === 'ru' }"
        @click="changeLanguage('ru')"
      >
        {{ $t('header.russian') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}

.lang__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4375rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: var(--text-muted);
  background: rgba(34, 38, 45, 0.72);
  border: 1px solid var(--border-accent);
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}

.lang__trigger:hover {
  color: var(--text);
  border-color: rgba(18, 247, 214, 0.35);
}

.lang__chevron {
  transition: transform 0.2s ease;
}

.lang__chevron--open {
  transform: rotate(180deg);
}

.lang__menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 5.5rem;
  padding: 0.25rem;
  border-radius: 0.75rem;
  background: rgba(26, 30, 35, 0.98);
  border: 1px solid var(--border-accent);
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.65);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
  z-index: 60;
}

.lang__menu--open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang__option {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  text-align: left;
  color: var(--text-muted);
  background: transparent;
  border: none;
  cursor: pointer;
  transition:
    color 0.2s,
    background 0.2s;
}

.lang__option:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.lang__option--active {
  color: var(--brand);
  background: var(--brand-dim);
}
</style>
