<template>
  <footer class="site-foot">
    <div class="site-foot__inner">
      <div class="site-foot__brand">
        <router-link to="/" class="site-foot__name">Yan Hanov</router-link>
        <p class="site-foot__copy">{{ $t('footer.copy') }} {{ $t('footer.all') }}</p>
      </div>

      <nav class="site-foot__nav" aria-label="Footer">
        <router-link to="/">{{ $t('header.nav.home') }}</router-link>
        <router-link to="/projects">{{ $t('header.nav.projects') }}</router-link>
        <router-link to="/blogs">{{ $t('header.nav.awards') }}</router-link>
        <a href="/yan-hanov.pdf" download="yan-hanov.pdf">{{ $t('header.nav.resume') }}</a>
      </nav>

      <div class="site-foot__social">
        <a href="mailto:yanhanow@gmail.com">Email</a>
        <a href="https://t.me/yanhanov" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://github.com/yanhanov" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/yanhanov" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-foot {
  background: var(--now-bg);
  color: var(--now-ink);
  font-family: var(--now-font);
  border-top: 1px solid rgba(250, 250, 250, 0.08);
}

.site-foot__inner {
  width: 100%;
  max-width: 1140px;
  margin-inline: auto;
  padding: 2rem 1.25rem 2.25rem;
  box-sizing: border-box;
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 48rem) {
  .site-foot__inner {
    grid-template-columns: 1.2fr 1fr 1fr;
    align-items: end;
    gap: 2rem;
  }
}

.site-foot__name {
  display: inline-block;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.04em;
}

.site-foot__copy {
  margin: 0.4rem 0 0;
  font-size: 0.8rem;
  color: var(--now-muted);
}

.site-foot__nav,
.site-foot__social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
}

.site-foot__nav a,
.site-foot__social a {
  font-size: 0.85rem;
  color: var(--now-muted);
}

.site-foot__nav a:hover,
.site-foot__social a:hover {
  color: var(--now-ink);
}
</style>
