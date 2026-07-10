<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useScrollReveal, useTilt } from '@/shared/lib'
import { featuredProjects, WorkProjectCard } from '@/entities/project'
import { HeroSection } from '@/widgets/hero'
import { TechMarquee } from '@/widgets/tech-marquee'
import { SectionHeading } from '@/shared/ui/section-heading'
import { SkillsBento } from '@/widgets/skills-bento'
import { ExperienceTimeline } from '@/widgets/experience-timeline'
import { ProcessSteps } from '@/widgets/process-steps'
import { LanguagesSection } from '@/widgets/languages-section'
import { AboutText } from '@/widgets/about-section'
import { WhatIDo } from '@/widgets/what-i-do'

useScrollReveal()

const aboutImg = ref(null)

useTilt(aboutImg, 10)
</script>

<template>
  <HeroSection />

  <TechMarquee />

  <section id="about" class="page-section about">
    <div class="container">
      <div
        class="about__body py-16 lg:py-44 md:py-24 flex justify-between gap-10 items-center md:flex-nowrap flex-wrap"
      >
        <div class="lg:w-[60%] z-10 w-full reveal">
          <p class="section-label mb-4">// about</p>
          <h2 class="secont-font lg:text-6xl md:text-5xl text-4xl font-medium">
            {{ $t('home.about-title') }}
          </h2>
          <AboutText class="mt-10" />
        </div>
        <div class="about-img w-30% z-50 hidden md:block reveal reveal-delay-2">
          <div ref="aboutImg" class="relative about-tilt">
            <div class="about-img__glow" aria-hidden="true" />
            <picture>
              <source srcset="/Image-400.webp 400w" sizes="400px" type="image/webp" />
              <img
                src="/Image-400.webp"
                alt="Developer"
                class="relative w-full drop-shadow-2xl"
                width="400"
                height="480"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="experience" class="page-section py-16 lg:py-24">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// experience"
        :title="$t('home.experience-title')"
        :subtitle="$t('home.experience-sub')"
      />
      <ExperienceTimeline />
    </div>
  </section>

  <section id="projects" class="page-section py-16 lg:py-24 section-stripe">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// projects"
        :title="$t('home.work-title')"
        :subtitle="$t('home.work-sub')"
      />
      <div class="projects-showcase reveal reveal-delay-1">
        <WorkProjectCard
          v-for="(item, i) in featuredProjects"
          :key="item.id"
          :project="item"
          :index="i"
        />
      </div>
      <div class="text-center mt-10 reveal reveal-delay-2">
        <RouterLink to="/projects" class="btn-ghost">
          {{ $t('home.view-all-projects') }}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>

  <section id="skills" class="page-section skills py-16 lg:py-24">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// stack"
        :title="$t('home.skills')"
        :subtitle="$t('home.skills-sub')"
      />
      <SkillsBento />
    </div>
  </section>

  <section id="what-i-do" class="page-section py-16 lg:py-24 section-stripe">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// services"
        :title="$t('home.whatido-title')"
        :subtitle="$t('home.whatido-sub')"
      />
      <WhatIDo />
    </div>
  </section>

  <section id="languages" class="page-section py-16 lg:py-24">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// languages"
        :title="$t('home.languages-title')"
        :subtitle="$t('home.languages-sub')"
      />
      <LanguagesSection />
    </div>
  </section>

  <section id="process" class="page-section py-16 lg:py-24 section-stripe">
    <div class="container">
      <SectionHeading
        class="reveal"
        label="// process"
        :title="$t('home.process-title')"
        :subtitle="$t('home.process-sub')"
      />
      <ProcessSteps />
    </div>
  </section>

  <section id="contact" class="page-section py-16 lg:py-24">
    <div class="container">
      <div
        class="reveal relative overflow-hidden rounded-3xl glass-card px-8 py-14 md:px-16 text-center cta-card"
      >
        <div
          class="gradient-orb gradient-orb--teal w-64 h-64 -top-20 left-1/2 -translate-x-1/2 opacity-15"
        />
        <p class="section-label mb-4 relative z-10">// contact</p>
        <h2 class="secont-font text-3xl md:text-5xl relative z-10 font-medium">
          {{ $t('home.cta-title') }}
        </h2>
        <p class="mt-4 text-[var(--text-muted)] max-w-xl mx-auto relative z-10">
          {{ $t('home.cta-text') }}
        </p>
        <div class="flex flex-wrap justify-center gap-3 mt-8 relative z-10">
          <a href="https://t.me/yanhanov" target="_blank" class="btn-primary text-base">
            {{ $t('home.cta-btn') }}
          </a>
          <a href="mailto:yanhanov@gmail.com" class="btn-ghost text-base"> yanhanov@gmail.com </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-tilt {
  transform-style: preserve-3d;
}

.about-img__glow {
  position: absolute;
  inset: -1rem;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(18, 247, 214, 0.14) 0%, transparent 70%);
  pointer-events: none;
}

.about {
  position: relative;
  background-color: #1a1e23;
}

.about:before {
  content: '';
  background: url('/about-bg.jpg') no-repeat center/cover;
  opacity: 0.2;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.skills {
  position: relative;
  background: radial-gradient(ellipse 80% 50% at 50% 0%, rgba(18, 247, 214, 0.06), transparent);
}

.cta-card {
  position: relative;
}

.cta-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--brand),
    transparent 40%,
    #0c73b8,
    transparent 80%,
    var(--brand)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.projects-showcase {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .projects-showcase {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
