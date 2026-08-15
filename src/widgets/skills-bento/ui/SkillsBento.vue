<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skills, skillGroups } from '@/entities/skill'

const { t } = useI18n()

const groups = computed(() =>
  skillGroups
    .map((group) => ({
      ...group,
      label: t(group.labelKey),
      skills: skills.filter((s) => s.group === group.id),
    }))
    .filter((g) => g.skills.length),
)

function sizeFor(level) {
  return `${0.78 + (level / 100) * 1.05}rem`
}
</script>

<template>
  <div class="cloud reveal">
    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="cloud__group"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <p class="cloud__label">{{ group.label }}</p>
      <div class="cloud__tags">
        <span
          v-for="skill in group.skills"
          :key="skill.name"
          class="tag"
          :class="{ 'tag--core': skill.primary }"
          :style="{ fontSize: sizeFor(skill.level) }"
        >
          {{ skill.name }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cloud {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: var(--web2-font);
  color: var(--web2-ink);
}

.cloud__label {
  margin: 0 0 0.7rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--web2-muted);
}

.cloud__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem 0.65rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.8rem 0.45rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  background: linear-gradient(#ffffff, #d7e8f5);
  box-shadow:
    inset 0 1px 0 #fff,
    0 1px 2px rgba(43, 90, 130, 0.18);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #2a5f86;
  line-height: 1.1;
}

.tag--core {
  background: linear-gradient(#7ec8f8, var(--web2-accent) 48%, #2176b8);
  color: #fff;
  text-shadow: 0 1px 0 rgba(0, 40, 80, 0.25);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.55),
    0 3px 0 #1a5f96,
    0 6px 10px rgba(43, 90, 130, 0.25);
}

@media (hover: hover) {
  .tag:hover {
    filter: brightness(1.05);
  }
}
</style>
