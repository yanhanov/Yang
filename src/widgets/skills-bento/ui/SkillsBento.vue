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
  <div class="garden reveal">
    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="bed"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <h3 class="bed__name">{{ group.label }}</h3>
      <ol class="bed__list">
        <li
          v-for="skill in group.skills"
          :key="skill.name"
          class="leaf"
          :class="{ 'leaf--core': skill.primary }"
        >
          <span class="leaf__name">{{ skill.name }}</span>
          <span class="leaf__lead" aria-hidden="true" />
          <span class="leaf__by">{{ skill.primary ? t('home.skills-primary-label') : group.label }}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.garden {
  display: grid;
  gap: 1.35rem 2.25rem;
  color: var(--web2-ink);
  font-family: var(--web2-font);
}

@media (min-width: 48rem) {
  .garden {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.bed__name {
  margin: 0 0 0.7rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--web2-rule);
  font-size: 1.05rem;
  font-weight: 500;
  font-style: italic;
  letter-spacing: -0.02em;
  color: var(--web2-accent);
}

.bed__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.leaf {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  padding: 0.28rem 0;
  font-size: 0.92rem;
  line-height: 1.35;
}

.leaf__name {
  flex: 0 1 auto;
  letter-spacing: -0.02em;
}

.leaf--core .leaf__name {
  font-style: italic;
  color: var(--web2-accent);
}

.leaf__lead {
  flex: 1;
  min-width: 1.25rem;
  border-bottom: 1px dotted var(--web2-rule);
  transform: translateY(-0.28em);
}

.leaf__by {
  flex: 0 0 auto;
  font-size: 0.68rem;
  font-style: italic;
  letter-spacing: 0.04em;
  color: var(--web2-muted);
}

@media (hover: hover) {
  .leaf:hover .leaf__name {
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
}
</style>
