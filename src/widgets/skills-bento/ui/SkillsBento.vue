<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { skills, skillGroups } from '@/entities/skill'
import { TechIcon } from '@/shared/ui/tech-icon'

const { t } = useI18n()

const palettes = ['gold', 'rose', 'teal', 'cream', 'coral', 'plum']

const groups = computed(() =>
  skillGroups
    .map((group) => ({
      ...group,
      label: t(group.labelKey),
      skills: skills
        .filter((s) => s.group === group.id)
        .map((skill, i) => ({
          ...skill,
          palette: skill.primary ? 'gold' : palettes[(i + group.id.length) % palettes.length],
        })),
    }))
    .filter((g) => g.skills.length),
)
</script>

<template>
  <div class="cabinet reveal">
    <section
      v-for="(group, gi) in groups"
      :key="group.id"
      class="salon"
      :class="`reveal-delay-${Math.min(gi + 1, 3)}`"
    >
      <p class="salon__label">
        <span aria-hidden="true">❧</span>
        {{ group.label }}
        <span aria-hidden="true">❧</span>
      </p>

      <div class="salon__wall">
        <article
          v-for="skill in group.skills"
          :key="skill.name"
          class="tile"
          :class="[`tile--${skill.palette}`, { 'tile--hero': skill.primary }]"
        >
          <span class="tile__frame" aria-hidden="true" />
          <span class="tile__corners" aria-hidden="true" />
          <span class="tile__level">{{ skill.level }}</span>
          <TechIcon :name="skill.icon" :size="skill.primary ? 36 : 22" />
          <h3 class="tile__name">{{ skill.name }}</h3>
          <p v-if="skill.primary" class="tile__mark">{{ $t('home.skills-primary-label') }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cabinet {
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  font-family: var(--maxi-font);
  color: var(--maxi-ink);
}

.salon__label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 0 0.95rem;
  font-family: var(--maxi-font-display);
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--maxi-gold);
}

.salon__label span {
  font-size: 1.1rem;
  letter-spacing: 0;
}

.salon__wall {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

@media (min-width: 40rem) {
  .salon__wall {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.8rem;
  }
}

@media (min-width: 64rem) {
  .salon__wall {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 7.2rem;
  padding: 0.85rem 0.8rem 0.75rem;
  overflow: hidden;
}

.tile--hero {
  min-height: 9.5rem;
}

@media (min-width: 40rem) {
  .tile--hero {
    grid-column: span 2;
    min-height: 8.5rem;
  }
}

.tile__frame {
  position: absolute;
  inset: 0.38rem;
  border: 1px solid currentColor;
  opacity: 0.35;
  pointer-events: none;
}

.tile__corners {
  position: absolute;
  inset: 0.18rem;
  pointer-events: none;
  background:
    linear-gradient(currentColor, currentColor) top left / 0.7rem 1px no-repeat,
    linear-gradient(currentColor, currentColor) top left / 1px 0.7rem no-repeat,
    linear-gradient(currentColor, currentColor) top right / 0.7rem 1px no-repeat,
    linear-gradient(currentColor, currentColor) top right / 1px 0.7rem no-repeat,
    linear-gradient(currentColor, currentColor) bottom left / 0.7rem 1px no-repeat,
    linear-gradient(currentColor, currentColor) bottom left / 1px 0.7rem no-repeat,
    linear-gradient(currentColor, currentColor) bottom right / 0.7rem 1px no-repeat,
    linear-gradient(currentColor, currentColor) bottom right / 1px 0.7rem no-repeat;
  opacity: 0.7;
}

.tile__level {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  font-family: var(--maxi-font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  opacity: 0.7;
}

.tile :deep(.tech-icon) {
  margin-bottom: 0.55rem;
  filter: drop-shadow(0 2px 0 rgba(0, 0, 0, 0.18));
}

.tile__name {
  margin: 0;
  font-family: var(--maxi-font-display);
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.tile--hero .tile__name {
  font-size: clamp(1.55rem, 3vw, 2.15rem);
  letter-spacing: -0.04em;
}

.tile__mark {
  margin: 0.4rem 0 0;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.72;
}

.tile--gold {
  background:
    radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.22), transparent 42%),
    linear-gradient(160deg, #f0c14b 0%, var(--maxi-gold) 55%, #b8862a 100%);
  color: #2a1608;
  box-shadow:
    0 0 0 3px var(--maxi-gold),
    0 0 0 6px #2a1608,
    0 18px 28px -16px rgba(224, 176, 74, 0.7);
}

.tile--rose {
  background:
    radial-gradient(circle at 20% 100%, rgba(255, 255, 255, 0.12), transparent 40%),
    linear-gradient(165deg, #e05a7f 0%, var(--maxi-rose) 100%);
  color: #fff4ea;
  box-shadow: 0 0 0 2px #f4c6d2;
}

.tile--teal {
  background:
    radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.16), transparent 38%),
    linear-gradient(155deg, #3dbeb0 0%, var(--maxi-teal) 100%);
  color: #06241f;
  box-shadow: 0 0 0 2px #8ee0d4;
}

.tile--cream {
  background:
    repeating-linear-gradient(
      -18deg,
      transparent,
      transparent 7px,
      rgba(139, 90, 43, 0.08) 7px,
      rgba(139, 90, 43, 0.08) 8px
    ),
    var(--maxi-cream);
  color: #4a1830;
  box-shadow: 0 0 0 2px var(--maxi-gold);
}

.tile--coral {
  background: linear-gradient(150deg, #f08a6e 0%, var(--maxi-coral) 100%);
  color: #2a100c;
  box-shadow: 0 0 0 2px #ffd2c4;
}

.tile--plum {
  background:
    radial-gradient(circle at 10% 10%, rgba(224, 176, 74, 0.28), transparent 36%),
    linear-gradient(170deg, #6a2444 0%, var(--maxi-plum) 100%);
  color: var(--maxi-cream);
  box-shadow: 0 0 0 2px var(--maxi-gold);
}

.tile:nth-child(3n) {
  transform: rotate(-1.6deg);
}

.tile:nth-child(5n) {
  transform: rotate(1.8deg);
}

.tile--hero {
  transform: rotate(-1.1deg);
  z-index: 1;
}

@media (hover: hover) {
  .tile:hover {
    transform: translateY(-4px) rotate(0deg) scale(1.03);
    z-index: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .tile--hero,
  .tile:nth-child(3n),
  .tile:nth-child(5n) {
    transform: none;
  }
}
</style>
