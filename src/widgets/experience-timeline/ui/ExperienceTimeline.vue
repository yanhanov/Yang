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
      <div class="timeline__rail">
        <span class="timeline__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <time class="timeline__date">{{ t(job.periodKey) }}</time>
      </div>

      <div class="timeline__block">
        <header class="timeline__head">
          <div>
            <component
              :is="job.url ? 'a' : 'h3'"
              :href="job.url || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="timeline__company"
              :class="{ 'timeline__company--link': job.url }"
            >
              {{ job.company }}
            </component>
            <p class="timeline__role">{{ t(job.roleKey) }}</p>
          </div>
          <div class="timeline__labels">
            <span class="timeline__type">{{ t(job.typeKey) }}</span>
            <span v-if="job.current" class="timeline__now">{{ t('experience.current') }}</span>
          </div>
        </header>

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
  gap: 0;
  border-top: 2px solid var(--exp-accent);
}

.timeline__item {
  display: grid;
  grid-template-columns: 1fr;
  border-bottom: 2px solid var(--exp-border);
}

@media (min-width: 48rem) {
  .timeline__item {
    grid-template-columns: 11rem 1fr;
  }
}

.timeline__rail {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.25rem 0;
  font-family: var(--exp-font);
}

@media (min-width: 48rem) {
  .timeline__rail {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.75rem;
    padding: 1.5rem 1.25rem;
    border-right: 2px solid var(--exp-border);
  }
}

.timeline__index {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--exp-accent);
}

.timeline__date {
  font-size: 0.75rem;
  line-height: 1.4;
  color: var(--exp-muted);
}

.timeline__block {
  padding: 1.25rem;
}

@media (min-width: 48rem) {
  .timeline__block {
    padding: 1.5rem 1.75rem;
  }
}

.timeline__item--current .timeline__block {
  background: color-mix(in srgb, var(--exp-accent) 6%, transparent);
}

.timeline__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
}

.timeline__company {
  margin: 0;
  font-family: var(--exp-font);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--exp-ink);
  text-transform: uppercase;
}

.timeline__company--link {
  color: var(--exp-accent);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.timeline__role {
  margin: 0.4rem 0 0;
  font-family: var(--exp-font);
  font-size: 0.8125rem;
  color: var(--exp-muted);
}

.timeline__labels {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.timeline__type,
.timeline__now {
  font-family: var(--exp-font);
  font-size: 0.625rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.45rem;
  border: 1px solid var(--exp-border);
  color: var(--exp-muted);
}

.timeline__now {
  border-color: var(--exp-accent);
  color: var(--exp-bg);
  background: var(--exp-accent);
}

.timeline__bullets {
  margin: 1.1rem 0 0;
  padding: 1.1rem 0 0;
  border-top: 1px solid var(--exp-border);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  list-style: none;
}

.timeline__bullets li {
  position: relative;
  padding-left: 1.1rem;
  font-family: var(--exp-font);
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--exp-muted);
}

.timeline__bullets li::before {
  content: '>';
  position: absolute;
  left: 0;
  color: var(--exp-accent);
}
</style>
