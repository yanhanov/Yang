<script setup>
import { ref } from 'vue'
import { useScrollFrame } from '@/shared/lib'

const visible = ref(false)

useScrollFrame(() => {
  const next = window.scrollY > 500
  if (next !== visible.value) visible.value = next
})

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="fade">
    <button
      v-if="visible"
      type="button"
      class="back-to-top"
      aria-label="Back to top"
      @click="scrollTop"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M12 5L6 11M12 5l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--brand);
  color: var(--surface);
  border: none;
  cursor: pointer;
  box-shadow: 0 8px 32px -8px rgba(18, 247, 214, 0.6);
  transition: transform 0.2s, box-shadow 0.2s;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px -8px rgba(18, 247, 214, 0.8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
