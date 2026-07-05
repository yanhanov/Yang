<script setup>
import { useI18n } from 'vue-i18n'
import { experience } from '@/data/resume'

const { t } = useI18n()
</script>

<template>
  <div class="relative">
    <div class="absolute left-[7px] md:left-4 top-2 bottom-2 w-px bg-[var(--border)]" />
    <div class="flex flex-col gap-6">
      <article
        v-for="(job, i) in experience"
        :key="job.id"
        class="reveal relative pl-8 md:pl-12"
        :class="`reveal-delay-${Math.min(i + 1, 3)}`"
      >
        <span
          class="absolute left-0 md:left-2.5 top-2 w-3.5 h-3.5 rounded-full border-2 border-[var(--brand)] bg-[var(--bg)]"
          :class="{ 'bg-[var(--brand)] shadow-[0_0_12px_var(--brand)]': job.current }"
        />
        <div class="glass-card p-5 md:p-6 hover:border-[var(--brand)]/30 transition-colors">
          <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
            <div>
              <component
                :is="job.url ? 'a' : 'h3'"
                :href="job.url || undefined"
                target="_blank"
                class="secont-font text-lg md:text-xl font-medium"
                :class="job.url ? 'color-brand hover:underline' : ''"
              >
                {{ job.company }}
              </component>
              <p class="text-[var(--text-muted)] text-sm mt-0.5">{{ t(job.roleKey) }}</p>
            </div>
            <div class="text-right">
              <span class="base-font text-xs color-brand">{{ t(job.periodKey) }}</span>
              <p class="text-xs text-[var(--text-muted)] mt-0.5">{{ t(job.typeKey) }}</p>
              <span
                v-if="job.current"
                class="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-[var(--brand-dim)] color-brand border border-[var(--border-accent)]"
              >
                {{ t('experience.current') }}
              </span>
            </div>
          </div>
          <ul class="mt-3 space-y-1.5">
            <li
              v-for="n in job.bullets"
              :key="n"
              class="text-sm text-[var(--text-muted)] leading-relaxed flex gap-2"
            >
              <span class="color-brand shrink-0">›</span>
              <span>{{ t(`experience.${job.id}.bullet${n}`) }}</span>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>
