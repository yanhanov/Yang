<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'
import { skills, skillGroups } from '@/entities/skill'

const { t } = useI18n()

const primary = computed(() => skills.filter((s) => s.primary))

const groups = computed(() =>
  skillGroups
    .map((group) => ({
      ...group,
      label: t(group.labelKey),
      skills: skills.filter((s) => s.group === group.id && !s.primary),
    }))
    .filter((g) => g.skills.length),
)
</script>

<template>
  <div class="stack reveal">
    <p class="stack__label">{{ t('home.skills-primary-label') }}</p>

    <div class="stack__primary">
      <div
        v-for="skill in primary"
        :key="skill.name"
        class="stack-card stack-card--primary"
        :style="{ '--skill-color': skill.color }"
      >
        <div class="stack-card__icon stack-card__icon--lg">
          <TechIcon :name="skill.icon" :size="32" />
        </div>
        <p class="stack-card__name">{{ skill.name }}</p>
        <div class="stack-card__track">
          <div class="stack-card__fill" :style="{ width: skill.level + '%' }" />
        </div>
        <span class="stack-card__level">{{ skill.level }}%</span>
      </div>
    </div>

    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="stack__group"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <p class="stack__label">{{ group.label }}</p>
      <div class="stack__grid">
        <div
          v-for="skill in group.skills"
          :key="skill.name"
          class="stack-card"
          :style="{ '--skill-color': skill.color }"
        >
          <div class="stack-card__row">
            <div class="stack-card__icon">
              <TechIcon :name="skill.icon" :size="22" />
            </div>
            <div class="stack-card__content">
              <div class="stack-card__head">
                <span class="stack-card__name">{{ skill.name }}</span>
                <span class="stack-card__level">{{ skill.level }}%</span>
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
  font-family: var(--soft-font);
  color: var(--soft-ink);
}

.stack__label {
  margin: 0 0 0.85rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--soft-muted);
}

.stack__primary {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 40rem) {
  .stack__primary {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stack__group + .stack__group {
  margin-top: 1.75rem;
}

.stack__grid {
  display: grid;
  gap: 0.85rem;
}

@media (min-width: 40rem) {
  .stack__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .stack__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.stack-card {
  padding: 1rem 1.1rem;
  border-radius: 1.25rem;
  background: var(--soft-surface);
  box-shadow:
    8px 8px 18px var(--soft-shadow),
    -6px -6px 14px var(--soft-highlight);
}

.stack-card--primary {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.4rem 1rem 1.2rem;
}

.stack-card__row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.stack-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.9rem;
  background: var(--soft-surface);
  box-shadow:
    inset 3px 3px 6px var(--soft-shadow),
    inset -3px -3px 6px var(--soft-highlight);
}

.stack-card__icon--lg {
  width: 3.75rem;
  height: 3.75rem;
  border-radius: 1.15rem;
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
  margin-bottom: 0.55rem;
}

.stack-card__name {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.stack-card--primary .stack-card__name {
  margin-top: 0.85rem;
  font-size: 1.05rem;
}

.stack-card__level {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--skill-color);
}

.stack-card__track {
  height: 0.55rem;
  border-radius: 999px;
  background: var(--soft-surface);
  box-shadow: inset 2px 2px 4px var(--soft-shadow), inset -2px -2px 4px var(--soft-highlight);
  overflow: hidden;
}

.stack-card--primary .stack-card__track {
  width: 100%;
  margin-top: 0.85rem;
}

.stack-card--primary .stack-card__level {
  margin-top: 0.5rem;
}

.stack-card__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--skill-color), color-mix(in srgb, var(--skill-color) 70%, white));
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
