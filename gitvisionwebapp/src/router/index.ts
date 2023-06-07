import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useGRepoStore } from '@/stores/gRepoStore'
import { analytics, firebase } from "@/utils/firebase";
import { logEvent } from "firebase/analytics";

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/own',
      name: 'own',
      component: () => import('@/views/GView.vue')
    },
    {
      path: '/localupload',
      name: 'localupload',
      component: () => import('@/views/GView.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/g/:owner/:repository/:until?',
      name: 'g',
      component: () => import('@/views/GView.vue')
    }
  ]
})

router.beforeResolve(async (to) => {
  logEvent(analytics, 'page_view', {
    page_title: typeof to.name === 'string' ? to.name : 'undefined',
    page_location: window.location.href,
    page_path: to.path,
  })
  try {
    const repoStore = useGRepoStore()
    if (to.name === 'own') {
      try {
        await repoStore.loadRepoData('own', true)
      } catch (e) {
        console.log(e)
      }
    } else if (to.params.owner && to.params.repository) {
      const repo: string = to.params.repository as string
      await repoStore.loadRepoData(repo as string)
    }
  } catch (e) {
    console.log(e)
  }
})

export default router
