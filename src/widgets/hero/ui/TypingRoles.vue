<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const roleIndex = ref(0)
const visible = ref(true)
let timer
let suspended = false

const roles = computed(() =>
  locale.value === 'ru'
    ? [
        'Middle Software Engineer',
        'Fullstack-инженер',
        'Мобильный разработчик',
      ]
    : [
        'Middle Software Engineer',
        'Full Stack Engineer',
        'Mobile Developer',
      ],
)

const current = computed(() => roles.value[roleIndex.value % roles.value.length])

const advance = () => {
  if (suspended) return
  visible.value = false
  timer = setTimeout(() => {
    roleIndex.value++
    visible.value = true
    timer = setTimeout(advance, 3200)
  }, 320)
}

const onVisibility = () => {
  if (document.hidden) {
    suspended = true
    clearTimeout(timer)
    return
  }
  suspended = false
  timer = setTimeout(advance, 2400)
}

onMounted(() => {
  timer = setTimeout(advance, 2800)
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  clearTimeout(timer)
  document.removeEventListener('visibilitychange', onVisibility)
})

watch(locale, () => {
  clearTimeout(timer)
  roleIndex.value = 0
  visible.value = true
  if (!suspended) timer = setTimeout(advance, 2800)
})
</script>

<template>
  <span class="roles" :class="{ 'roles--hidden': !visible }">{{ current }}</span>
</template>

<style scoped>
.roles {
  display: inline-block;
  color: var(--opening-text);
  transition:
    opacity 0.32s ease,
    transform 0.32s ease;
}

.roles--hidden {
  opacity: 0;
  transform: translateY(0.25rem);
}

@media (prefers-reduced-motion: reduce) {
  .roles {
    transition: none;
  }

  .roles--hidden {
    opacity: 1;
    transform: none;
  }
}
</style>
