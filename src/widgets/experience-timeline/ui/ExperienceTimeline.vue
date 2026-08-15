<script setup>
import { useI18n } from 'vue-i18n'
import { experience } from '@/entities/experience'

const { t } = useI18n()
</script>

<template>
  <div class="desk">
    <article
      v-for="(job, i) in experience"
      :key="job.id"
      class="win reveal"
      :class="`reveal-delay-${Math.min(i + 1, 3)}`"
    >
      <header class="win__bar">
        <span class="win__icon" aria-hidden="true" />
        <h3 class="win__title">
          <component
            :is="job.url ? 'a' : 'span'"
            :href="job.url || undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ job.company }}
          </component>
        </h3>
        <span class="win__controls" aria-hidden="true">
          <i>_</i>
          <i>□</i>
          <i>×</i>
        </span>
      </header>

      <div class="win__body">
        <table class="win__table">
          <tbody>
            <tr>
              <th>{{ t(job.roleKey) }}</th>
              <td>{{ t(job.periodKey) }}</td>
            </tr>
            <tr>
              <th>{{ t(job.typeKey) }}</th>
              <td>
                <b v-if="job.current">{{ t('experience.current') }}</b>
                <span v-else>{{ job.year }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <ul class="win__notes">
          <li v-for="n in job.bullets" :key="n">
            {{ t(`experience.${job.id}.bullet${n}`) }}
          </li>
        </ul>
      </div>

      <footer class="win__status">
        <span>Ready</span>
        <span>NUM</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.desk {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem;
  flex: 1;
  min-height: 0;
  font-family: var(--exp-font);
  color: var(--exp-ink);
}

@media (min-width: 48rem) {
  .desk {
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
  }
}

.win {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--exp-surface);
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff,
    inset -2px -2px #808080,
    inset 2px 2px #dfdfdf;
}

.win__bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin: 2px;
  padding: 0.1rem 0.25rem;
  background: linear-gradient(90deg, #000080, #1084d0);
  color: #fff;
}

.win__icon {
  width: 0.58rem;
  height: 0.58rem;
  flex: none;
  background: #c0c0c0;
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff;
}

.win__title {
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.win__title a {
  color: #fff;
  text-decoration: underline;
}

.win__title a:hover {
  color: #ffff99;
}

.win__controls {
  display: flex;
  gap: 2px;
}

.win__controls i {
  display: grid;
  place-items: center;
  width: 0.9rem;
  height: 0.9rem;
  background: var(--exp-surface);
  color: #000;
  font-style: normal;
  font-size: 0.62rem;
  line-height: 1;
  box-shadow:
    inset -1px -1px #0a0a0a,
    inset 1px 1px #fff;
}

.win__body {
  flex: 1;
  min-height: 0;
  padding: 0.4rem 0.5rem 0.35rem;
}

.win__table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.4rem;
  font-size: 0.72rem;
}

.win__table th,
.win__table td {
  border: 1px solid #808080;
  padding: 0.22rem 0.35rem;
  text-align: left;
  vertical-align: top;
}

.win__table th {
  width: 46%;
  background: #dfdfdf;
  font-weight: 700;
}

.win__notes {
  margin: 0;
  padding-left: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  font-size: 0.7rem;
  line-height: 1.3;
  color: var(--exp-muted);
}

.win__status {
  display: flex;
  justify-content: space-between;
  margin: 0 2px 2px;
  padding: 0.08rem 0.3rem;
  font-size: 0.58rem;
  background: var(--exp-surface);
  box-shadow:
    inset 1px 1px #808080,
    inset -1px -1px #fff;
}
</style>
