<script setup>
import { useI18n } from 'vue-i18n'
import { experience } from '@/entities/experience'

const { t } = useI18n()
</script>

<template>
  <div class="timeline">
    <article
      v-for="(job, i) in experience"
      :key="job.id"
      class="timeline__item reveal"
      :class="[`reveal-delay-${Math.min(i + 1, 3)}`, { 'timeline__item--current': job.current }]"
    >
      <div class="timeline__element" aria-hidden="true">
        <span class="timeline__n">{{ job.atomic }}</span>
        <span class="timeline__symbol">{{ job.symbol }}</span>
      </div>

      <div class="timeline__body">
        <p class="timeline__ep">
          S{{ String(i + 1).padStart(2, '0') }}
          <span aria-hidden="true">·</span>
          {{ job.year }}
          <span aria-hidden="true">·</span>
          {{ t(job.typeKey) }}
          <span v-if="job.current">· {{ t('experience.current') }}</span>
        </p>

        <h3 class="timeline__title">
          <component
            :is="job.url ? 'a' : 'span'"
            :href="job.url || undefined"
            target="_blank"
            rel="noopener noreferrer"
            class="timeline__lockup"
          >
            <span class="timeline__box">
              <span class="timeline__box-n">{{ job.atomic }}</span>
              {{ job.symbol }}
            </span>
            <span class="timeline__rest">{{ job.rest }}</span>
          </component>
        </h3>

        <p class="timeline__role">{{ t(job.roleKey) }}</p>
        <p class="timeline__period">{{ t(job.periodKey) }}</p>

        <ul class="timeline__bullets">
          <li v-for="n in job.bullets" :key="n">
            {{ t(`experience.${job.id}.bullet${n}`) }}
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-family: var(--exp-font);
}

.timeline__item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.35rem 0 1.6rem;
  border-top: 1px solid color-mix(in srgb, var(--exp-green) 70%, transparent);
}

.timeline__item:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--exp-green) 70%, transparent);
}

@media (min-width: 48rem) {
  .timeline__item {
    grid-template-columns: 5.75rem minmax(0, 1fr);
    gap: 1.75rem;
    align-items: start;
    padding: 1.75rem 0 2rem;
  }
}

.timeline__element {
  display: none;
}

@media (min-width: 48rem) {
  .timeline__element {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 5.75rem;
    height: 5.75rem;
    background: var(--exp-accent);
    color: #111;
  }

  .timeline__item:not(.timeline__item--current) .timeline__element {
    background: var(--exp-green);
    color: #dce6d4;
  }
}

.timeline__n,
.timeline__box-n {
  position: absolute;
  top: 0.35rem;
  left: 0.4rem;
  font-size: 0.7rem;
  font-weight: 700;
}

.timeline__symbol {
  font-size: 2.1rem;
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.05em;
  padding-bottom: 0.35rem;
}

.timeline__ep {
  margin: 0 0 0.65rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--exp-accent);
}

.timeline__title {
  margin: 0;
}

.timeline__lockup {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.15rem;
  color: var(--exp-green);
  font-size: clamp(1.85rem, 5vw, 3.1rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.timeline__box {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  min-width: 1.15em;
  padding: 0.42em 0.12em 0.06em;
  margin-right: 0.06em;
  background: var(--exp-accent);
  color: #111;
  letter-spacing: -0.04em;
}

.timeline__rest {
  padding-bottom: 0.05em;
}

.timeline__item--current .timeline__lockup {
  color: #c5d4b8;
}

.timeline__role {
  margin: 0.7rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--exp-ink);
}

.timeline__period {
  margin: 0.25rem 0 0;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  color: var(--exp-muted);
}

.timeline__bullets {
  margin: 1.15rem 0 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  max-width: 38rem;
}

.timeline__bullets li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--exp-muted);
}

.timeline__bullets li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--exp-accent);
  font-size: 0.7rem;
  top: 0.2em;
}
</style>
