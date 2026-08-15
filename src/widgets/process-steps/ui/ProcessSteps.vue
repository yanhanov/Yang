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
        class="pane"
        :class="`reveal-delay-${Math.min(i + 1, 4)}`"
      >
        <span class="pane__index">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="pane__title">{{ t(`home.process.${step.key}.title`) }}</h3>
        <p class="pane__text">{{ t(`home.process.${step.key}.text`) }}</p>

        <ul v-if="step.bullets > 0" class="pane__bullets">
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
  font-family: var(--glass-font);
  color: var(--glass-ink);
}

.process__principles {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin: 0 0 1.35rem;
  padding: 0;
  list-style: none;
}

.process__principle,
.pane {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.process__principle {
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.process__grid {
  display: grid;
  gap: 0.85rem;
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

.pane {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-height: 100%;
  padding: 1.2rem 1.1rem 1.15rem;
  border-radius: 1.25rem;
}

.pane__index {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: var(--glass-accent);
}

.pane__title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.03em;
}

.pane__text {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--glass-muted);
}

.pane__bullets {
  margin: 0.2rem 0 0;
  padding: 0.7rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.pane__bullets li {
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--glass-muted);
}
</style>
