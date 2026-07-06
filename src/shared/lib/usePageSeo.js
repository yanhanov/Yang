import { onScopeDispose, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  SITE_NAME,
  SITE_DEFAULT_IMAGE,
  SITE_TWITTER,
  absoluteUrl,
} from '@/shared/config/site'

const MANAGED_SELECTOR = '[data-managed-seo]'

const DEFAULTS = {
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
  ogType: document.querySelector('meta[property="og:type"]')?.getAttribute('content') ?? 'website',
  ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') ?? '',
  ogDescription:
    document.querySelector('meta[property="og:description"]')?.getAttribute('content') ?? '',
  ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') ?? '',
  ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '',
  twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') ?? '',
  twitterDescription:
    document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ?? '',
  twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ?? '',
  canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
  lang: document.documentElement.lang || 'en',
}

function upsertMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector)

  if (!content) {
    el?.remove()
    return
  }

  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('data-managed-seo', '')
    document.head.appendChild(el)
  }

  el.setAttribute('content', content)
}

function upsertLink(rel, href, extra = {}) {
  const selector = `link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ''}`
  let el = document.head.querySelector(selector)

  if (!href) {
    el?.remove()
    return
  }

  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('data-managed-seo', '')
    document.head.appendChild(el)
  }

  el.setAttribute('href', href)

  if (extra.hreflang) {
    el.setAttribute('hreflang', extra.hreflang)
  } else {
    el.removeAttribute('hreflang')
  }
}

function upsertJsonLd(data) {
  const id = 'page-json-ld'
  let el = document.getElementById(id)

  if (!data) {
    el?.remove()
    return
  }

  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    el.setAttribute('data-managed-seo', '')
    document.head.appendChild(el)
  }

  el.textContent = JSON.stringify(data)
}

function clearManagedSeo() {
  document.head.querySelectorAll(MANAGED_SELECTOR).forEach((node) => node.remove())
  document.getElementById('page-json-ld')?.remove()
}

function restoreDefaultSeo() {
  clearManagedSeo()
  document.title = DEFAULTS.title
  document.documentElement.lang = DEFAULTS.lang

  upsertMeta('name', 'description', DEFAULTS.description)
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large')
  upsertMeta('name', 'twitter:title', DEFAULTS.twitterTitle)
  upsertMeta('name', 'twitter:description', DEFAULTS.twitterDescription)
  if (DEFAULTS.twitterImage) upsertMeta('name', 'twitter:image', DEFAULTS.twitterImage)
  else document.head.querySelector('meta[name="twitter:image"]')?.remove()

  upsertMeta('property', 'og:type', DEFAULTS.ogType)
  upsertMeta('property', 'og:title', DEFAULTS.ogTitle)
  upsertMeta('property', 'og:description', DEFAULTS.ogDescription)
  upsertMeta('property', 'og:url', DEFAULTS.ogUrl)
  if (DEFAULTS.ogImage) upsertMeta('property', 'og:image', DEFAULTS.ogImage)
  else document.head.querySelector('meta[property="og:image"]')?.remove()

  document.head.querySelector('meta[property="article:author"]')?.remove()
  document.head.querySelector('meta[property="article:published_time"]')?.remove()
  document.head.querySelector('meta[property="article:modified_time"]')?.remove()

  if (DEFAULTS.canonical) upsertLink('canonical', DEFAULTS.canonical)
  else document.head.querySelector('link[rel="canonical"]')?.remove()
}

const OG_LOCALES = {
  en: 'en_US',
  ru: 'ru_RU',
}

export function usePageSeo(getOptions) {
  const route = useRoute()
  const { locale } = useI18n()

  const stop = watch(
    [() => getOptions(), locale, () => route.path],
    () => {
      const options = typeof getOptions === 'function' ? getOptions() : getOptions
      if (!options) return

      clearManagedSeo()

      const {
        title,
        description,
        path = route.path,
        image = SITE_DEFAULT_IMAGE,
        type = 'website',
        publishedTime,
        modifiedTime,
        jsonLd,
        noindex = false,
      } = options

      const canonical = absoluteUrl(path)
      const imageUrl = absoluteUrl(image)
      const ogLocale = OG_LOCALES[locale.value] ?? OG_LOCALES.en

      document.title = title
      document.documentElement.lang = locale.value

      upsertMeta('name', 'description', description)
      upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
      upsertMeta('name', 'twitter:card', 'summary_large_image')
      upsertMeta('name', 'twitter:site', SITE_TWITTER)
      upsertMeta('name', 'twitter:title', title)
      upsertMeta('name', 'twitter:description', description)
      upsertMeta('name', 'twitter:image', imageUrl)

      upsertMeta('property', 'og:type', type)
      upsertMeta('property', 'og:site_name', SITE_NAME)
      upsertMeta('property', 'og:title', title)
      upsertMeta('property', 'og:description', description)
      upsertMeta('property', 'og:url', canonical)
      upsertMeta('property', 'og:image', imageUrl)
      upsertMeta('property', 'og:locale', ogLocale)

      if (type === 'article') {
        upsertMeta('property', 'article:author', SITE_NAME)
        if (publishedTime) upsertMeta('property', 'article:published_time', publishedTime)
        if (modifiedTime) upsertMeta('property', 'article:modified_time', modifiedTime)
      }

      upsertLink('canonical', canonical)

      if (jsonLd) {
        upsertJsonLd(jsonLd)
      }
    },
    { immediate: true, deep: true },
  )

  onScopeDispose(() => {
    stop()
    restoreDefaultSeo()
  })
}
