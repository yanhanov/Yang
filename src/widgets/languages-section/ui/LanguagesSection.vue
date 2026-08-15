<script setup>
import { useI18n } from 'vue-i18n'
import { languages } from '@/entities/language'

const { t } = useI18n()
</script>

<template>
  <div class="langs reveal">
    <article
      v-for="(lang, i) in languages"
      :key="lang.key"
      class="lang-spec"
      :class="{
        'lang-spec--primary': lang.primary,
        [`reveal-delay-${Math.min(i + 1, 3)}`]: true,
      }"
    >
      <p class="lang-spec__glyph" aria-hidden="true">{{ lang.specimen }}</p>
      <div class="lang-spec__body">
        <div class="lang-spec__head">
          <h3 class="lang-spec__name">{{ t(`home.languages.${lang.key}.name`) }}</h3>
          <span class="lang-spec__level">{{ t(`home.languages.${lang.key}.level`) }}</span>
        </div>
        <p class="lang-spec__usage">{{ t(`home.languages.${lang.key}.usage`) }}</p>
        <div class="lang-spec__meter" :aria-label="`${lang.level}%`">
          <span class="lang-spec__meter-fill" :style="{ width: lang.level + '%' }" />
        </div>
        <p class="lang-spec__sample">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
          abcdefghijklmnopqrstuvwxyz<br />
          0123456789
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.langs {
  display: grid;
  gap: 1.5rem;
  font-family: var(--type-font-meta);
  color: var(--type-ink);
}

@media (min-width: 48rem) {
  .langs {
    grid-template-columns: 1.2fr 1fr;
    gap: 2rem;
  }
}

.lang-spec {
  display: grid;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--type-rule);
}

@media (min-width: 40rem) {
  .lang-spec {
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: start;
  }
}

.lang-spec__glyph {
  margin: 0;
  font-family: var(--type-font-display);
  font-size: clamp(4.5rem, 12vw, 7rem);
  font-weight: 600;
  line-height: 0.85;
  letter-spacing: -0.04em;
  color: var(--type-ink);
}

.lang-spec__name {
  margin: 0;
  font-family: var(--type-font-display);
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.lang-spec__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.65rem 1rem;
}

.lang-spec__level {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--type-muted);
}

.lang-spec__usage {
  margin: 0.65rem 0 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--type-muted);
}

.lang-spec__meter {
  margin-top: 1rem;
  height: 2px;
  background: var(--type-rule);
}

.lang-spec__meter-fill {
  display: block;
  height: 100%;
  background: var(--type-ink);
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.lang-spec__sample {
  margin: 1rem 0 0;
  font-family: var(--type-font-display);
  font-size: 0.75rem;
  line-height: 1.7;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--type-muted) 70%, transparent);
}

.reveal:not(.revealed) .lang-spec__meter-fill {
  width: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .lang-spec__meter-fill {
    transition: none;
  }
}
</style>
