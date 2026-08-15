<script setup>
import { useI18n } from 'vue-i18n'
import { languages } from '@/entities/language'

const { t } = useI18n()
</script>

<template>
  <div class="metro reveal">
    <article
      v-for="(lang, i) in languages"
      :key="lang.key"
      class="tile"
      :class="[`tile--${lang.key}`, `reveal-delay-${Math.min(i + 1, 3)}`]"
    >
      <p class="tile__glyph" aria-hidden="true">{{ lang.specimen }}</p>
      <div class="tile__body">
        <div class="tile__head">
          <h3 class="tile__name">{{ t(`home.languages.${lang.key}.name`) }}</h3>
          <span class="tile__level">{{ t(`home.languages.${lang.key}.level`) }}</span>
        </div>
        <p class="tile__usage">{{ t(`home.languages.${lang.key}.usage`) }}</p>
        <div class="tile__meter" :aria-label="`${lang.level}%`">
          <span class="tile__meter-fill" :style="{ width: lang.level + '%' }" />
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.metro {
  display: grid;
  gap: 0.5rem;
  font-family: var(--flat-font);
  color: var(--flat-ink);
}

@media (min-width: 48rem) {
  .metro {
    grid-template-columns: 1.15fr 1fr;
    gap: 0.5rem;
  }
}

.tile {
  display: grid;
  gap: 1rem;
  min-height: 16rem;
  padding: 1.5rem 1.35rem 1.35rem;
}

.tile--ru {
  background: #00a4ef;
}

.tile--en {
  background: #7fba00;
}

@media (min-width: 40rem) {
  .tile {
    grid-template-columns: auto 1fr;
    align-items: end;
  }
}

.tile__glyph {
  margin: 0;
  font-size: clamp(4.5rem, 12vw, 7.5rem);
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: -0.06em;
}

.tile__name {
  margin: 0;
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.tile__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.55rem 0.9rem;
}

.tile__level {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--flat-muted);
}

.tile__usage {
  margin: 0.55rem 0 0;
  max-width: 22rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--flat-muted);
}

.tile__meter {
  margin-top: 1.1rem;
  height: 6px;
  background: rgba(255, 255, 255, 0.28);
}

.tile__meter-fill {
  display: block;
  height: 100%;
  background: #fff;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal:not(.revealed) .tile__meter-fill {
  width: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .tile__meter-fill {
    transition: none;
  }
}
</style>
