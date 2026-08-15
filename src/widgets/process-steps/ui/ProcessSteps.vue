<script setup>
import { useI18n } from 'vue-i18n'
import { principles, processSteps } from '@/entities/process'

const { t } = useI18n()
</script>

<template>
  <div class="process reveal">
    <ul class="process__principles">
      <li v-for="item in principles" :key="item.key" class="process__principle">
        {{ t(`home.process-principles.${item.key}`) }}
      </li>
    </ul>

    <div class="process__grid">
      <article
        v-for="(step, i) in processSteps"
        :key="step.key"
        class="process-card"
        :class="`reveal-delay-${Math.min(i + 1, 4)}`"
      >
        <span class="process-card__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="process-card__title">{{ t(`home.process.${step.key}.title`) }}</h3>
        <p class="process-card__text">{{ t(`home.process.${step.key}.text`) }}</p>

        <ul v-if="step.bullets > 0" class="process-card__bullets">
          <li v-for="n in step.bullets" :key="n">
            {{ t(`home.process.${step.key}.bullet${n}`) }}
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.process {
  font-family: var(--brutal-font);
  color: var(--brutal-ink);
}

.process__principles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
}

.process__principle {
  padding: 0.45rem 0.75rem;
  border: 2px solid var(--brutal-border);
  background: #fff;
  box-shadow: 3px 3px 0 var(--brutal-border);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.process__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .process__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .process__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.process-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.15rem;
  background: #fff;
  border: 2.5px solid var(--brutal-border);
  box-shadow: 5px 5px 0 var(--brutal-border);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.process-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--brutal-border);
}

.process-card:nth-child(2) {
  background: var(--brutal-block);
}

.process-card:nth-child(3) {
  background: color-mix(in srgb, var(--brutal-accent) 18%, white);
}

.process-card__index {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}

.process-card__title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 800;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.process-card__text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--brutal-muted);
}

.process-card__bullets {
  margin: 0.35rem 0 0;
  padding: 0.75rem 0 0;
  border-top: 2px solid var(--brutal-border);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.process-card__bullets li {
  position: relative;
  padding-left: 0.95rem;
  font-size: 0.8rem;
  line-height: 1.45;
  font-weight: 600;
}

.process-card__bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 0.45rem;
  height: 0.45rem;
  background: var(--brutal-accent);
  border: 1.5px solid var(--brutal-border);
}
</style>
