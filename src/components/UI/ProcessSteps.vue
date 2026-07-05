<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const steps = [
  { key: 'discover', num: '01' },
  { key: 'build', num: '02' },
  { key: 'ship', num: '03' },
]
</script>

<template>
  <div class="process-grid relative">
    <div class="hidden md:block process-line" aria-hidden="true" />
    <div
      v-for="(step, i) in steps"
      :key="step.key"
      class="glass-card p-6 reveal group hover:-translate-y-1 transition-all duration-300 process-step"
      :class="`reveal-delay-${i + 1}`"
    >
      <span class="text-4xl font-bold secont-font color-brand/20 group-hover:color-brand/50 transition-colors">
        {{ step.num }}
      </span>
      <h3 class="secont-font text-xl font-medium mt-3 group-hover:color-brand transition-colors">
        {{ t(`home.process.${step.key}.title`) }}
      </h3>
      <p class="text-sm text-[var(--text-muted)] mt-2 leading-relaxed">
        {{ t(`home.process.${step.key}.text`) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.process-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .process-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .process-line {
    position: absolute;
    top: 2.5rem;
    left: 16.66%;
    right: 16.66%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-accent), transparent);
  }
}

.process-step:hover {
  border-color: rgba(18, 247, 214, 0.35);
  box-shadow: 0 16px 48px -24px rgba(18, 247, 214, 0.25);
}
</style>
