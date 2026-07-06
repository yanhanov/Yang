export const projects = [
  {
    id: 'cookie',
    titleKey: 'work.cookie.title',
    descKey: 'work.cookie.desc',
    img: '/projects/cookie.png',
    url: 'https://информатик.онлайн/',
    tags: ['Vue 3', 'TypeScript', 'EdTech'],
    featured: true,
  },
  {
    id: 'stern-school',
    titleKey: 'work.stern-school.title',
    descKey: 'work.stern-school.desc',
    img: '/projects/stern-school.png',
    tags: ['Vue 3', 'TypeScript', 'EdTech'],
  },
  {
    id: 'stern-olymp',
    titleKey: 'work.stern-olymp.title',
    descKey: 'work.stern-olymp.desc',
    img: '/projects/stern-olymp.png',
    tags: ['Vue 3', 'TypeScript', 'EdTech'],
  },
  {
    id: 'yumashev',
    titleKey: 'work.yumashev.title',
    descKey: 'work.yumashev.desc',
    img: '/projects/yumashev.png',
    tags: ['Vue 3', 'TypeScript', 'EdTech'],
  },
  {
    id: 'lookformer',
    titleKey: 'work.lookformer.title',
    descKey: 'work.lookformer.desc',
    img: '/projects/lookformer.png',
    url: 'https://lookformer.ru/',
    tags: ['Vue 3', 'Lead', 'Architecture'],
    featured: true,
  },
  {
    id: 'neurounite',
    titleKey: 'work.neurounite.title',
    descKey: 'work.neurounite.desc',
    img: '/projects/neurounite.png',
    url: 'https://neurounit.ai/',
    tags: ['Vue', 'REST API', 'Performance'],
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3)
