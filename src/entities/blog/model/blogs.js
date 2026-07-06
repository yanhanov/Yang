export const blogs = [
  {
    id: 'why-front',
    img: '/blogs/why-front.webp',
    date: '2025-11-12',
    titleRu: 'Почему я выбрал фронтенд',
    titleEn: 'Why I Chose Frontend Development',
    paragraphsRu: [
      'Фронтенд — это место, где код сразу становится опытом для пользователя. Ты видишь результат своей работы мгновенно: анимация, отклик кнопки, плавный скролл. Именно эта связь между логикой и интерфейсом меня и зацепила.',
      'Vue.js дал баланс между скоростью разработки и масштабируемостью — компоненты, реактивность, предсказуемая экосистема. С ним удобно расти от небольших pet-проектов до продуктовых платформ, где важны архитектура и поддерживаемость.',
      'Каждый новый проект учит чему-то конкретному: перформанс, доступность, UX-паттерны, работа с дизайн-системой. Фронтенд не стоит на месте — и мне нравится, что здесь всегда есть куда расти.',
      'Именно поэтому я остаюсь во фронтенде и двигаюсь от Junior к Lead: не ради титула, а ради ответственности за продукт, который люди реально используют каждый день.',
    ],
    paragraphsEn: [
      'Frontend is where code instantly becomes user experience. You see the result of your work right away — motion, button feedback, smooth scrolling. That direct link between logic and interface is what pulled me in.',
      'Vue.js struck the right balance between development speed and scalability: components, reactivity, and a predictable ecosystem. It scales well from small pet projects to product platforms where architecture and maintainability matter.',
      'Every new project teaches something specific: performance, accessibility, UX patterns, design systems. Frontend never stands still — and I like that there is always room to grow.',
      'That is why I stay in frontend and move from Junior to Lead — not for the title, but for ownership of a product people actually use every day.',
    ],
  },
  {
    id: 'front-fighter',
    img: '/blogs/front-fighter.webp',
    date: '2025-09-03',
    titleRu: 'Мой путь фронтенд-разработчика',
    titleEn: 'My Path as a Frontend Developer',
    paragraphsRu: [
      'Начинал с вёрстки и JavaScript — когда впервые ожил интерфейс после пары строк кода, стало ясно: это моё. Потом пришли Vue и TypeScript, и разработка перестала быть набором трюков — появилась система.',
      'Фриланс на Kwork научил работать с дедлайнами, заказчиками и неопределённостью: когда ТЗ размытое, а релиз через неделю. Это хорошая школа ответственности до продуктовых команд.',
      'В Neurounite, Lookformer и cookie.rf я прошёл путь от фич до архитектуры: компонентные системы, code review, релизы в продакшен, менторство. Разные домены — EdTech, SaaS, AI — но везде одна цель: стабильный UX и чистый код.',
      'Главный урок за эти годы: хороший продукт строится не количеством технологий в резюме, а ясностью мышления, качеством интерфейса и умением доводить задачи до конца.',
    ],
    paragraphsEn: [
      'I started with layout and JavaScript — the moment an interface came alive after a few lines of code, I knew this was for me. Then Vue and TypeScript arrived, and development stopped being a bag of tricks — it became a system.',
      'Freelancing on Kwork taught me deadlines, clients, and ambiguity: when requirements are vague and the release is a week away. A solid lesson in ownership before joining product teams.',
      'At Neurounite, Lookformer, and cookie.rf I went from shipping features to owning architecture: component systems, code review, production releases, mentoring. Different domains — EdTech, SaaS, AI — but the same goal: stable UX and clean code.',
      'The main lesson over these years: great products are not built by the number of technologies on a resume, but by clear thinking, interface quality, and the ability to finish what you start.',
    ],
  },
]

export function getBlogBySlug(slug) {
  return blogs.find((blog) => blog.id === slug)
}

export function getBlogParagraphs(blog, locale) {
  return locale === 'en' ? blog.paragraphsEn : blog.paragraphsRu
}

export function getBlogTitle(blog, locale) {
  return locale === 'en' ? blog.titleEn : blog.titleRu
}

export function getBlogExcerpt(blog, locale, limit = 180) {
  const paragraphs = getBlogParagraphs(blog, locale)
  const text = paragraphs.join(' ')
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text
}

export function getBlogSlug(blog) {
  return blog.id
}
