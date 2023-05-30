import { ref, reactive } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { Commit, Tag, Branch } from "@/stores/Types";
import pako from "pako";


export const useGRepoStore = defineStore("grepo", () => {
  const FILE_NAME: Ref<string> = ref("");
  const branches: Ref<Branch[]> = ref([]);
  const tags: Ref<Tag[]> = ref([]);
  const commits: Ref<Commit[]> = ref([]);
  const chunks: { prev: any, current: any, next: any } = reactive({ prev: null, current: null, next: null });

  async function loadRepoData(name: string, singleFileMode = true) {
    if (singleFileMode) {
      FILE_NAME.value = "/repos/" + name + ".json.gz";
    } else {
      FILE_NAME.value = "/repos/" + name + "_chunked" + "/" + name + ".json.gz";
    }
    await readCommitsFromFile(singleFileMode);
  }

  async function readCommitsFromFile(singleFileMode = false) {
    if (singleFileMode) {
      const name = "https://gitvis.web.app/repos/express.json.gz";
      console.log(name, FILE_NAME.value);
      const data = await axios.get(FILE_NAME.value)//, {decompress: true });
      console.log(data);
      console.log(data.data);
      // let data2 = pako.inflate(data.data);
      // data2 = JSON.parse(new TextDecoder("utf-8").decode(data2));
      // console.log(data2);
      // @ts-ignore
      processData(data);
      // @ts-ignore
      processCommits(data.data.commits);
    } else {
      const data = await axios.get(
        FILE_NAME.value.replace(".json.gz", "_branches_and_tags.json.gz"),
        {
          decompress: true
        }
      );
      processData(data);
      loadChunks(1);
    }
  }

  async function readOwnRepoFromUpload(data: any) {
    processData(data);
    processCommits(data.data.commits);
  }

  async function loadChunks(chunkId: number) {
    if (chunks.current && chunks.current.id === chunkId) {
      return;
    }
    chunks.prev = chunks.current;
    chunks.current = chunks.next;
    chunks.next = await loadChunk(chunkId + 1);
    processCommits(chunks.current.commits);
  }

  async function loadChunk(chunkId: number) {
    try {
      const data = await axios.get(
        `${FILE_NAME.value.replace(".json.gz", "")}_commits_${chunkId}.json.gz`,
        { decompress: true }
      );
      return { id: chunkId, commits: data.data };
    } catch {
      return null;
    }
  }

  function processData(data: { data: { branches: any[], tags: any[] } }) {
    const { branches: dataBranches, tags: dataTags } = data.data;
    console.log(dataBranches, "why it's not iterable");
    for (const branch of dataBranches) {
      branches.value.push(
        new Branch(
          branch.name,
          branch.commitId,
          branch.commitMessage,
          new Date(branch.commitTime * 1000)
        )
      );
    }

    for (const tag of dataTags) {
      console.log(tag);
      tags.value.push(
        new Tag(tag.name, tag.commitId, tag.name, tag.commitMessage, new Date(tag.commitTime * 1000))
      );
    }
  }

  function processCommits(data: any[]) {
    for (const commit of data.slice(-2000)) {
      commits.value.push(
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
      );
    }
  }

  return {
    commits,
    tags,
    branches,
    loadRepoData,
    loadChunks,
    readOwnRepoFromUpload
  };
});
