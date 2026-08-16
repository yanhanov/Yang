<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal, usePageSeo, useEraDeck } from '@/shared/lib'
import { SITE_NAME, SITE_URL, SITE_DEFAULT_IMAGE, absoluteUrl } from '@/shared/config/site'
import { featuredProjects, WorkProjectCard } from '@/entities/project'
import { HeroSection } from '@/widgets/hero'
import { SkillsBento } from '@/widgets/skills-bento'
import { ExperienceTimeline } from '@/widgets/experience-timeline'
import { ProcessSteps } from '@/widgets/process-steps'
import { LanguagesSection } from '@/widgets/languages-section'
import { AboutText } from '@/widgets/about-section'
import { WhatIDo } from '@/widgets/what-i-do'
import { EraStamp } from '@/widgets/era-stamp'
import { SiteFooter } from '@/widgets/site-footer'

useScrollReveal()
useEraDeck()

const { t, locale } = useI18n()

usePageSeo(() => {
  const title = t('seo.title')
  const description = t('seo.description')

  return {
    title,
    description,
    keywords: t('seo.keywords'),
    path: '/',
    image: SITE_DEFAULT_IMAGE,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Yan Hanov',
      alternateName: ['Ян Ханов'],
      jobTitle: ['Frontend Developer', 'Full-Stack Developer', 'Middle Software Engineer'],
      description,
      url: SITE_URL + '/',
      email: 'yanhanow@gmail.com',
      image: absoluteUrl(SITE_DEFAULT_IMAGE),
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ashgabat',
        addressCountry: 'TM',
      },
      sameAs: [
        'https://github.com/yanhanov',
        'https://linkedin.com/in/yanhanov',
        'https://t.me/yanhanov',
        'https://www.instagram.com/yanhanow/',
      ],
      knowsAbout: [
        'Frontend Development',
        'Full Stack Development',
        'Vue.js',
        'React',
        'TypeScript',
        'Node.js',
        'Flutter',
        'React Native',
      ],
      knowsLanguage: locale.value === 'ru' ? ['Русский', 'English'] : ['Russian', 'English'],
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  }
})
</script>

<template>
  <EraStamp />
  <HeroSection />
  <AboutText />

  <section id="experience" class="zone zone--exp" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--exp reveal">
        <p class="zone__kicker">1996 · Tables</p>
        <h2 class="zone__title">{{ $t('home.experience-title') }}</h2>
        <p class="zone__sub">{{ $t('home.experience-sub') }}</p>
      </header>
      <ExperienceTimeline />
    </div>
  </section>

  <section id="projects" class="zone zone--y2k" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--y2k reveal">
        <p class="zone__kicker">2000 · Y2K</p>
        <h2 class="zone__title">{{ $t('home.work-title') }}</h2>
        <p class="zone__sub">{{ $t('home.work-sub') }}</p>
      </header>
      <div class="projects-showcase reveal reveal-delay-1">
        <WorkProjectCard
          v-for="(item, i) in featuredProjects"
          :key="item.id"
          :project="item"
          :index="i"
        />
      </div>
      <div class="zone__action reveal reveal-delay-2">
        <RouterLink to="/projects" class="y2k-link">
          {{ $t('home.view-all-projects') }} →
        </RouterLink>
      </div>
    </div>
  </section>

  <section id="skills" class="zone zone--web2" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--web2 reveal">
        <p class="zone__kicker">2005 · Zen Garden</p>
        <h2 class="zone__title">{{ $t('home.skills') }}</h2>
        <p class="zone__sub">{{ $t('home.skills-sub') }}</p>
      </header>
      <SkillsBento />
    </div>
  </section>

  <section id="what-i-do" class="zone zone--para" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--para reveal">
        <p class="zone__kicker">2011 · Parallax</p>
        <h2 class="zone__title">{{ $t('home.whatido-title') }}</h2>
        <p class="zone__sub">{{ $t('home.whatido-sub') }}</p>
      </header>
      <WhatIDo />
    </div>
  </section>

  <section id="languages" class="zone zone--flat" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--flat reveal">
        <p class="zone__kicker">2013 · Flat</p>
        <h2 class="zone__title">{{ $t('home.languages-title') }}</h2>
        <p class="zone__sub">{{ $t('home.languages-sub') }}</p>
      </header>
      <LanguagesSection />
    </div>
  </section>

  <section id="process" class="zone zone--glass" data-era-panel>
    <div class="zone__inner">
      <header class="zone__head zone__head--glass reveal">
        <p class="zone__kicker">2020 · Glass</p>
        <h2 class="zone__title">{{ $t('home.process-title') }}</h2>
        <p class="zone__sub">{{ $t('home.process-sub') }}</p>
      </header>
      <ProcessSteps />
    </div>
  </section>

  <section id="contact" class="zone zone--now" data-era-panel>
    <div class="zone__inner zone__inner--now">
      <div class="now reveal">
        <p class="zone__kicker">2026 · Now</p>
        <h2 class="now__title">{{ $t('home.cta-title') }}</h2>
        <p class="now__text">{{ $t('home.cta-text') }}</p>
        <div class="now__actions">
          <a
            href="https://t.me/yanhanov"
            target="_blank"
            rel="noopener noreferrer"
            class="now__btn"
          >
            {{ $t('home.cta-btn') }}
          </a>
          <a href="mailto:yanhanow@gmail.com" class="now__btn now__btn--ghost">
            yanhanow@gmail.com
          </a>
        </div>
      </div>
      <SiteFooter />
    </div>
  </section>
</template>

<style scoped>
.zone {
  position: relative;
  height: 100dvh;
  max-height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.zone__inner {
  width: 100%;
  max-width: 1140px;
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
}

@media (max-width: 47.99rem) {
  .zone {
    height: auto;
    max-height: none;
    min-height: 100dvh;
    overflow: visible;
  }

  .zone__inner {
    overflow: visible;
    justify-content: flex-start;
    padding-top: 5rem;
    padding-bottom: 4.5rem;
  }
}

.zone__head {
  margin-bottom: 2.25rem;
}

.zone__kicker {
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.zone__title {
  margin: 0;
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.zone__sub {
  margin: 0.75rem 0 0;
  max-width: 32rem;
  font-size: 1rem;
  line-height: 1.55;
}

.zone__action {
  margin-top: 2rem;
}

/* 1996 — Win98 / tables */
.zone--exp {
  background: var(--exp-bg);
  color: var(--exp-ink);
  font-family: var(--exp-font);
}

.zone--exp .zone__inner {
  overflow: hidden;
  justify-content: flex-start;
  padding-top: 4.75rem;
  padding-bottom: 1.5rem;
}

@media (max-width: 47.99rem) {
  .zone--exp .zone__inner {
    overflow: visible;
    padding-top: 5rem;
    padding-bottom: 4.5rem;
  }

  .zone--para {
    overflow: visible;
  }

  .zone--para::before,
  .zone--para::after,
  .zone--web2::before {
    display: none;
  }
}

.zone--exp .zone__head {
  margin-bottom: 1rem;
  flex: none;
}

.zone__head--exp {
  padding: 0.55rem 0.7rem 0.65rem;
  background: var(--exp-surface);
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
}

.zone__head--exp .zone__kicker {
  color: var(--exp-accent);
}

.zone__head--exp .zone__title {
  font-size: clamp(1.55rem, 3.8vw, 2.35rem);
  font-weight: 700;
}

.zone__head--exp .zone__sub {
  margin-top: 0.4rem;
  font-size: 0.9rem;
  color: var(--exp-muted);
}

/* 2000 — Y2K */
.zone--y2k {
  background:
    radial-gradient(circle at 18% 8%, rgba(255, 43, 214, 0.18), transparent 34%),
    radial-gradient(circle at 92% 78%, rgba(57, 243, 255, 0.12), transparent 32%),
    var(--y2k-bg);
  color: var(--y2k-ink);
  font-family: var(--y2k-font);
}

.zone__head--y2k .zone__kicker {
  color: var(--y2k-cyan);
}

.zone__head--y2k .zone__title {
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--y2k-ink);
}

.zone__head--y2k .zone__sub {
  color: var(--y2k-muted);
}

.projects-showcase {
  display: grid;
  gap: 0.75rem;
}

@media (min-width: 48rem) {
  .projects-showcase {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.y2k-link {
  display: inline-flex;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--y2k-cyan);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--y2k-cyan);
}

.y2k-link:hover {
  background: var(--y2k-cyan);
  color: var(--y2k-bg);
}

/* 2005 — CSS Zen Garden / Web Standards */
.zone--web2 {
  color: var(--web2-ink);
  font-family: var(--web2-font);
  background:
    radial-gradient(ellipse 70% 45% at 100% 0%, rgba(138, 59, 18, 0.07), transparent 52%),
    linear-gradient(180deg, var(--web2-paper), var(--web2-bg));
}

.zone--web2::before {
  content: '';
  position: absolute;
  width: min(22rem, 48vw);
  height: min(22rem, 48vw);
  right: 3%;
  top: 12%;
  border: 1px solid var(--web2-rule);
  border-radius: 50%;
  pointer-events: none;
}

.zone__head--web2 {
  max-width: 36rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--web2-rule);
}

.zone__head--web2 .zone__kicker {
  font-style: italic;
  letter-spacing: 0.16em;
  color: var(--web2-accent);
}

.zone__head--web2 .zone__title {
  font-weight: 600;
  letter-spacing: -0.04em;
}

.zone__head--web2 .zone__sub {
  max-width: 28rem;
  font-style: italic;
  color: var(--web2-muted);
}

/* 2011 — parallax */
.zone--para {
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255, 107, 26, 0.16), transparent 52%),
    linear-gradient(180deg, #0e1218 0%, var(--para-bg) 40%, #0b0e14 100%);
  color: var(--para-ink);
  font-family: var(--para-font);
}

.zone--para::before,
.zone--para::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.zone--para::before {
  background:
    repeating-linear-gradient(
      -18deg,
      transparent,
      transparent 48px,
      rgba(244, 239, 230, 0.03) 48px,
      rgba(244, 239, 230, 0.03) 49px
    );
  background-attachment: fixed;
}

.zone--para::after {
  background: radial-gradient(circle at 80% 70%, rgba(62, 207, 207, 0.12), transparent 42%);
  background-attachment: fixed;
}

.zone__head--para {
  position: relative;
  z-index: 1;
}

.zone__head--para .zone__kicker {
  color: var(--para-accent);
}

.zone__head--para .zone__title {
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.zone__head--para .zone__sub {
  color: var(--para-muted);
}

/* 2013 — flat / Metro */
.zone--flat {
  background: var(--flat-bg);
  color: #212121;
  font-family: var(--flat-font);
}

.zone__head--flat .zone__kicker {
  color: #00a4ef;
}

.zone__head--flat .zone__title {
  font-weight: 700;
  letter-spacing: -0.04em;
}

.zone__head--flat .zone__sub {
  color: #616161;
}

/* 2020 — glass */
.zone--glass {
  background:
    radial-gradient(circle at 15% 20%, rgba(138, 180, 255, 0.28), transparent 32%),
    radial-gradient(circle at 85% 10%, rgba(196, 181, 253, 0.22), transparent 28%),
    radial-gradient(circle at 70% 90%, rgba(56, 189, 248, 0.16), transparent 34%),
    var(--glass-bg);
  color: var(--glass-ink);
  font-family: var(--glass-font);
}

.zone__head--glass .zone__kicker {
  color: var(--glass-accent);
}

.zone__head--glass .zone__sub {
  color: var(--glass-muted);
}

/* 2026 — now */
.zone--now {
  background:
    radial-gradient(ellipse 70% 50% at 20% 0%, rgba(196, 181, 253, 0.18), transparent 50%),
    radial-gradient(ellipse 50% 40% at 90% 80%, rgba(56, 189, 248, 0.1), transparent 46%),
    var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
}

.zone__inner--now {
  justify-content: space-between;
  padding-bottom: 1.25rem;
}

.now {
  max-width: 42rem;
}

.zone--now :deep(.site-foot) {
  background: transparent;
  margin-top: auto;
}

.zone--now :deep(.site-foot__inner) {
  max-width: none;
  padding-inline: 0;
  padding-bottom: 0.5rem;
}

.zone--now .zone__kicker {
  color: var(--now-accent);
}

.now__title {
  margin: 0;
  font-size: clamp(2.4rem, 7vw, 4.5rem);
  font-weight: 600;
  letter-spacing: -0.05em;
  line-height: 0.95;
}

.now__text {
  margin: 1rem 0 0;
  max-width: 32rem;
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--now-muted);
}

.now__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1.75rem;
}

.now__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.15rem;
  border-radius: 999px;
  background: var(--now-ink);
  color: var(--now-bg);
  font-size: 0.9rem;
  font-weight: 600;
}

.now__btn:hover {
  opacity: 0.88;
}

.now__btn--ghost {
  background: transparent;
  color: var(--now-ink);
  border: 1px solid rgba(250, 250, 250, 0.16);
}

.now__btn--ghost:hover {
  border-color: rgba(250, 250, 250, 0.42);
}
</style>
