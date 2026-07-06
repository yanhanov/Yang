<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const display = ref('')
const roleIndex = ref(0)
const isDeleting = ref(false)
let timer
let suspended = false

const roles = computed(() =>
  locale.value === 'ru'
    ? [
        'Frontend-инженер',
        'Software-инженер',
        'Fullstack-инженер',
        'Мобильный разработчик',
        'Backend-разработчик',
      ]
    : [
        'Frontend Engineer',
        'Software Engineer',
        'Full Stack Engineer',
        'Mobile Developer',
        'Backend Developer',
      ],
)

const tick = () => {
  if (suspended) return

  const current = roles.value[roleIndex.value % roles.value.length]
  const full = current

  if (!isDeleting.value) {
    display.value = full.slice(0, display.value.length + 1)
    if (display.value === full) {
      isDeleting.value = true
      timer = setTimeout(tick, 2200)
      return
    }
    timer = setTimeout(tick, 80)
  } else {
    display.value = full.slice(0, display.value.length - 1)
    if (display.value === '') {
      isDeleting.value = false
      roleIndex.value++
      timer = setTimeout(tick, 400)
      return
    }
    timer = setTimeout(tick, 40)
  }
}

const resume = () => {
  if (!suspended) return
  suspended = false
  timer = setTimeout(tick, 200)
}

const onVisibility = () => {
  if (document.hidden) {
    suspended = true
    clearTimeout(timer)
    return
  }
  resume()
}

onMounted(() => {
  timer = setTimeout(tick, 600)
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  clearTimeout(timer)
  document.removeEventListener('visibilitychange', onVisibility)
})

watch(locale, () => {
  clearTimeout(timer)
  display.value = ''
  roleIndex.value = 0
  isDeleting.value = false
  if (!suspended) timer = setTimeout(tick, 300)
})
</script>

<template>
  <span class="color-brand"> {{ display }}<span class="cursor-blink">|</span> </span>
</template>

<style scoped>
.cursor-blink {
  animation: blink 1s step-end infinite;
  font-weight: 300;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
