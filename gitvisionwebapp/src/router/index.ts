import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useGRepoStore } from '@/stores/gRepoStore'
import GView from '@/views/GView.vue'

const router = createRouter({
  // @ts-ignore
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/own',
      name: 'own',
      component: () => GView
    },
    {
      path: '/localupload',
      name: 'localupload',
      component: () => GView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/g/:owner/:repository/:until?',
      name: 'g',
      component: () => GView
    }
  ]
})

router.beforeResolve(async (to) => {
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
