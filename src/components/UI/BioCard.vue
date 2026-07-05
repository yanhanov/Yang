<script setup>
import TechIcon from './TechIcon.vue'

const bioTech = [
  { icon: 'vue', label: 'Vue 3' },
  { icon: 'typescript', label: 'TS' },
  { icon: 'nuxt', label: 'Nuxt' },
  { icon: 'react', label: 'React' },
]
</script>

<template>
  <div class="glass-card min-w-[18.75rem] p-6 reveal glow-border bio-card">
    <div class="flex flex-col h-full">
      <div class="flex flex-col items-center text-center gap-3">
        <div class="relative avatar-ring">
          <img
            src="/yan-profile.png"
            alt="Yazmyrat Hanov"
            class="relative rounded-full h-28 w-28 object-cover object-top border-2 border-[var(--brand)]/50"
          />
        </div>
        <div>
          <p class="text-2xl secont-font font-medium">{{ $t('home.bio-name') }}</p>
          <p class="text-xs text-[var(--text-muted)] base-font mt-0.5">{{ $t('home.bio-fullname') }}</p>
          <p class="text-sm color-brand mt-1">{{ $t('home.bio-prof') }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 py-5 text-sm">
        <a href="mailto:yanhanow@gmail.ru" class="bio-link flex items-center gap-2.5">
          <span class="bio-link__icon">@</span>
          yanhanow@gmail.ru
        </a>
        <p class="bio-link flex items-center gap-2.5">
          <span class="bio-link__icon">⌖</span>
          {{ $t('home.bio-con') }}
        </p>
        <p class="bio-link flex items-center gap-2.5">
          <span class="bio-link__icon">◈</span>
          {{ $t('home.bio-job') }}
        </p>
        <a href="https://t.me/itisyang" target="_blank" class="bio-link flex items-center gap-2.5 color-brand">
          <span class="bio-link__icon">→</span>
          {{ $t('home.bio-write') }}
        </a>
      </div>

      <div class="flex flex-wrap gap-2 justify-center">
        <span
          v-for="tag in bioTech"
          :key="tag.icon"
          class="inline-flex items-center gap-1.5 py-1 px-2.5 bg-[var(--brand-dim)] text-xs rounded-full base-font border border-[var(--border-accent)]"
        >
          <TechIcon :name="tag.icon" :size="14" />
          <span class="color-brand">{{ tag.label }}</span>
        </span>
      </div>

      <a href="/yan-hanov.pdf" download="yan-hanov.pdf" class="btn-primary w-full justify-center mt-5 text-sm">
        {{ $t('home.bio-cv') }}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v11m0 0l-4-4m4 4l4-4M4 19h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.bio-card {
  height: auto;
}

.avatar-ring {
  position: relative;
  width: 7rem;
  height: 7rem;
}

.avatar-ring img {
  position: relative;
  z-index: 1;
}

.avatar-ring::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--brand), transparent, var(--brand));
  animation: spin 4s linear infinite;
  opacity: 0.5;
}

.avatar-ring::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: var(--bg-elevated);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.bio-link {
  color: var(--text-muted);
  transition: color 0.2s;
}

.bio-link:hover {
  color: var(--brand);
}

.bio-link__icon {
  width: 1.25rem;
  text-align: center;
  color: var(--brand);
  font-size: 0.75rem;
  font-family: 'IBM Plex Mono', monospace;
}
</style>
