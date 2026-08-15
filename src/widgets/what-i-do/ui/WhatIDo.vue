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
    <div class="whatido__grid">
      <article
        v-for="(item, i) in services"
        :key="item.key"
        class="whatido-card"
        :class="[`whatido-card--${item.key}`, `reveal-delay-${Math.min(i + 1, 4)}`]"
        :style="{ '--card-color': item.color }"
      >
        <div class="whatido-card__shape" aria-hidden="true" />
        <header class="whatido-card__head">
          <p class="whatido-card__label">{{ String(i + 1).padStart(2, '0') }}</p>
          <h3 class="whatido-card__title">{{ t(`home.whatido.${item.key}.title`) }}</h3>
        </header>
        <p class="whatido-card__text">{{ t(`home.whatido.${item.key}.text`) }}</p>
        <ul class="whatido-card__tags">
          <li v-for="tag in tagsFor(item.key)" :key="tag">{{ tag }}</li>
        </ul>
        <ul class="whatido-card__tech">
          <li v-for="tech in item.tech" :key="tech">
            <TechIcon :name="tech" :size="14" />
            <span>{{ techLabels[tech] }}</span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.whatido {
  font-family: var(--bauhaus-font);
  color: var(--bauhaus-ink);
}

.whatido__grid {
  display: grid;
  gap: 0;
  border: 2px solid var(--bauhaus-ink);
}

@media (min-width: 48rem) {
  .whatido__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 64rem) {
  .whatido__grid {
    grid-template-columns: repeat(12, 1fr);
  }

  .whatido-card--frontend {
    grid-column: span 6;
  }

  .whatido-card--backend {
    grid-column: span 6;
  }

  .whatido-card--multiplatform {
    grid-column: span 5;
  }

  .whatido-card--e2e {
    grid-column: span 7;
  }
}

.whatido-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-height: 14rem;
  padding: 1.35rem 1.25rem 1.15rem;
  background: #fff;
  border-bottom: 2px solid var(--bauhaus-ink);
  overflow: hidden;
}

@media (min-width: 48rem) {
  .whatido-card {
    border-right: 2px solid var(--bauhaus-ink);
  }

  .whatido-card:nth-child(2n) {
    border-right: none;
  }
}

@media (min-width: 64rem) {
  .whatido-card {
    border-right: 2px solid var(--bauhaus-ink);
  }

  .whatido-card--backend,
  .whatido-card--e2e {
    border-right: none;
  }

  .whatido-card--multiplatform,
  .whatido-card--e2e {
    border-bottom: none;
  }
}

.whatido-card__shape {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.75rem;
  height: 2.75rem;
  background: var(--card-color);
}

.whatido-card--frontend .whatido-card__shape {
  border-radius: 50%;
}

.whatido-card--backend .whatido-card__shape {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.whatido-card--multiplatform .whatido-card__shape {
  transform: rotate(45deg) scale(0.85);
}

.whatido-card--e2e .whatido-card__shape {
  width: 2.4rem;
  height: 2.4rem;
}

.whatido-card__label {
  margin: 0;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--card-color);
}

.whatido-card--backend .whatido-card__label {
  color: var(--bauhaus-ink);
}

.whatido-card__title {
  margin: 0.35rem 0 0;
  max-width: 12rem;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.whatido-card__text {
  margin: 0;
  max-width: 28rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--bauhaus-muted);
}

.whatido-card__tags,
.whatido-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.whatido-card__tags li,
.whatido-card__tech li {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.45rem;
  border: 1.5px solid var(--bauhaus-ink);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.whatido-card__tech {
  margin-top: auto;
  padding-top: 0.5rem;
}

.whatido-card__tech li {
  background: var(--bauhaus-bg);
}
</style>
