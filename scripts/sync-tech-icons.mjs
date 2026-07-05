#!/usr/bin/env node
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/icons/tech')

const icons = {
  vue: 'Vue.js',
  typescript: 'TypeScript',
  nuxt: 'Nuxt-JS',
  react: 'React',
  nextjs: 'Next.js',
  javascript: 'JavaScript',
  tailwind: 'Tailwind-CSS',
  flutter: 'Flutter',
  rust: 'Rust',
  git: 'Git',
  socketio: 'Socket.io',
  rest: 'OpenAPI',
}

const base = 'https://icon.icepanel.io/Technology/svg'

for (const [file, name] of Object.entries(icons)) {
  const url = `${base}/${name}.svg`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
  const svg = await res.text()
  writeFileSync(join(outDir, `${file}.svg`), svg)
  console.log(`✓ ${file}.svg ← ${name}`)
}

console.log('Done — icons from https://techicons.dev')
