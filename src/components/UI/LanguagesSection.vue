<script setup>
const languages = [
  { key: 'ru', level: 100, color: '#12f7d6' },
  { key: 'en', level: 75, color: '#0c73b8' },
]
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-4 reveal">
    <div
      v-for="lang in languages"
      :key="lang.key"
      class="glass-card p-5 flex items-center gap-4 group hover:border-[var(--brand)]/30 transition-colors lang-card"
    >
      <span class="text-3xl secont-font font-medium color-brand/30 group-hover:color-brand/60 transition-colors uppercase w-10">
        {{ lang.key }}
      </span>
      <div class="flex-1">
        <p class="secont-font font-medium">{{ $t(`home.languages.${lang.key}.name`) }}</p>
        <p class="text-xs text-[var(--text-muted)] mt-0.5">{{ $t(`home.languages.${lang.key}.level`) }}</p>
        <div class="mt-2 h-1 rounded-full bg-[var(--border)] overflow-hidden">
          <div
            class="lang-bar h-full rounded-full"
            :style="{ '--level': lang.level + '%', background: lang.color }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lang-bar {
  width: 0;
  transition: width 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal.revealed .lang-bar {
  width: var(--level);
}
</style>
