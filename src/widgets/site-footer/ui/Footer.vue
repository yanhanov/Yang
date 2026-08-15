<template>
  <footer class="colophon">
    <div class="colophon__inner">
      <div class="colophon__masthead">
        <router-link to="/" class="colophon__name">Yan Hanov</router-link>
        <p class="colophon__edition">{{ $t('footer.edition') }}</p>
      </div>

      <div class="colophon__grid">
        <div class="colophon__col">
          <p class="colophon__label">Imprint</p>
          <p class="colophon__copy">{{ $t('footer.copy') }} {{ $t('footer.all') }}</p>
          <p class="colophon__tag">{{ $t('footer.tagline') }}</p>
        </div>

        <nav class="colophon__col" aria-label="Footer">
          <p class="colophon__label">{{ $t('footer.contents') }}</p>
          <router-link to="/">{{ $t('header.nav.home') }}</router-link>
          <router-link to="/projects">{{ $t('header.nav.projects') }}</router-link>
          <router-link to="/blogs">{{ $t('header.nav.awards') }}</router-link>
          <a href="/yan-hanov.pdf" download="yan-hanov.pdf">{{ $t('header.nav.resume') }}</a>
        </nav>

        <div class="colophon__col">
          <p class="colophon__label">{{ $t('footer.correspondence') }}</p>
          <a href="mailto:yanhanow@gmail.com">yanhanow@gmail.com</a>
          <a href="https://t.me/yanhanov" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://github.com/yanhanov" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/yanhanov" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/yanhanow/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.colophon {
  background: var(--colophon-bg);
  color: var(--colophon-ink);
  border-top: 3px double var(--colophon-rule);
}

.colophon__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 2.75rem 1.25rem 3rem;
  box-sizing: border-box;
}

.colophon__masthead {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1.5rem;
  padding-bottom: 1.25rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--colophon-rule);
}

.colophon__name {
  font-family: var(--colophon-font);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
}

.colophon__edition {
  margin: 0;
  font-family: var(--colophon-meta);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--colophon-muted);
}

.colophon__grid {
  display: grid;
  gap: 1.75rem;
}

@media (min-width: 48rem) {
  .colophon__grid {
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 2.5rem;
  }
}

.colophon__label {
  margin: 0 0 0.7rem;
  font-family: var(--colophon-meta);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.colophon__copy,
.colophon__tag {
  margin: 0;
  font-family: var(--colophon-font);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--colophon-muted);
}

.colophon__tag {
  margin-top: 0.45rem;
  font-size: 0.85rem;
  font-style: italic;
}

.colophon__col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}

.colophon__col a {
  font-family: var(--colophon-meta);
  font-size: 0.9rem;
  color: var(--colophon-ink);
  border-bottom: 1px solid transparent;
}

.colophon__col a:hover {
  border-bottom-color: var(--colophon-ink);
}
</style>
