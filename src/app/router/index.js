import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { BlogsPage } from '@/pages/blogs'
import { PortfolioPage } from '@/pages/portfolio'
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
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
})

export default router
