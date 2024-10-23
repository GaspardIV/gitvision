import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Repo } from '@/stores/Types'
import { logEvent } from 'firebase/analytics'
import { analytics } from '@/utils/firebase'
import axios from 'axios'

export const useRepoStore = defineStore('repositories', () => {
  const repos: Ref<Repo[]> = ref([])

  const loadRepos = async () => {
    logEvent(analytics, 'loadRepos')
    const data = await axios.get('/repositories.json')
    repos.value = data.data
  }

  const getNumberOfChunks = (repoName: string) => {
    const repo = repos.value.find((repo) => repo.url.includes(repoName))
    return repo ? repo.numberOfChunks : 1
  }
  loadRepos()
  return {
    repos: repos,
    loadRepos,
    getNumberOfChunks
  }
})
