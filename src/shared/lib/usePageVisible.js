import { onMounted, onUnmounted } from 'vue'

function syncPageHidden() {
  document.documentElement.classList.toggle('page-hidden', document.hidden)
}

export function usePageVisible() {
  onMounted(() => {
    syncPageHidden()
    document.addEventListener('visibilitychange', syncPageHidden)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', syncPageHidden)
    document.documentElement.classList.remove('page-hidden')
  })
}
