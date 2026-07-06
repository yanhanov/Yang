import { createI18n } from 'vue-i18n'
import en from '@/shared/config/locales/en.json'
import ru from '@/shared/config/locales/ru.json'

const savedLocale = localStorage.getItem('locale')
const defaultLocale = savedLocale || 'en'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: { en, ru },
})

export default i18n
