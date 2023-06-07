import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { Commit, Tag, Branch } from '@/stores/Types'
import pako from 'pako'
import { useRepoStore } from '@/stores/repositories'
import { analytics } from "@/utils/firebase";
import { logEvent } from "firebase/analytics";

export const useGRepoStore = defineStore('grepo', () => {
  const FILE_NAME: Ref<string> = ref('')
  const name: Ref<string> = ref('')
  const branches: Ref<Branch[]> = ref([])
  const tags: Ref<Tag[]> = ref([])
  const commits: Ref<Commit[]> = ref([])
  const hasLoadedCommits: Ref<boolean> = ref(false)
  const actualChunk: Ref<number> = ref(-1)
  const currentChunkCommits: Ref<Commit[]> = ref([])

  async function fetchData(path: string) {
    logEvent(analytics, 'fetchData', { path: path })
    const data = await axios.get(path, {
      responseType: 'arraybuffer',
      decompress: false
    })
    let data2
    try {
      data2 = pako.inflate(data.data)
      data2 = JSON.parse(new TextDecoder('utf-8').decode(data2))
    } catch (e) {
      data2 = JSON.parse(new TextDecoder().decode(data.data))
    }
    return data2
  }

  function reset() {
    FILE_NAME.value = ''
    branches.value = []
    tags.value = []
    commits.value = []
    actualChunk.value = -1
    currentChunkCommits.value = []
    hasLoadedCommits.value = false
    name.value = ''
  }

  async function loadRepoData(repo_name: string, singleFileMode = false) {
    reset()
    FILE_NAME.value = singleFileMode
      ? `/repos/${repo_name}.json.gz`
      : `/repos/${repo_name}_chunked/${repo_name}.json.gz`
    name.value = repo_name
    await readCommitsFromFile(singleFileMode)
  }

  async function readCommitsFromFile(singleFileMode = false) {
    if (singleFileMode) {
      const data = await fetchData(FILE_NAME.value)
      processData({ data: data })
      processCommits(data.commits)
    } else {
      const data = await fetchData(
        FILE_NAME.value.replace('.json.gz', '_branches_and_tags.json.gz')
      )
      processData({ data: data })
      const repos = useRepoStore()
      await loadChunk(repos.getNumberOfChunks(name.value))
      actualChunk.value = repos.getNumberOfChunks(name.value)
    }
  }

  async function readOwnRepoFromUpload(data: any) {
    reset()
    processData(data)
    processCommits(data.data.commits)
  }

  async function loadChunk(chunkId: number) {
    try {
      console.log('loading chunk', chunkId)
      const data = await fetchData(
        `${FILE_NAME.value.replace('.json.gz', '')}_commits_${chunkId}.json.gz`
      )
      processCommits(data)
    } catch {
      return null
    }
  }

  // @ts-ignore
  function processData({ data: { branches: dataBranches, tags: dataTags } }) {
    for (const branch of dataBranches) {
      branches.value.push(
        new Branch(
          branch.name,
          branch.commitId,
          branch.commitMessage,
          new Date(branch.commitTime * 1000)
        )
      )
    }

    for (const tag of dataTags) {
      tags.value.push(
        new Tag(
          tag.name,
          tag.commitId,
          tag.name,
          tag.commitMessage,
          new Date(tag.commitTime * 1000)
        )
      )
    }
  }

  function processCommits(data: any[]) {
    const result = []
    for (const commit of data) {
      result.push(
        new Commit(
          commit.author_name,
          commit.author_email,
          commit.branch,
          commit.committer_name,
          commit.committer_email,
          commit.commit_id,
          commit.parent_commits,
          commit.summary,
          new Date(commit.committed_date * 1000),
          commit.tag
        )
      )
    }

    commits.value.unshift(...result)
    hasLoadedCommits.value = true
  }

  async function getCommitsForViewFrame(count: number, start: number) {
    const result = []
    console.log('getCommitsForViewFrame', count, start)
    // COMMIT 0 IS LAST IN LAST CHUNK
    // COMMIT 1 IS SECOND LAST IN LAST CHUNK
    let startIndex = commits.value.length - 1 - start
    let endIndex = Math.max(startIndex - count, 0)
    if (endIndex <= 0) {
      await loadChunk(actualChunk.value - 1)
      actualChunk.value = actualChunk.value - 1
      startIndex = commits.value.length - 1 - start
      endIndex = Math.max(startIndex - count, 0)
    }

    for (let i = endIndex; i <= startIndex; i++) {
      result.push(commits.value[i])
    }
    console.log('result', result.length)
    console.log(result[0].id, result[result.length - 1].id)
    return result
  }

  return {
    tags,
    branches,
    loadRepoData,
    readOwnRepoFromUpload,
    getCommitsForViewFrame,
    hasLoadedCommits,
    canLoadMoreCommits: computed(() => {
      return actualChunk.value > 0
    })
  }
})
