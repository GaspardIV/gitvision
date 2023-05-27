<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { THREE } from 'aframe'
import { useGRepoStore } from '@/stores/gRepoStore'
import { CommitsGraph } from '@/graph/CommitsGraph'

const repo = useGRepoStore()
const element = ref()
const commitsGraph = new CommitsGraph()

const fillGraphData = () => {
  commitsGraph.updateWithData(repo.commits, repo.branches, repo.tags)
}
onMounted(() => {
  if (element.value) commitsGraph.setup(element.value) // todo can be setup only once onMounted
  if (repo.commits) {
    fillGraphData()
    console.log('filling graph data', repo.commits)
  }
})

watch(repo.commits, fillGraphData)
onUpdated(fillGraphData)
onUnmounted(() => {})
</script>

<template>
  <div ref="element" id="3d-graph" class="graph"></div>
</template>

<style>
.graph {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
