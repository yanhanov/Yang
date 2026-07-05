<script setup>
import { useI18n } from 'vue-i18n'
import { experience } from '@/data/resume'

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
      <div class="timeline__meta">
        <span class="timeline__index base-font">{{ String(i + 1).padStart(2, '0') }}</span>
        <time class="timeline__date base-font">{{ t(job.periodKey) }}</time>
      </div>

      <div class="timeline__spine" aria-hidden="true">
        <span class="timeline__dot" />
        <span v-if="i < experience.length - 1" class="timeline__stem" />
      </div>

      <div class="timeline__card glass-card">
        <header class="timeline__head">
          <div>
            <component
              :is="job.url ? 'a' : 'h3'"
              :href="job.url || undefined"
              target="_blank"
              rel="noopener noreferrer"
              class="timeline__company secont-font"
              :class="{ 'timeline__company--link': job.url }"
            >
              {{ job.company }}
            </component>
            <p class="timeline__role">{{ t(job.roleKey) }}</p>
          </div>

          <div class="timeline__labels">
            <time class="timeline__date-mobile base-font">{{ t(job.periodKey) }}</time>
            <span class="timeline__type base-font">{{ t(job.typeKey) }}</span>
            <span v-if="job.current" class="timeline__current base-font">
              {{ t('experience.current') }}
            </span>
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
  gap: 1.5rem;
}

.timeline__item {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
}

.timeline__meta,
.timeline__spine {
  display: none;
}

.timeline__head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem 1.5rem;
}

.timeline__date-mobile {
  font-size: 0.75rem;
  color: var(--brand);
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.timeline__company {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text);
  line-height: 1.3;
}

.timeline__company--link {
  color: var(--brand);
  transition: opacity 0.2s;
}

.timeline__company--link:hover {
  opacity: 0.85;
}

.timeline__role {
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

.timeline__labels {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
}

.timeline__type {
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-muted);
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}

.timeline__current {
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand);
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--border-accent);
  border-radius: 999px;
  background: var(--brand-dim);
}

.timeline__card {
  padding: 1.25rem 1.5rem;
  transition: border-color 0.2s ease;
}

.timeline__item--current .timeline__card {
  border-color: rgba(18, 247, 214, 0.35);
}

.timeline__card:hover {
  border-color: rgba(18, 247, 214, 0.25);
}

.timeline__bullets {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline__bullets li {
  position: relative;
  padding-left: 1rem;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.timeline__bullets li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--brand);
  opacity: 0.7;
}

@media (min-width: 48rem) {
  .timeline {
    --timeline-gap: 2rem;
    gap: var(--timeline-gap);
  }

  .timeline__item {
    grid-template-columns: 8.75rem 2rem 1fr;
    gap: 0 1.5rem;
    align-items: stretch;
  }

  .timeline__meta,
  .timeline__spine {
    display: flex;
  }

  .timeline__meta {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    padding-top: 1.375rem;
    text-align: right;
    gap: 0.375rem;
  }

  .timeline__index {
    font-size: 0.75rem;
    color: var(--text-muted);
    opacity: 0.45;
    letter-spacing: 0.08em;
    line-height: 1;
  }

  .timeline__date {
    font-size: 0.8125rem;
    color: var(--brand);
    letter-spacing: 0.01em;
    line-height: 1.45;
    max-width: 8.75rem;
  }

  .timeline__spine {
    position: relative;
    flex-direction: column;
    align-items: center;
    padding-top: 1.5rem;
    align-self: stretch;
  }

  .timeline__dot {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    border: 2px solid var(--brand);
    background: var(--surface);
    flex-shrink: 0;
    z-index: 1;
  }

  .timeline__item--current .timeline__dot {
    background: var(--brand);
    box-shadow: 0 0 10px rgba(18, 247, 214, 0.45);
  }

  .timeline__stem {
    position: absolute;
    top: calc(1.5rem + 0.625rem + 4px);
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: calc(100% - 1.5rem - 0.625rem - 4px + var(--timeline-gap) + 1.5rem + 0.3125rem);
    background: var(--border);
  }

  .timeline__date-mobile {
    display: none;
  }

  .timeline__labels {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
