<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const display = ref('')
const roleIndex = ref(0)
const isDeleting = ref(false)
let timer

const roles = computed(() =>
  locale.value === 'ru'
    ? ['Lead Frontend', 'Frontend-инженер', 'Vue.js разработчик', 'TypeScript']
    : ['Lead Frontend Developer', 'Frontend Engineer', 'Vue.js Developer', 'TypeScript'],
)

const tick = () => {
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

onMounted(() => {
  timer = setTimeout(tick, 600)
})

onUnmounted(() => clearTimeout(timer))

watch(locale, () => {
  clearTimeout(timer)
  display.value = ''
  roleIndex.value = 0
  isDeleting.value = false
  timer = setTimeout(tick, 300)
})
</script>

<template>
  <span class="color-brand">
    {{ display }}<span class="cursor-blink">|</span>
  </span>
</template>

<style scoped>
.cursor-blink {
  animation: blink 1s step-end infinite;
  font-weight: 300;
}

@keyframes blink {
  50% { opacity: 0; }
}
</style>
