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
        class="leather"
        :class="`reveal-delay-${Math.min(i + 1, 4)}`"
      >
        <p class="leather__no">{{ String(i + 1).padStart(2, '0') }}</p>
        <h3 class="leather__title">{{ t(`home.whatido.${item.key}.title`) }}</h3>
        <p class="leather__text">{{ t(`home.whatido.${item.key}.text`) }}</p>
        <ul class="leather__tags">
          <li v-for="tag in tagsFor(item.key)" :key="tag">{{ tag }}</li>
        </ul>
        <ul class="leather__tech">
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
  font-family: var(--skeuo-font);
  color: var(--skeuo-ink);
}

.whatido__grid {
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 48rem) {
  .whatido__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.leather {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-height: 16rem;
  padding: 1.35rem 1.25rem 1.2rem;
  background:
    radial-gradient(circle at 20% 0%, rgba(255, 255, 255, 0.35), transparent 46%),
    linear-gradient(180deg, #f7ead4 0%, var(--skeuo-paper) 55%, #e2d0b4 100%);
  border-radius: 0.7rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -2px 0 rgba(90, 60, 30, 0.12),
    0 1px 0 rgba(255, 255, 255, 0.35),
    0 10px 18px rgba(60, 40, 20, 0.28);
}

.leather::before {
  content: '';
  position: absolute;
  inset: 0.55rem;
  border: 1.5px dashed color-mix(in srgb, var(--skeuo-leather) 45%, transparent);
  border-radius: 0.45rem;
  pointer-events: none;
}

.leather__no,
.leather__title,
.leather__text,
.leather__tags,
.leather__tech {
  position: relative;
}

.leather__no {
  margin: 0;
  font-family: var(--skeuo-font);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: var(--skeuo-leather);
}

.leather__title {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 600;
  line-height: 1.15;
}

.leather__text {
  margin: 0;
  font-family: 'Onest', system-ui, sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--skeuo-muted);
}

.leather__tags,
.leather__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.leather__tags li,
.leather__tech li {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.28rem 0.5rem;
  border-radius: 0.35rem;
  background: linear-gradient(#fff6e8, #ead7b8);
  box-shadow:
    inset 0 1px 0 #fff,
    0 1px 2px rgba(80, 50, 20, 0.2);
  font-family: 'Onest', system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
}

.leather__tech {
  margin-top: auto;
  padding-top: 0.35rem;
}
</style>
