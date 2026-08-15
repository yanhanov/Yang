<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const lead = computed(() => t('home.about.p1'))
const drop = computed(() => lead.value.trim().charAt(0))
const leadRest = computed(() => lead.value.trim().slice(1))
</script>

<template>
  <section id="about" class="about page-section">
    <div class="about__sheet">
      <header class="about__masthead reveal">
        <p class="about__kicker">{{ $t('home.about-kicker') }}</p>
        <div class="about__rule" aria-hidden="true" />
        <h2 class="about__title">{{ $t('home.about-title') }}</h2>
      </header>

      <div class="about__layout">
        <article class="about__article reveal reveal-delay-1">
          <p class="about__lead">
            <span class="about__drop" aria-hidden="true">{{ drop }}</span>
            <span class="about__lead-text">{{ leadRest }}</span>
          </p>

          <p class="about__p">
            {{ $t('home.about.p2Before') }}<em class="about__em">{{ $t('home.about.p2Role') }}</em
            >{{ $t('home.about.p2After') }}
          </p>

          <blockquote class="about__quote">
            <p>{{ $t('home.about.p3') }}</p>
          </blockquote>

          <p class="about__p">{{ $t('home.about.p4') }}</p>
        </article>

        <figure class="about__figure reveal reveal-delay-2">
          <picture>
            <source srcset="/Image-400.webp 400w" sizes="(min-width: 64rem) 360px, 100vw" type="image/webp" />
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
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  --about-pad: clamp(3.5rem, 8vw, 7rem);
  position: relative;
  background: var(--about-bg);
  color: var(--about-ink);
  font-family: var(--about-font-body);
}

.about__sheet {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding: var(--about-pad) 1.25rem;
  box-sizing: border-box;
}

.about__masthead {
  max-width: 40rem;
}

.about__kicker {
  margin: 0;
  font-family: var(--about-font-meta);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--about-accent);
}

.about__rule {
  width: 3.5rem;
  height: 1px;
  margin: 1rem 0 1.25rem;
  background: var(--about-rule);
}

.about__title {
  margin: 0;
  font-family: var(--about-font-display);
  font-size: clamp(2.75rem, 7vw, 4.75rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--about-ink);
}

.about__layout {
  display: grid;
  gap: 3rem;
  margin-top: 3rem;
  align-items: start;
}

@media (min-width: 64rem) {
  .about__layout {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.75fr);
    gap: 4.5rem;
    margin-top: 4rem;
  }
}

.about__article {
  max-width: 38rem;
}

.about__lead {
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.45rem);
  line-height: 1.55;
  letter-spacing: -0.01em;
  color: var(--about-ink);
}

.about__drop {
  float: left;
  margin: 0.1rem 0.55rem 0 0;
  font-family: var(--about-font-display);
  font-size: 4.75rem;
  font-weight: 600;
  line-height: 0.8;
  color: var(--about-accent);
}

.about__lead-text {
  display: inline;
}

.about__p {
  margin: 1.5rem 0 0;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: var(--about-muted);
}

.about__em {
  font-style: italic;
  font-weight: 600;
  color: var(--about-ink);
}

.about__quote {
  position: relative;
  margin: 2.25rem 0;
  padding: 0 0 0 1.25rem;
  border-left: 2px solid var(--about-accent);
}

.about__quote p {
  margin: 0;
  font-family: var(--about-font-display);
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-style: italic;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.015em;
  color: var(--about-ink);
}

.about__figure {
  margin: 0;
  padding: 0.85rem;
  background: var(--about-paper);
  border: 1px solid var(--about-rule);
}

.about__photo {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(0.15) contrast(1.04);
}

.about__caption {
  margin: 0.75rem 0 0;
  font-family: var(--about-font-meta);
  font-size: 0.75rem;
  line-height: 1.45;
  letter-spacing: 0.02em;
  color: var(--about-muted);
}

@media (max-width: 63.99rem) {
  .about__figure {
    max-width: 22rem;
  }

  .about__drop {
    font-size: 3.75rem;
  }
}
</style>
