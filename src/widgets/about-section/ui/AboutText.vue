<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Toast } from '@/shared/ui/toast'

const { t } = useI18n()
const showToast = ref(false)

function onCloseClick() {
  showToast.value = true
}

const lines = computed(() => [
  { type: 'comment', text: ' about me ' },
  { type: 'tag-open', name: 'html', indent: 0 },
  { type: 'tag-open', name: 'body', indent: 1 },
  { type: 'tag-open', name: 'h2', indent: 2 },
  {
    type: 'content',
    indent: 3,
    parts: [{ text: t('home.about-hi'), highlight: true, heading: true }],
  },
  { type: 'tag-close', name: 'h2', indent: 2 },
  { type: 'tag-open', name: 'p', indent: 2 },
  {
    type: 'content',
    indent: 3,
    parts: [{ text: t('home.about.p1') }],
  },
  { type: 'tag-close', name: 'p', indent: 2 },
  { type: 'tag-open', name: 'p', indent: 2 },
  {
    type: 'content',
    indent: 3,
    parts: [
      { text: t('home.about.p2Before') },
      { text: t('home.about.p2Role'), highlight: true },
      { text: t('home.about.p2After') },
    ],
  },
  { type: 'tag-close', name: 'p', indent: 2 },
  { type: 'tag-open', name: 'p', indent: 2 },
  {
    type: 'content',
    indent: 3,
    parts: [{ text: t('home.about.p3') }],
  },
  { type: 'tag-close', name: 'p', indent: 2 },
  { type: 'tag-open', name: 'p', indent: 2 },
  {
    type: 'content',
    indent: 3,
    parts: [{ text: t('home.about.p4') }],
  },
  { type: 'tag-close', name: 'p', indent: 2 },
  { type: 'tag-close', name: 'body', indent: 1 },
  { type: 'tag-close', name: 'html', indent: 0 },
])

const lineCount = computed(() => lines.value.length)
</script>

<template>
  <div class="about-ide">
    <div class="about-ide__chrome">
      <div class="about-ide__titlebar">
        <div class="about-ide__tabs">
          <div class="about-ide__tab is-active base-font">
            <span class="about-ide__tab-icon" aria-hidden="true">&lt;/&gt;</span>
            <span class="about-ide__tab-label">about.html</span>
            <button
              type="button"
              class="about-ide__tab-close"
              aria-label="Close about.html"
              @click="onCloseClick"
            >
              ×
            </button>
          </div>
          <div class="about-ide__tab is-muted base-font">styles.css</div>
        </div>
        <p class="about-ide__path base-font">src › pages › about.html</p>
      </div>

      <div class="about-ide__editor">
        <div class="about-code base-font">
          <div
            v-for="(line, index) in lines"
            :key="index"
            class="about-code__row"
            :style="{ '--indent': line.indent ?? 0 }"
          >
            <span class="about-code__ln">{{ index + 1 }}</span>
            <div class="about-code__line">
              <template v-if="line.type === 'comment'">
                <span class="tok-comment">&lt;!--{{ line.text }}--&gt;</span>
              </template>

              <template v-else-if="line.type === 'tag-open'">
                <span class="tok-bracket">&lt;</span><span class="tok-tag">{{ line.name }}</span
                ><span class="tok-bracket">&gt;</span>
              </template>

              <template v-else-if="line.type === 'tag-close'">
                <span class="tok-bracket">&lt;/</span><span class="tok-tag">{{ line.name }}</span
                ><span class="tok-bracket">&gt;</span>
              </template>

              <template v-else-if="line.type === 'content'">
                <span
                  v-for="(part, partIndex) in line.parts"
                  :key="partIndex"
                  :class="[
                    part.heading ? 'about-code__heading' : '',
                    part.highlight ? 'tok-highlight' : 'tok-text',
                  ]"
                  >{{ part.text }}</span
                >
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="about-ide__status base-font">
        <div class="about-ide__status-group">
          <span class="about-ide__status-item is-accent">HTML</span>
          <span class="about-ide__status-item">UTF-8</span>
          <span class="about-ide__status-item">Spaces: 2</span>
        </div>
        <div class="about-ide__status-group">
          <span class="about-ide__status-item">Ln {{ lineCount }}, Col 1</span>
        </div>
      </div>
    </div>

    <Toast v-model="showToast" :message="t('home.about-close-toast')" />
  </div>
</template>

<style scoped>
.about-ide {
  margin-top: 2rem;
}

.about-ide__chrome {
  border-radius: var(--radius-lg);
  border: 1px solid rgba(67, 69, 77, 0.85);
  background: #161a1f;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(18, 247, 214, 0.06),
    0 28px 72px -36px rgba(0, 0, 0, 0.95),
    0 0 48px -24px rgba(18, 247, 214, 0.12);
}

.about-ide__titlebar {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.15));
  border-bottom: 1px solid var(--border);
}

.about-ide__tabs {
  display: flex;
  align-items: flex-end;
  gap: 0.25rem;
  min-width: 0;
  padding-bottom: 0;
}

.about-ide__tab {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  max-width: 11rem;
  padding: 0.4375rem 0.5rem 0.4375rem 0.875rem;
  font-size: 0.6875rem;
  border: 1px solid transparent;
  border-radius: 0.5rem 0.5rem 0 0;
  white-space: nowrap;
}

.about-ide__tab-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.about-ide__tab-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.125rem;
  height: 1.125rem;
  margin-left: 0.125rem;
  padding: 0;
  border: none;
  border-radius: 0.25rem;
  background: transparent;
  color: #6a737d;
  font-size: 0.875rem;
  line-height: 1;
  cursor: pointer;
  opacity: 1;
  transition: background 0.15s, color 0.15s;
}

.about-ide__tab-close:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text);
}

.about-ide__tab-close:focus-visible {
  outline: 1px solid var(--brand);
  outline-offset: 1px;
}

.about-ide__tab.is-active {
  color: var(--text);
  background: #1a1e23;
  border-color: var(--border);
  border-bottom-color: #1a1e23;
  position: relative;
  top: 1px;
}

.about-ide__tab.is-muted {
  color: #6a737d;
}

.about-ide__tab-icon {
  color: var(--brand);
  font-size: 0.625rem;
}

.about-ide__path {
  margin: 0;
  padding-bottom: 0.625rem;
  font-size: 0.625rem;
  color: #6a737d;
  white-space: nowrap;
}

.about-ide__editor {
  background: #1a1e23;
  overflow-x: auto;
}

.about-code {
  --indent-unit: 2ch;
  --gutter: 3rem;
  min-width: min(100%, 36rem);
}

.about-code__row {
  display: grid;
  grid-template-columns: var(--gutter) 1fr;
  min-height: 1.625rem;
  font-size: 0.8125rem;
  line-height: 1.625;
}

.about-code__row:hover {
  background: rgba(255, 255, 255, 0.025);
}

.about-code__ln {
  padding-right: 0.875rem;
  text-align: right;
  color: #4b5263;
  border-right: 1px solid rgba(67, 69, 77, 0.45);
  user-select: none;
}

.about-code__line {
  padding-left: calc(0.875rem + var(--indent) * var(--indent-unit));
  padding-right: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.tok-comment {
  color: #6a9955;
  font-style: italic;
}

.tok-bracket {
  color: #808080;
}

.tok-tag {
  color: #569cd6;
}

.tok-text {
  color: var(--text-muted);
}

.tok-highlight {
  color: var(--brand);
}

.about-code__heading {
  font-family: 'Ubuntu', sans-serif;
  font-size: 1.125rem;
  line-height: 1.5;
}

.about-ide__status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.3125rem 0.875rem;
  border-top: 1px solid var(--border);
  background: #12151a;
  font-size: 0.625rem;
  color: #6a737d;
  letter-spacing: 0.03em;
}

.about-ide__status-group {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.about-ide__status-item.is-accent {
  color: var(--brand);
}

@media (max-width: 640px) {
  .about-ide__titlebar {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .about-ide__path {
    grid-column: 1 / -1;
    padding-bottom: 0.5rem;
  }

  .about-ide__tab.is-muted {
    display: none;
  }
}
</style>
