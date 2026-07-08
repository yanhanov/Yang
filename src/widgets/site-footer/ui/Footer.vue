<template>
  <footer class="footer border-t border-[var(--border)] py-8 mt-10 relative">
    <div class="footer-glow" aria-hidden="true" />
    <div class="container relative">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="text-center md:text-left">
          <router-link to="/" class="footer-logo base-font">
            <span class="footer-logo__mark color-brand">&lt;/&gt;</span>
            yan hanov
          </router-link>
          <p class="text-[var(--text-muted)] text-sm">
            {{ $t('footer.copy') }} {{ $t('footer.all') }}
          </p>
          <p class="text-xs color-brand/60 mt-1">{{ $t('footer.tagline') }}</p>
        </div>

        <nav class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm base-font">
          <router-link to="/" class="footer-link">{{ $t('header.nav.home') }}</router-link>
          <router-link to="/projects" class="footer-link">{{
            $t('header.nav.projects')
          }}</router-link>
          <router-link to="/blogs" class="footer-link">{{ $t('header.nav.awards') }}</router-link>
          <a href="/yan-hanov.pdf" download="yan-hanov.pdf" class="footer-link">{{
            $t('header.nav.resume')
          }}</a>
        </nav>

        <div class="flex items-center gap-4">
          <a href="mailto:yanhanow@gmail.ru" class="social-btn" aria-label="Email">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="4" y="6" width="16" height="12" rx="2" />
              <path d="M4 6l8 6 8-6" stroke-linecap="round" />
            </svg>
          </a>
          <a href="https://t.me/yanhanov" target="_blank" class="social-btn" aria-label="Telegram">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path
                d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445 c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758 c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125 c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077 C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"
              />
            </svg>
          </a>
          <a
            href="https://github.com/yanhanov"
            target="_blank"
            class="social-btn"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 17 17" fill="currentColor">
              <path
                d="M8.99998 0.872253C7.02121 0.872335 5.10703 1.57651 3.59995 2.85879C2.09287 4.14107 1.09123 5.91777 0.77426 7.87099C0.457287 9.82421 0.845664 11.8265 1.8699 13.5195C2.89413 15.2126 4.48739 16.486 6.36458 17.1118C6.78125 17.1848 6.9375 16.9348 6.9375 16.716C6.9375 16.5181 6.92707 15.8618 6.92707 15.1639C4.83332 15.5493 4.29165 14.6535 4.12498 14.1848C3.94005 13.7289 3.64688 13.3249 3.27082 13.0077C2.97915 12.8514 2.56248 12.466 3.26039 12.4556C3.52688 12.4845 3.78247 12.5773 4.00551 12.7259C4.22854 12.8746 4.41245 13.0749 4.54165 13.3097C4.65562 13.5145 4.80888 13.6947 4.99264 13.8402C5.1764 13.9856 5.38704 14.0933 5.61251 14.1572C5.83797 14.221 6.07382 14.2398 6.30655 14.2123C6.53927 14.1849 6.76429 14.1118 6.96872 13.9972C7.00479 13.5736 7.1936 13.1775 7.49998 12.8827C5.64582 12.6744 3.70832 11.9556 3.70832 8.76811C3.6966 7.9399 4.00222 7.13859 4.56248 6.52853C4.30772 5.80871 4.33753 5.01877 4.64582 4.3202C4.64582 4.3202 5.34371 4.10144 6.93748 5.17436C8.30105 4.79934 9.74057 4.79934 11.1041 5.17436C12.6979 4.09103 13.3958 4.3202 13.3958 4.3202C13.7041 5.01876 13.734 5.80872 13.4791 6.52853C14.0411 7.13755 14.347 7.93956 14.3333 8.76811C14.3333 11.966 12.3854 12.6744 10.5312 12.8827C10.7301 13.0843 10.8833 13.3263 10.9803 13.5923C11.0774 13.8583 11.1161 14.1421 11.0937 14.4244C11.0937 15.539 11.0833 16.4348 11.0833 16.716C11.0833 16.9348 11.2396 17.1952 11.6562 17.1119C13.5301 16.4809 15.1188 15.2046 16.1387 13.5106C17.1585 11.8167 17.5432 9.81544 17.224 7.86412C16.9049 5.91279 15.9026 4.1384 14.3962 2.85768C12.8898 1.57696 10.9772 0.873283 8.99998 0.872253Z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/yanhanov"
            target="_blank"
            class="social-btn"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg);
}

.footer-glow {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--brand), transparent);
  box-shadow: 0 0 24px var(--brand);
}

.footer-link {
  color: var(--text-muted);
  transition: color 0.2s;
}

.footer-logo {
  display: inline-block;
  margin-bottom: 0.25rem;
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: lowercase;
  transition: opacity 0.2s;
}

.footer-logo:hover {
  opacity: 0.85;
}

.footer-logo__mark {
  margin-right: 0.125rem;
}

.footer-link:hover {
  color: var(--brand);
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--border-accent);
  color: var(--brand);
  transition:
    background 0.2s,
    transform 0.2s,
    border-color 0.2s;
}

.social-btn:hover {
  background: var(--brand-dim);
  border-color: var(--brand);
  transform: translateY(-2px);
}
</style>
