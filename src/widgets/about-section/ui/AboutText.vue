<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const lead = computed(() => t('home.about.p1'))
</script>

<template>
  <section id="about" class="about page-section">
    <div class="about__sheet">
      <p class="about__kicker reveal">{{ $t('home.about-kicker') }}</p>
      <h2 class="about__title reveal">{{ $t('home.about-title') }}</h2>
      <hr class="about__hr" />

      <div class="about__body reveal reveal-delay-1">
        <figure class="about__figure reveal reveal-delay-2">
          <picture>
            <source srcset="/Image-400.webp 400w" sizes="(min-width: 64rem) 280px, 40vw" type="image/webp" />
            <img
              src="/Image-400.webp"
              alt=""
              class="about__photo"
              width="400"
              height="480"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <figcaption class="about__caption">{{ $t('home.about-figcaption') }}</figcaption>
        </figure>

        <p class="about__lead">{{ lead }}</p>

        <p class="about__p">
          {{ $t('home.about.p2Before') }}<em>{{ $t('home.about.p2Role') }}</em>{{ $t('home.about.p2After') }}
        </p>

        <hr class="about__hr about__hr--short" />

        <p class="about__p about__p--quote">{{ $t('home.about.p3') }}</p>

        <p class="about__p">{{ $t('home.about.p4') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  background: var(--about-bg);
  color: var(--about-ink);
  font-family: var(--about-font-body);
}

.about__sheet {
  width: 100%;
  max-width: 46rem;
  margin-inline: auto;
  padding: clamp(3.5rem, 8vw, 6.5rem) 1.25rem;
  box-sizing: border-box;
  background: var(--about-paper);
  border-left: 1px solid var(--about-rule);
  border-right: 1px solid var(--about-rule);
}

.about__kicker {
  margin: 0;
  font-family: var(--about-font-meta);
  font-size: 0.95rem;
  color: var(--about-accent);
  text-decoration: underline;
}

.about__title {
  margin: 0.85rem 0 0;
  font-family: var(--about-font-display);
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 600;
  line-height: 1.2;
  color: var(--about-ink);
}

.about__hr {
  margin: 1.1rem 0 1.35rem;
  border: 0;
  border-top: 2px solid var(--about-ink);
  border-bottom: 1px solid var(--about-rule);
  height: 4px;
  background: transparent;
}

.about__hr--short {
  width: 8rem;
  margin-inline: 0;
}

.about__body {
  overflow: hidden;
  font-size: 1.0625rem;
  line-height: 1.65;
}

.about__figure {
  float: right;
  width: min(16rem, 42%);
  margin: 0.15rem 0 1rem 1.25rem;
}

.about__photo {
  display: block;
  width: 100%;
  height: auto;
  border: 2px solid var(--about-ink);
  background: var(--about-paper);
}

.about__caption {
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  font-style: italic;
  color: var(--about-muted);
}

.about__lead,
.about__p {
  margin: 0 0 1rem;
}

.about__p {
  color: var(--about-muted);
}

.about__p em {
  font-style: italic;
  font-weight: 600;
  color: var(--about-ink);
}

.about__p--quote {
  color: var(--about-ink);
  font-style: italic;
}

@media (max-width: 39.99rem) {
  .about__figure {
    float: none;
    width: min(18rem, 100%);
    margin: 0 0 1.25rem;
  }
}
</style>
