<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'
import { skills, skillGroups } from '@/entities/skill'

const { t } = useI18n()

const primary = computed(() => skills.filter((s) => s.primary))

const groups = computed(() =>
  skillGroups.map((group) => ({
    ...group,
    label: t(group.labelKey),
    skills: skills.filter((s) => s.group === group.id && !s.primary),
  })).filter((g) => g.skills.length),
)
</script>

<template>
  <div class="stack reveal">
    <h3 class="stack__primary-label section-label">{{ t('home.skills-primary-label') }}</h3>

    <div class="stack__primary">
      <div
        v-for="skill in primary"
        :key="skill.name"
        class="stack-card stack-card--primary glass-card"
        :style="{ '--skill-color': skill.color }"
      >
        <div class="stack-card__icon stack-card__icon--lg">
          <TechIcon :name="skill.icon" :size="36" />
        </div>
        <p class="stack-card__name secont-font">{{ skill.name }}</p>
        <div class="stack-card__track">
          <div class="stack-card__fill" :style="{ width: skill.level + '%' }" />
        </div>
        <span class="stack-card__level base-font">{{ skill.level }}%</span>
      </div>
    </div>

    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="stack__group"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <h3 class="stack__group-label section-label">{{ group.label }}</h3>
      <div class="stack__grid">
        <div
          v-for="skill in group.skills"
          :key="skill.name"
          class="stack-card glass-card"
          :style="{ '--skill-color': skill.color }"
        >
          <div class="stack-card__row">
            <div class="stack-card__icon">
              <TechIcon :name="skill.icon" :size="26" />
            </div>
            <div class="stack-card__content">
              <div class="stack-card__head">
                <span class="stack-card__name secont-font">{{ skill.name }}</span>
                <span class="stack-card__level base-font">{{ skill.level }}%</span>
              </div>
              <div class="stack-card__track">
                <div class="stack-card__fill" :style="{ width: skill.level + '%' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.stack__primary-label {
  margin-bottom: 1rem;
}

.stack__primary {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

@media (min-width: 40rem) {
  .stack__primary {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

.stack__group + .stack__group {
  margin-top: 2rem;
}

.stack__group-label {
  margin-bottom: 0.875rem;
}

.stack__grid {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 40rem) {
  .stack__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.875rem;
  }
}

@media (min-width: 64rem) {
  .stack__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stack-card {
  position: relative;
  overflow: hidden;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.stack-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, color-mix(in srgb, var(--skill-color) 14%, transparent), transparent 65%);
  opacity: 0;
  transition: opacity 0.25s;
  pointer-events: none;
}

.stack-card:hover {
  border-color: color-mix(in srgb, var(--skill-color) 38%, transparent);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px -20px color-mix(in srgb, var(--skill-color) 30%, transparent);
}

.stack-card:hover::before {
  opacity: 1;
}

.stack-card--primary {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem 1.25rem;
  border-color: color-mix(in srgb, var(--skill-color) 28%, transparent);
}

.stack-card--primary .stack-card__name {
  margin-top: 0.875rem;
  font-size: 1.0625rem;
}

.stack-card--primary .stack-card__track {
  width: 100%;
  margin-top: 0.875rem;
}

.stack-card--primary .stack-card__level {
  margin-top: 0.5rem;
  font-size: 0.75rem;
}

.stack-card {
  padding: 1rem 1.125rem;
}

.stack-card__row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.stack-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--skill-color) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--skill-color) 22%, transparent);
}

.stack-card__icon--lg {
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
}

.stack-card__content {
  flex: 1;
  min-width: 0;
}

.stack-card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.stack-card__name {
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.3;
}

.stack-card__level {
  font-size: 0.6875rem;
  color: var(--skill-color);
  letter-spacing: 0.04em;
  flex-shrink: 0;
}

.stack-card__track {
  height: 4px;
  border-radius: 999px;
  background: var(--border);
  overflow: hidden;
}

.stack-card--primary .stack-card__track {
  height: 5px;
}

.stack-card__fill {
  height: 100%;
  border-radius: inherit;
  background: var(--skill-color);
  box-shadow: 0 0 10px color-mix(in srgb, var(--skill-color) 50%, transparent);
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal:not(.revealed) .stack-card__fill {
  width: 0 !important;
}

@media (prefers-reduced-motion: reduce) {
  .stack-card__fill {
    transition: none;
  }
}
</style>
