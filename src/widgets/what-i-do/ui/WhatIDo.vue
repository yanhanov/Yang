<script setup>
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'
import { services, techLabels } from '@/entities/service'

const { t, tm } = useI18n()

function tagsFor(key) {
  const value = tm(`home.whatido.${key}.tags`)
  return Array.isArray(value) ? value : []
}
</script>

<template>
  <div class="whatido reveal">
    <div class="whatido__bento">
      <article
        v-for="(item, i) in services"
        :key="item.key"
        class="whatido-card glass-card"
        :class="[`whatido-card--${item.key}`, `reveal-delay-${Math.min(i + 1, 4)}`]"
        :style="{ '--card-color': item.color }"
      >
        <div class="whatido-card__accent" aria-hidden="true" />
        <div class="whatido-card__glow" aria-hidden="true" />
        <span class="whatido-card__watermark secont-font" aria-hidden="true">
          {{ String(i + 1).padStart(2, '0') }}
        </span>

        <header class="whatido-card__head">
          <p class="whatido-card__label base-font">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="whatido-card__title secont-font">
            {{ t(`home.whatido.${item.key}.title`) }}
          </h3>
        </header>

        <p class="whatido-card__text">{{ t(`home.whatido.${item.key}.text`) }}</p>

        <ul class="whatido-card__tags">
          <li v-for="tag in tagsFor(item.key)" :key="tag" class="whatido-card__tag base-font">
            {{ tag }}
          </li>
        </ul>

        <ul class="whatido-card__tech" :aria-label="t(`home.whatido.${item.key}.title`)">
          <li v-for="tech in item.tech" :key="tech" class="whatido-card__pill">
            <TechIcon :name="tech" :size="16" />
            <span class="whatido-card__pill-label base-font">{{ techLabels[tech] }}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.whatido__bento {
  display: grid;
  gap: 1rem;
}

@media (min-width: 48rem) {
  .whatido__bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

@media (min-width: 64rem) {
  .whatido__bento {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  .whatido-card--frontend {
    grid-column: span 6;
  }

  .whatido-card--backend {
    grid-column: span 6;
  }

  .whatido-card--multiplatform {
    grid-column: span 4;
  }

  .whatido-card--e2e {
    grid-column: span 8;
  }
}

.whatido-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 15rem;
  padding: 1.375rem 1.25rem 1.125rem;
  transition:
    border-color 0.22s ease,
    transform 0.22s ease,
    box-shadow 0.22s ease;
}

.whatido-card__accent {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(
    180deg,
    var(--card-color),
    color-mix(in srgb, var(--card-color) 20%, transparent)
  );
  opacity: 0.85;
}

.whatido-card__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 12% 0%,
    color-mix(in srgb, var(--card-color) 18%, transparent),
    transparent 58%
  );
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.whatido-card__watermark {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  font-size: clamp(3.5rem, 8vw, 4.75rem);
  font-weight: 500;
  line-height: 1;
  color: var(--card-color);
  opacity: 0.055;
  pointer-events: none;
  user-select: none;
}

.whatido-card:hover,
.whatido-card:focus-within {
  border-color: color-mix(in srgb, var(--card-color) 44%, transparent);
  transform: translateY(-3px);
  box-shadow: 0 20px 56px -28px color-mix(in srgb, var(--card-color) 36%, transparent);
}

.whatido-card:hover .whatido-card__glow,
.whatido-card:focus-within .whatido-card__glow {
  opacity: 1;
}

.whatido-card__head {
  position: relative;
  z-index: 1;
}

.whatido-card__label {
  margin-bottom: 0.375rem;
  font-size: 0.625rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--card-color);
  opacity: 0.72;
}

.whatido-card__title {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.2;
  transition: color 0.2s ease;
}

.whatido-card:hover .whatido-card__title,
.whatido-card:focus-within .whatido-card__title {
  color: var(--card-color);
}

.whatido-card__text {
  position: relative;
  z-index: 1;
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.whatido-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  z-index: 1;
}

.whatido-card__tag {
  padding: 0.3125rem 0.625rem;
  border-radius: 999px;
  font-size: 0.625rem;
  letter-spacing: 0.04em;
  color: color-mix(in srgb, var(--card-color) 78%, var(--text));
  background: color-mix(in srgb, var(--card-color) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--card-color) 18%, transparent);
}

.whatido-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4375rem;
  margin: 0;
  padding: 0.75rem 0 0;
  list-style: none;
  border-top: 1px solid color-mix(in srgb, var(--border) 75%, transparent);
  position: relative;
  z-index: 1;
}

.whatido-card__pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3125rem 0.5625rem 0.3125rem 0.4375rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--surface) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  transition: border-color 0.2s ease;
}

.whatido-card__pill-label {
  font-size: 0.625rem;
  letter-spacing: 0.03em;
  color: var(--text-muted);
}

.whatido-card:hover .whatido-card__pill,
.whatido-card:focus-within .whatido-card__pill {
  border-color: color-mix(in srgb, var(--card-color) 30%, var(--border));
}

.whatido-card:hover .whatido-card__pill-label,
.whatido-card:focus-within .whatido-card__pill-label {
  color: var(--text);
}

@media (prefers-reduced-motion: reduce) {
  .whatido-card,
  .whatido-card__pill {
    transition: none;
  }

  .whatido-card:hover,
  .whatido-card:focus-within {
    transform: none;
  }
}
</style>
