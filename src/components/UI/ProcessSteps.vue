<script setup>
import { useI18n } from 'vue-i18n'
import { principles, processSteps } from '@/data/process'

const { t } = useI18n()
</script>

<template>
  <div class="process reveal">
    <ul class="process__principles">
      <li
        v-for="item in principles"
        :key="item.key"
        class="process__principle base-font"
      >
        {{ t(`home.process-principles.${item.key}`) }}
      </li>
    </ul>

    <div class="process__grid">
      <article
        v-for="(step, i) in processSteps"
        :key="step.key"
        class="process-card glass-card"
        :class="`reveal-delay-${Math.min(i + 1, 4)}`"
      >
        <header class="process-card__head">
          <span class="process-card__index base-font">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="process-card__intro">
            <h3 class="process-card__title secont-font">{{ t(`home.process.${step.key}.title`) }}</h3>
            <p class="process-card__text">{{ t(`home.process.${step.key}.text`) }}</p>
          </div>
        </header>

        <hr class="process-card__rule" aria-hidden="true" />

        <ul class="process-card__bullets">
          <li v-for="n in step.bullets" :key="n">
            {{ t(`home.process.${step.key}.bullet${n}`) }}
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.process__principles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  list-style: none;
  padding: 0;
}

.process__principle {
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--brand);
  background: var(--brand-dim);
  border: 1px solid var(--border-accent);
}

.process__grid {
  display: grid;
  gap: 1rem;
  align-items: stretch;
}

@media (min-width: 40rem) {
  .process__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 64rem) {
  .process__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.process-card {
  padding: 1.5rem 1.375rem 1.375rem;
  --process-head-height: 4.75rem;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

@media (min-width: 40rem) {
  .process-card {
    --process-head-height: 5.25rem;
  }
}

@media (min-width: 64rem) {
  .process-card {
    --process-head-height: 5.75rem;
  }
}

.process-card:hover {
  border-color: rgba(18, 247, 214, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 16px 48px -24px rgba(18, 247, 214, 0.22);
}

.process-card__head {
  display: flex;
  gap: 1rem;
  min-height: var(--process-head-height);
  margin-bottom: 1rem;
}

.process-card__intro {
  flex: 1;
  min-width: 0;
}

.process-card__index {
  flex-shrink: 0;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1;
  color: var(--brand);
  opacity: 0.35;
  transition: opacity 0.2s;
}

.process-card__title {
  font-size: 1.0625rem;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 0.375rem;
  transition: color 0.2s;
}

.process-card:hover .process-card__index {
  opacity: 0.7;
}

.process-card:hover .process-card__title {
  color: var(--brand);
}

.process-card__text {
  font-size: 0.8125rem;
  line-height: 1.55;
  color: var(--text-muted);
  min-height: calc(0.8125rem * 1.55 * 2);
}

.process-card__rule {
  border: none;
  border-top: 1px solid var(--border);
  margin: 0 0 1rem;
}

.process-card__bullets {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.process-card__bullets li {
  position: relative;
  padding-left: 0.875rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text);
}

.process-card__bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--brand);
  opacity: 0.7;
}
</style>
