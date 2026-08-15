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
              <th>Role</th>
              <td>{{ t(job.roleKey) }}</td>
            </tr>
            <tr>
              <th>Period</th>
              <td>{{ t(job.periodKey) }}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>
                {{ t(job.typeKey) }}
                <template v-if="job.current"> · <b>{{ t('experience.current') }}</b></template>
                <template v-else> · {{ job.year }}</template>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="win__notes">
          <p class="win__notes-label">Notes</p>
          <div class="win__notes-box">
            <p
              v-for="n in job.bullets"
              :key="n"
              class="win__note"
            >
              › {{ t(`experience.${job.id}.bullet${n}`) }}
            </p>
          </div>
        </div>
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
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.45rem 0.5rem 0.4rem;
}

.win__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.72rem;
  flex: none;
}

.win__table th,
.win__table td {
  border: 1px solid #808080;
  padding: 0.22rem 0.35rem;
  text-align: left;
  vertical-align: top;
}

.win__table th {
  width: 4.5rem;
  background: #dfdfdf;
  font-weight: 700;
  color: #222;
}

.win__notes {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.win__notes-label {
  margin: 0 0 0.2rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #000080;
}

.win__notes-box {
  flex: 1;
  min-height: 0;
  padding: 0.35rem 0.45rem;
  background: #fff;
  color: #111;
  box-shadow:
    inset 1px 1px #808080,
    inset -1px -1px #fff,
    inset 2px 2px #404040,
    inset -2px -2px #dfdfdf;
}

.win__note {
  margin: 0;
  font-size: 0.68rem;
  line-height: 1.35;
  color: #222;
}

.win__note + .win__note {
  margin-top: 0.28rem;
  padding-top: 0.28rem;
  border-top: 1px dotted #b0b0b0;
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
