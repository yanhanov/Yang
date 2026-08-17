<template>
  <section id="about" class="about" data-era-panel>
    <div class="about__sheet">
      <p class="about__kicker reveal">{{ $t('home.about-kicker') }}</p>
      <h2 class="about__title reveal">{{ $t('home.about-title') }}</h2>
      <hr class="about__hr" />

      <div class="about__body reveal reveal-delay-1">
        <p class="about__lead">{{ $t('home.about.p1') }}</p>

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
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--about-bg);
  color: var(--about-ink);
  font-family: var(--about-font-body);
}

.about__sheet {
  width: 100%;
  max-width: 42rem;
  margin-inline: auto;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: safe center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5.5rem 1.25rem 3rem;
  box-sizing: border-box;
  background: var(--about-paper);
  border-left: 1px solid var(--about-rule);
  border-right: 1px solid var(--about-rule);
}

@media (max-width: 47.99rem) {
  .about {
    height: auto;
    max-height: none;
    min-height: 100dvh;
    overflow: visible;
  }

  .about__sheet {
    overflow: visible;
    justify-content: flex-start;
    padding-top: 5rem;
    padding-bottom: 4.5rem;
  }
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
  font-size: 1.0625rem;
  line-height: 1.7;
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
</style>
