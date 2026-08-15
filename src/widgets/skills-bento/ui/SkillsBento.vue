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
</script>

<template>
  <div class="table reveal">
    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="table__group"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <p class="table__label">
        <span>{{ group.number }}</span>
        {{ group.label.replace(/^\/\/\s*/, '') }}
      </p>
      <div class="table__grid">
        <article
          v-for="skill in group.skills"
          :key="skill.name"
          class="element"
          :class="{ 'element--core': skill.primary }"
        >
          <span class="element__n">{{ skill.level }}</span>
          <span class="element__symbol">{{ skill.symbol }}</span>
          <span class="element__name">{{ skill.name }}</span>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  gap: 1.85rem;
  font-family: var(--lab-font);
  color: var(--lab-ink);
}

.table__label {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
  margin: 0 0 0.75rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--lab-muted);
}

.table__label span {
  color: var(--lab-accent);
}

.table__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.45rem;
}

@media (min-width: 40rem) {
  .table__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.55rem;
  }
}

@media (min-width: 64rem) {
  .table__grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}

.element {
  position: relative;
  display: flex;
  flex-direction: column;
  aspect-ratio: 1;
  min-height: 5.5rem;
  padding: 0.4rem 0.4rem 0.45rem;
  background: var(--lab-green);
  color: #dce6d4;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
}

.element--core {
  background: var(--lab-accent);
  color: #111;
  box-shadow: 0 8px 18px -12px rgba(241, 196, 15, 0.7);
}

.element__n {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  opacity: 0.72;
}

.element--core .element__n {
  opacity: 0.9;
}

.element__symbol {
  margin-top: auto;
  font-size: clamp(1.55rem, 3vw, 2rem);
  font-weight: 800;
  line-height: 0.85;
  letter-spacing: -0.05em;
  text-transform: none;
}

.element__name {
  margin-top: 0.35rem;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1.2;
  opacity: 0.78;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (hover: hover) {
  .element:hover {
    transform: translateY(-2px);
  }

  .element--core:hover {
    filter: brightness(1.05);
  }
}
</style>
