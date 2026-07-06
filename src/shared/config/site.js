export const SITE_URL = 'https://yanhanov.com'
export const SITE_NAME = 'Yazmyrat Hanov'
export const SITE_AUTHOR = 'Yazmyrat Hanov'
export const SITE_AUTHOR_URL = SITE_URL
export const SITE_DEFAULT_IMAGE = '/yan-profile-280.webp'
export const SITE_TWITTER = '@yanhanov'

export function absoluteUrl(path = '/') {
  if (!path || path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
