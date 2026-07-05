<script setup>
import { onUnmounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '// notice',
  },
  duration: {
    type: Number,
    default: 3200,
  },
})

const emit = defineEmits(['update:modelValue'])

let timer

function close() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  (open) => {
    clearTimeout(timer)
    if (open) {
      timer = setTimeout(close, props.duration)
    }
  },
)

onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="modelValue"
        class="toast"
        role="status"
        aria-live="polite"
        :style="{ '--toast-duration': `${duration}ms` }"
      >
        <div class="toast__body">
          <div class="toast__header">
            <span class="toast__label base-font">{{ label }}</span>
            <button type="button" class="toast__close base-font" aria-label="Dismiss" @click="close">
              ×
            </button>
          </div>

          <p class="toast__message secont-font">{{ message }}</p>

          <div class="toast__track" aria-hidden="true">
            <span class="toast__progress" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  --toast-duration: 3200ms;
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 100;
  display: block;
  width: min(calc(100vw - 2.5rem), 22rem);
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-accent);
  background:
    radial-gradient(ellipse 120% 80% at 100% 0%, rgba(18, 247, 214, 0.1), transparent 55%),
    rgba(26, 30, 35, 0.94);
  backdrop-filter: blur(16px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 24px 64px -28px rgba(0, 0, 0, 0.95),
    0 0 40px -16px rgba(18, 247, 214, 0.22);
}

.toast__body {
  padding: 0.875rem 1rem 0.75rem;
}

.toast__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.375rem;
}

.toast__label {
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brand);
}

.toast__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  background: transparent;
  color: #6a737d;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.toast__close:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.toast__close:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 1px;
}

.toast__message {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.45;
  color: var(--text);
}

.toast__track {
  margin-top: 0.875rem;
  height: 2px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.toast__progress {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--brand), #0c73b8);
  transform-origin: left center;
  animation: toast-progress var(--toast-duration) linear forwards;
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 0.32s ease,
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(1rem) scale(0.97);
}

@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0);
  }
}

@media (max-width: 640px) {
  .toast {
    right: 1rem;
    left: 1rem;
    width: auto;
  }
}
</style>
