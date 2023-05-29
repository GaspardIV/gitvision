<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import "aframe";
import "aframe-extras";
import { useGRepoStore } from "@/stores/gRepoStore";

import { CommitsGraph } from "@/graph/CommitsGraph";

const repo = useGRepoStore();
const element = ref();
const commitsGraph = new CommitsGraph();


const fillGraphData = () => {
  commitsGraph.updateWithData(repo.commits, repo.branches, repo.tags);
};


onMounted(() => {
  AFRAME.registerComponent("foo", {
    init: function() {
      setTimeout(() => {
        var allObjects = this.el.sceneEl.object3D.children;
        console.log("allObjects", this.el.components.forcegraph.forceGraph);
        commitsGraph.setup(this.el.components.forcegraph.forceGraph);
        if (repo.commits) {
          fillGraphData();
          console.log("filling graph data", repo.commits);
        }
      }, 1000);
    }
  });
});

watch(repo.commits, fillGraphData);
onUpdated(fillGraphData);
onUnmounted(() => {
  delete AFRAME.components.foo;
});
</script>

<template>
  <a-scene stats class="graph" fog="type: linear; color: #000; near:1; far: 100000"
           vr-mode-ui=" enterARButton: #enter-ar">
    <a-entity id="rig"
              movement-controls="camera: #camera; constrainToNavMesh: true; fly: true; speed: 205.5;"
              position="25 0 25">
      <a-entity cursor="rayOrigin: mouse; mouseCursorStylesEnabled: true;"
                raycaster="objects: [forcegraph];"></a-entity>
      <a-entity laser-controls="hand: left"
                raycaster="objects: [forcegraph]; lineColor: lavander; lineOpacity: 0.85;"></a-entity>
      <a-entity laser-controls="hand: right"
                raycaster="objects: [forcegraph]; lineColor: lavander; lineOpacity: 0.85;"></a-entity>
      <a-camera
        camera
        id="camera"
        position="0 1.6 0"
        far="100000"
        look-controls="pointerLockEnabled: true">

         <a-cursor color="lavender" opacity="0.5" raycaster="objects: [forcegraph]"></a-cursor>
        <a-text
          id="forcegraph-tooltip"
          position="0 -0.25 -1"
          width="2"
          align="center"
          color="lavender"
        ></a-text>
      </a-camera>
    </a-entity>
    <a-entity forcegraph="
      on-node-hover: node => document.querySelector('#forcegraph-tooltip').setAttribute('value', node ? node.commit.short : '');"
              foo
    >
    </a-entity>
    <div id="enter-ar" hidden="">
    </div>
  </a-scene>


  <!--  <div id="dom-overlay">-->
  <!--    <h1>-->
  <!--      GitVision-->
  <!--    </h1>-->
  <!--    <div id="dom-overlay-message">Enter AR to start.</div>-->
  <!--  </div>-->
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

#dom-overlay-message {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  background: #33333355;
  border-top: 5px solid #ffffff55;
  color: white;
}

.a-dom-overlay button {
  padding: 1em;
  appearance: none;
  background: #00000055;
  border: 3px solid white;
  border-radius: 1em;
  margin: 1em 1em 0 0;
  color: white;
}
</style>
