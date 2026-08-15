<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal, usePageSeo } from '@/shared/lib'
import { SITE_NAME, SITE_URL, SITE_DEFAULT_IMAGE, absoluteUrl } from '@/shared/config/site'
import { featuredProjects, WorkProjectCard } from '@/entities/project'
import { HeroSection } from '@/widgets/hero'
import { TechMarquee } from '@/widgets/tech-marquee'
import { SkillsBento } from '@/widgets/skills-bento'
import { ExperienceTimeline } from '@/widgets/experience-timeline'
import { ProcessSteps } from '@/widgets/process-steps'
import { LanguagesSection } from '@/widgets/languages-section'
import { AboutText } from '@/widgets/about-section'
import { WhatIDo } from '@/widgets/what-i-do'

useScrollReveal()

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
      name: 'Yazmyrat Hanov',
      alternateName: ['Yan Hanov', 'Ян Ханов', 'Язмырат Ханов'],
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
  <HeroSection />
  <TechMarquee />
  <AboutText />

  <section id="experience" class="zone zone--exp">
    <div class="zone__inner">
      <header class="zone__head zone__head--exp reveal">
        <p class="zone__kicker">02 / EXP</p>
        <h2 class="zone__title">{{ $t('home.experience-title') }}</h2>
        <p class="zone__sub">{{ $t('home.experience-sub') }}</p>
      </header>
      <ExperienceTimeline />
    </div>
  </section>

  <section id="projects" class="zone zone--swiss">
    <div class="zone__inner">
      <header class="zone__head zone__head--swiss reveal">
        <p class="zone__kicker">03 / WORK</p>
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
        <RouterLink to="/projects" class="swiss-link">
          {{ $t('home.view-all-projects') }} →
        </RouterLink>
      </div>
    </div>
  </section>

  <section id="skills" class="zone zone--soft">
    <div class="zone__inner">
      <header class="zone__head zone__head--soft reveal">
        <p class="zone__kicker">04 / STACK</p>
        <h2 class="zone__title">{{ $t('home.skills') }}</h2>
        <p class="zone__sub">{{ $t('home.skills-sub') }}</p>
      </header>
      <SkillsBento />
    </div>
  </section>

  <section id="what-i-do" class="zone zone--bauhaus">
    <div class="zone__inner">
      <header class="zone__head zone__head--bauhaus reveal">
        <p class="zone__kicker">05 / SERVICES</p>
        <h2 class="zone__title">{{ $t('home.whatido-title') }}</h2>
        <p class="zone__sub">{{ $t('home.whatido-sub') }}</p>
      </header>
      <WhatIDo />
    </div>
  </section>

  <section id="languages" class="zone zone--type">
    <div class="zone__inner">
      <header class="zone__head zone__head--type reveal">
        <p class="zone__kicker">06 / TYPE</p>
        <h2 class="zone__title">{{ $t('home.languages-title') }}</h2>
        <p class="zone__sub">{{ $t('home.languages-sub') }}</p>
      </header>
      <LanguagesSection />
    </div>
  </section>

  <section id="process" class="zone zone--brutal">
    <div class="zone__inner">
      <header class="zone__head zone__head--brutal reveal">
        <p class="zone__kicker">07 / PROCESS</p>
        <h2 class="zone__title">{{ $t('home.process-title') }}</h2>
        <p class="zone__sub">{{ $t('home.process-sub') }}</p>
      </header>
      <ProcessSteps />
    </div>
  </section>

  <section id="contact" class="zone zone--term">
    <div class="zone__inner">
      <div class="term reveal">
        <div class="term__bar">
          <span class="term__dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span class="term__path">~/contact.sh</span>
        </div>
        <div class="term__body">
          <p class="term__line">
            <span class="term__prompt">yan@hanov</span>
            <span class="term__sep">:</span>
            <span class="term__cwd">~</span>
            <span class="term__cash">$</span>
            ./hello
          </p>
          <h2 class="term__title">{{ $t('home.cta-title') }}</h2>
          <p class="term__text">{{ $t('home.cta-text') }}</p>
          <div class="term__actions">
            <a
              href="https://t.me/yanhanov"
              target="_blank"
              rel="noopener noreferrer"
              class="term__btn"
            >
              > {{ $t('home.cta-btn') }}
            </a>
            <a href="mailto:yanhanow@gmail.com" class="term__btn term__btn--ghost">
              > yanhanow@gmail.com
            </a>
          </div>
          <p class="term__cursor" aria-hidden="true">█</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.zone {
  position: relative;
}

.zone__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: clamp(3.5rem, 8vw, 6.5rem) 1.25rem;
  box-sizing: border-box;
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

/* Experience */
.zone--exp {
  background: var(--exp-bg);
  color: var(--exp-ink);
  font-family: var(--exp-font);
}

.zone__head--exp .zone__kicker {
  color: var(--exp-accent);
}

.zone__head--exp .zone__title {
  font-family: var(--exp-font);
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.zone__head--exp .zone__sub {
  color: var(--exp-muted);
}

/* Swiss projects */
.zone--swiss {
  background: var(--swiss-bg);
  color: var(--swiss-ink);
  font-family: var(--swiss-font);
}

.zone__head--swiss {
  display: grid;
  gap: 0.35rem;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid var(--swiss-rule);
}

.zone__head--swiss .zone__kicker {
  color: var(--swiss-accent);
}

.zone__head--swiss .zone__title {
  font-weight: 700;
  letter-spacing: -0.04em;
}

.zone__head--swiss .zone__sub {
  color: var(--swiss-muted);
}

.projects-showcase {
  display: grid;
  gap: 0;
  border: 1px solid var(--swiss-rule);
}

@media (min-width: 48rem) {
  .projects-showcase {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .projects-showcase :deep(.project-card) {
    border-right: none;
  }

  .projects-showcase :deep(.project-card:last-child) {
    border-right: 1px solid var(--swiss-rule);
  }
}

.swiss-link {
  display: inline-flex;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--swiss-ink);
  border-bottom: 2px solid var(--swiss-accent);
  padding-bottom: 0.15rem;
}

.swiss-link:hover {
  color: var(--swiss-accent);
}

/* Soft skills */
.zone--soft {
  background: var(--soft-bg);
  color: var(--soft-ink);
  font-family: var(--soft-font);
}

.zone__head--soft .zone__kicker {
  color: var(--soft-accent);
}

.zone__head--soft .zone__sub {
  color: var(--soft-muted);
}

/* Bauhaus */
.zone--bauhaus {
  background: var(--bauhaus-bg);
  color: var(--bauhaus-ink);
  font-family: var(--bauhaus-font);
}

.zone__head--bauhaus .zone__kicker {
  color: var(--bauhaus-red);
}

.zone__head--bauhaus .zone__title {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.04em;
}

.zone__head--bauhaus .zone__sub {
  color: var(--bauhaus-muted);
}

/* Type specimen */
.zone--type {
  background: var(--type-bg);
  color: var(--type-ink);
}

.zone__head--type .zone__kicker {
  font-family: var(--type-font-meta);
  color: var(--type-muted);
}

.zone__head--type .zone__title {
  font-family: var(--type-font-display);
  font-weight: 600;
}

.zone__head--type .zone__sub {
  font-family: var(--type-font-meta);
  color: var(--type-muted);
}

/* Neo-brutal process */
.zone--brutal {
  background: var(--brutal-bg);
  color: var(--brutal-ink);
  font-family: var(--brutal-font);
}

.zone__head--brutal .zone__kicker {
  color: var(--brutal-accent);
}

.zone__head--brutal .zone__title {
  font-weight: 800;
  text-transform: uppercase;
}

.zone__head--brutal .zone__sub {
  color: var(--brutal-muted);
}

/* Terminal contact */
.zone--term {
  background: var(--term-bg);
  color: var(--term-ink);
  font-family: var(--term-font);
}

.term {
  max-width: 46rem;
  margin-inline: auto;
  border: 1px solid var(--term-border);
  background: var(--term-surface);
  overflow: hidden;
}

.term__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem 0.9rem;
  border-bottom: 1px solid var(--term-border);
  background: #0e1210;
}

.term__dots {
  display: inline-flex;
  gap: 0.35rem;
}

.term__dots i {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: #2a3a30;
  display: block;
}

.term__dots i:first-child {
  background: #ff5f56;
}

.term__dots i:nth-child(2) {
  background: #ffbd2e;
}

.term__dots i:nth-child(3) {
  background: #27c93f;
}

.term__path {
  font-size: 0.7rem;
  color: var(--term-muted);
}

.term__body {
  padding: 1.5rem 1.25rem 1.75rem;
}

.term__line {
  margin: 0 0 1.25rem;
  font-size: 0.8125rem;
  color: var(--term-muted);
}

.term__prompt {
  color: var(--term-accent);
}

.term__sep,
.term__cash {
  color: var(--term-muted);
}

.term__cwd {
  color: #7ec8ff;
}

.term__title {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 500;
  line-height: 1.2;
  color: var(--term-ink);
}

.term__text {
  margin: 0.85rem 0 0;
  max-width: 34rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--term-muted);
}

.term__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.5rem;
}

.term__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--term-accent);
  background: color-mix(in srgb, var(--term-accent) 12%, transparent);
  color: var(--term-accent);
  font-size: 0.8125rem;
  transition: background 0.15s ease;
}

.term__btn:hover {
  background: color-mix(in srgb, var(--term-accent) 22%, transparent);
}

.term__btn--ghost {
  border-color: var(--term-border);
  background: transparent;
  color: var(--term-ink);
}

.term__btn--ghost:hover {
  border-color: var(--term-muted);
}

.term__cursor {
  margin: 1.25rem 0 0;
  color: var(--term-accent);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .term__cursor {
    animation: none;
  }
}
</style>
