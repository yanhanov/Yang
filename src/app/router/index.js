import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { BlogsPage, BlogArticlePage } from '@/pages/blogs'
import { ProjectsPage } from '@/pages/projects'
import { NotFoundPage } from '@/pages/not-found'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 80 }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogsPage,
    },
    {
      path: '/blogs/:article',
      name: 'blog-article',
      component: BlogArticlePage,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
    },
    {
      path: '/portfolio',
      redirect: '/projects',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
})

export default router
