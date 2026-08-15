<script setup>
import { useI18n } from 'vue-i18n'
import { experience } from '@/entities/experience'

const { t } = useI18n()
</script>

<template>
  <div class="dwg">
    <article
      v-for="(job, i) in experience"
      :key="job.id"
      class="sheet reveal"
      :class="[`reveal-delay-${Math.min(i + 1, 3)}`, { 'sheet--live': job.current }]"
    >
      <div class="sheet__ticks" aria-hidden="true">
        <i /><i /><i /><i />
      </div>

      <p class="sheet__no">DWG.{{ job.code }}</p>

      <div class="sheet__year" aria-hidden="true">{{ job.year }}</div>

      <div class="sheet__main">
        <header class="sheet__head">
          <div class="sheet__flags">
            <span class="sheet__flag">{{ t(job.typeKey) }}</span>
            <span v-if="job.current" class="sheet__stamp">
              {{ t('experience.current') }}
            </span>
          </div>

          <component
            :is="job.url ? 'a' : 'h3'"
            :href="job.url || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="sheet__company"
          >
            {{ job.company }}
          </component>

          <p class="sheet__role">{{ t(job.roleKey) }}</p>
          <time class="sheet__period">{{ t(job.periodKey) }}</time>
        </header>

        <ul class="sheet__notes">
          <li v-for="n in job.bullets" :key="n">
            <span class="sheet__dim" aria-hidden="true">{{ String(n).padStart(2, '0') }}</span>
            {{ t(`experience.${job.id}.bullet${n}`) }}
          </li>
        </ul>
      </div>

      <footer class="sheet__block">
        <span>PROJECT</span>
        <strong>{{ job.company }}</strong>
        <span>SCALE 1:1</span>
        <span>REV {{ job.code }}</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.dwg {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  font-family: var(--exp-font);
  color: var(--exp-ink);
}

.sheet {
  position: relative;
  display: grid;
  gap: 1rem;
  padding: 1.15rem 1rem 0.85rem;
  border: 1px solid var(--exp-rule);
  background: color-mix(in srgb, var(--exp-ink) 4%, transparent);
  overflow: hidden;
}

.sheet::before {
  content: '';
  position: absolute;
  inset: 0.4rem;
  border: 1px solid color-mix(in srgb, var(--exp-ink) 18%, transparent);
  pointer-events: none;
}

.sheet__ticks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sheet__ticks i {
  position: absolute;
  width: 0.55rem;
  height: 0.55rem;
  border-color: var(--exp-accent);
  border-style: solid;
}

.sheet__ticks i:nth-child(1) {
  top: 0.15rem;
  left: 0.15rem;
  border-width: 1px 0 0 1px;
}

.sheet__ticks i:nth-child(2) {
  top: 0.15rem;
  right: 0.15rem;
  border-width: 1px 1px 0 0;
}

.sheet__ticks i:nth-child(3) {
  bottom: 0.15rem;
  left: 0.15rem;
  border-width: 0 0 1px 1px;
}

.sheet__ticks i:nth-child(4) {
  bottom: 0.15rem;
  right: 0.15rem;
  border-width: 0 1px 1px 0;
}

.sheet__no {
  position: relative;
  margin: 0;
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  color: var(--exp-accent);
}

.sheet__year {
  position: absolute;
  right: 0.7rem;
  top: 0.35rem;
  font-size: clamp(3.4rem, 10vw, 6.5rem);
  font-weight: 500;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: color-mix(in srgb, var(--exp-ink) 10%, transparent);
  pointer-events: none;
  user-select: none;
}

.sheet__main {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .sheet {
    grid-template-columns: minmax(0, 1fr);
    padding: 1.35rem 1.25rem 0.95rem;
  }

  .sheet__main {
    grid-template-columns: minmax(15rem, 0.42fr) minmax(0, 1fr);
    gap: 1.5rem;
    align-items: start;
  }
}

.sheet__head {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.sheet__flags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.sheet__flag {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--exp-muted);
}

.sheet__stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.45rem;
  border: 1.5px solid var(--exp-stamp);
  color: var(--exp-stamp);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transform: rotate(-8deg);
}

.sheet__company {
  margin: 0;
  font-size: clamp(1.35rem, 2.8vw, 1.85rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--exp-ink);
  text-transform: uppercase;
}

.sheet__company:hover {
  color: var(--exp-accent);
}

.sheet__role {
  margin: 0;
  font-size: 0.85rem;
  color: var(--exp-accent);
}

.sheet__period {
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  color: var(--exp-muted);
}

.sheet__notes {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.sheet__notes li {
  display: grid;
  grid-template-columns: 1.6rem minmax(0, 1fr);
  gap: 0.55rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--exp-muted);
}

.sheet__dim {
  color: var(--exp-accent);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  padding-top: 0.15rem;
}

.sheet__block {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  margin-top: 0.25rem;
  padding: 0.45rem 0.15rem 0;
  border-top: 1px solid var(--exp-rule);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--exp-muted);
}

.sheet__block strong {
  color: var(--exp-ink);
  font-weight: 500;
}
</style>
