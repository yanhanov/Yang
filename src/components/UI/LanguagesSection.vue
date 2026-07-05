<script setup>
import { useI18n } from 'vue-i18n'
import { languages } from '@/data/languages'

const { t } = useI18n()
</script>

<template>
  <div class="langs reveal">
    <article
      v-for="(lang, i) in languages"
      :key="lang.key"
      class="lang-card glass-card"
      :class="{
        'lang-card--primary': lang.primary,
        [`reveal-delay-${Math.min(i + 1, 3)}`]: true,
      }"
      :style="{ '--lang-color': lang.color }"
    >
      <div class="lang-card__badge base-font">{{ lang.key }}</div>

      <div class="lang-card__body">
        <div class="lang-card__head">
          <h3 class="lang-card__name secont-font">{{ t(`home.languages.${lang.key}.name`) }}</h3>
          <span class="lang-card__level base-font">{{ t(`home.languages.${lang.key}.level`) }}</span>
        </div>

        <p class="lang-card__usage">{{ t(`home.languages.${lang.key}.usage`) }}</p>

        <div class="lang-card__track">
          <div class="lang-card__fill" :style="{ width: lang.level + '%' }" />
        </div>

        <span class="lang-card__percent base-font">{{ lang.level }}%</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.langs {
  display: grid;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .langs {
    grid-template-columns: 1.15fr 1fr;
    gap: 1.25rem;
    align-items: stretch;
  }
}

.lang-card {
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 1.25rem;
  padding: 1.5rem 1.5rem 1.375rem;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.lang-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, color-mix(in srgb, var(--lang-color) 12%, transparent), transparent 70%);
  opacity: 0;
  transition: opacity 0.25s;
  pointer-events: none;
}

.lang-card:hover {
  border-color: color-mix(in srgb, var(--lang-color) 40%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px -20px color-mix(in srgb, var(--lang-color) 28%, transparent);
}

.lang-card:hover::before {
  opacity: 1;
}

.lang-card--primary {
  border-color: color-mix(in srgb, var(--lang-color) 30%, transparent);
}

@media (min-width: 40rem) {
  .lang-card--primary {
    padding: 1.75rem 1.75rem 1.5rem;
  }
}

.lang-card__badge {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--lang-color);
  background: color-mix(in srgb, var(--lang-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--lang-color) 24%, transparent);
}

.lang-card--primary .lang-card__badge {
  width: 3.75rem;
  height: 3.75rem;
  font-size: 0.9375rem;
  border-radius: 1rem;
}

.lang-card__body {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.lang-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.375rem;
}

.lang-card__name {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.3;
}

.lang-card--primary .lang-card__name {
  font-size: 1.25rem;
}

.lang-card__level {
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  color: var(--lang-color);
}

.lang-card__usage {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.lang-card__track {
  height: 4px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
}

.lang-card--primary .lang-card__track {
  height: 5px;
}

.lang-card__fill {
  height: 100%;
  border-radius: inherit;
  background: var(--lang-color);
  box-shadow: 0 0 10px color-mix(in srgb, var(--lang-color) 45%, transparent);
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.lang-card__percent {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  color: var(--lang-color);
  opacity: 0.8;
}

.reveal:not(.revealed) .lang-card__fill {
  width: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .lang-card__fill {
    transition: none;
  }
}
</style>
