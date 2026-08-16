<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { TechIcon } from '@/shared/ui/tech-icon'
import { services, techLabels } from '@/entities/service'
import { useScrollFrame } from '@/shared/lib'

const { t, tm } = useI18n()
const root = ref(null)

function tagsFor(key) {
  const value = tm(`home.whatido.${key}.tags`)
  return Array.isArray(value) ? value : []
}

useScrollFrame(() => {
  if (window.matchMedia('(max-width: 47.99rem)').matches) return
  const el = root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const y = (window.innerHeight * 0.5 - (r.top + r.height * 0.5)) / window.innerHeight
  el.style.setProperty('--p', y.toFixed(3))
})
</script>

<template>
  <div ref="root" class="story reveal">
    <div class="story__far" aria-hidden="true" />
    <div class="story__near" aria-hidden="true" />

    <article
      v-for="(item, i) in services"
      :key="item.key"
      class="scene"
      :class="`reveal-delay-${Math.min(i + 1, 4)}`"
    >
      <span class="scene__n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
      <h3 class="scene__title">{{ t(`home.whatido.${item.key}.title`) }}</h3>
      <p class="scene__text">{{ t(`home.whatido.${item.key}.text`) }}</p>
      <ul class="scene__tags">
        <li v-for="tag in tagsFor(item.key)" :key="tag">{{ tag }}</li>
      </ul>
      <ul class="scene__tech">
        <li v-for="tech in item.tech" :key="tech">
          <TechIcon :name="tech" :size="14" />
          <span>{{ techLabels[tech] }}</span>
        </li>
      </ul>
    </article>
  </div>
</template>

<style scoped>
.story {
  --p: 0;
  position: relative;
  display: grid;
  gap: 0.85rem;
  font-family: var(--para-font);
  color: var(--para-ink);
}

@media (min-width: 48rem) {
  .story {
    grid-template-columns: 1fr 1fr;
  }
}

.story__far,
.story__near {
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(2px);
}

@media (max-width: 47.99rem) {
  .story__far,
  .story__near {
    display: none;
  }
}

.story__far {
  width: 18rem;
  height: 18rem;
  top: -4rem;
  right: -3rem;
  background: radial-gradient(circle, rgba(255, 107, 26, 0.28), transparent 68%);
  transform: translate3d(0, calc(var(--p) * -48px), 0);
}

.story__near {
  width: 14rem;
  height: 14rem;
  bottom: -2rem;
  left: -2rem;
  background: radial-gradient(circle, rgba(62, 207, 207, 0.22), transparent 68%);
  transform: translate3d(0, calc(var(--p) * 32px), 0);
}

.scene {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  min-height: 14.5rem;
  padding: 1.35rem 1.2rem 1.15rem;
  background: rgba(10, 12, 16, 0.55);
  border: 1px solid rgba(244, 239, 230, 0.08);
}

.scene__n {
  position: absolute;
  right: 0.4rem;
  top: -0.35rem;
  font-size: clamp(4.5rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(244, 239, 230, 0.14);
  transform: translate3d(0, calc(var(--p) * 28px), 0);
  pointer-events: none;
}

.scene__title {
  position: relative;
  margin: 0;
  max-width: 12rem;
  font-size: 1.65rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.scene__text {
  position: relative;
  margin: 0;
  max-width: 26rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--para-muted);
}

.scene__tags,
.scene__tech {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.scene__tags li,
.scene__tech li {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--para-muted);
}

.scene__tags li {
  color: var(--para-accent);
}

.scene__tech {
  margin-top: auto;
  padding-top: 0.4rem;
}

@media (prefers-reduced-motion: reduce) {
  .story__far,
  .story__near,
  .scene__n {
    transform: none;
  }
}
</style>
