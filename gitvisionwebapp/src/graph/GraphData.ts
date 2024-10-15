import type { Branch, Tag } from '@/stores/Types'
import { Commit } from '@/stores/Types'
import { GraphTraversal } from '@/graph/GraphTraversal'

export type CommitNode = {
  id: string
  commit: Commit
  topologicalOrder: number
  chronologicalOrder: number
  // j: number
  colorGroup: number
  color: string
}

export type CommitsLink = {
  source: string
  sourceCommit: Commit
  target: string
  targetCommit: Commit
  color: string
}

export class GraphData {
  public commits: Commit[] = []
  public branches: Branch[] = []
  public tags: Tag[] = []

  private commitNodes: CommitNode[] = []

  public commitsLinks: CommitsLink[] = []

  commitIdToNodeMap: Map<string, CommitNode> = new Map()

  updateData(commits: Commit[], branches: Branch[], tags: Tag[]) {
    this.commits = commits
    this.branches = branches
    this.tags = tags

    this.commitNodes = []
    this.commitsLinks = []
    this.commitIdToNodeMap = new Map()

    this.updateCommitNodes()
    this.updateCommitsLinks()
    GraphTraversal.colorNodes(this.commitIdToNodeMap)
    GraphTraversal.colorLinks(this.commitIdToNodeMap, this.commitsLinks)
    GraphTraversal.calculateChronologicalOrder(this.commitIdToNodeMap)
    GraphTraversal.calculateTopologicalOrder(this.commitIdToNodeMap)

    return {
      nodes: this.commitNodes,
      links: this.commitsLinks
    }
  }

  private updateCommitNodes() {
    for (const commit of this.commits) {
      const node = {
        id: commit.id,
        commit: commit,
        topologicalOrder: -1,
        chronologicalOrder: -1,
        colorGroup: -1,
        // j: -1,
        color: ''
      }
      this.commitIdToNodeMap.set(commit.id, node)
      this.commitNodes.push(node)
    }
  }

  private updateCommitsLinks() {
    for (const commit of this.commits) {
      for (const parentId of commit.parentsIds) {
        const distantPast = -1000
        if (!this.commitIdToNodeMap.has(parentId)) {
          const node = {
            id: parentId,
            commit: new Commit('', '', '', '', '', parentId, [], '', new Date(0), ''),
            chronologicalOrder: distantPast,
            topologicalOrder: distantPast,
            // j: -1,
            colorGroup: -1,
            color: ''
          }
          this.commitIdToNodeMap.set(parentId, node)
          this.commitNodes.push(node)
        }

        this.commitsLinks.push({
          target: commit.id,
          targetCommit: commit,
          source: parentId,
          // @ts-ignore
          sourceCommit: this.commitIdToNodeMap.get(parentId).commit,
          color: '#000000'
        })
      }
    }
  }
}
