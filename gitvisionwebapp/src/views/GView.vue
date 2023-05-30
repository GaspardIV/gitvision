<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import "aframe";
import "aframe-extras";
import "aframe-htmlembed-component";
import { useGRepoStore } from "@/stores/gRepoStore";

import { CommitsGraph } from "@/graph/CommitsGraph";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import type { Entity, ObjectMap } from "aframe";

const repo = useGRepoStore();
const element = ref();
const commitsGraph = new CommitsGraph();

window.hoverNode = (node: any) => {
  let tooltip = document.querySelector("#forcegraph-tooltip");
  if (node) {
    let commit = node.commit;
    tooltip.querySelector("#author").textContent = commit.author + " (" + commit.authorMail + ")";
    tooltip.querySelector("#committer").textContent = commit.committer + " (" + commit.committerMail + ")";
    tooltip.querySelector("#ID").textContent = commit.id;
    tooltip.querySelector("#short").textContent = commit.short;
    let commitTime = commit.time;
    let timeSinceCommit = timeSince(commitTime); // Function to calculate time difference
    //
    // new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', weekday:"long", hour: '2-digit', hour12: false, minute:'2-digit', second:'2-digit'}),
    tooltip.querySelector('#time').textContent = `${commitTime.toLocaleString()}`;

    // Display time in two formats
    tooltip.querySelector('#time').textContent += ' (' + timeSinceCommit + ' ago)';
    // tooltip.setAttribute('style', 'display: block');
    tooltip.querySelector("#page").setAttribute("style", "display: block");
  } else {
    tooltip.querySelector("#page").setAttribute("style", "display: none");
    // tooltip.setAttribute('style', 'display: none');
  }
};
const fillGraphData = () => {
  commitsGraph.updateWithData(repo.commits, repo.branches, repo.tags);
  const sceneEl = document.querySelector("a-scene");
  setTimeout(() => commitsGraph.initTagsAndBranches(sceneEl), 2000);
};

function updateTagPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeTagPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    el.parentNode.removeChild(el);
  }
}

function updateBranchPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeBranchPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    el.parentNode.removeChild(el);
  }
}

function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

onMounted(() => {
  let tooltip = document.querySelector("#forcegraph-tooltip #page");

  tooltip.setAttribute("style", "opacity: 0");

  if (AFRAME.components.tag) delete AFRAME.components.tag;
  AFRAME.registerComponent("tag", {
    tick(time: number, timeDelta: number) {
      const el = this.el;
      const commitId = this.data;
      updateTagPosition(el, commitId);
    }
  });

  if (AFRAME.components.branch) delete AFRAME.components.branch;
  AFRAME.registerComponent("branch", {
    tick(time: number, timeDelta: number) {
      const el = this.el;
      const commitId = this.data;
      updateBranchPosition(el, commitId);
    }
  });

  if (AFRAME.components.foo) delete AFRAME.components.foo;
  AFRAME.registerComponent("foo", {
    init: function() {
      setTimeout(() => {
        commitsGraph.setup(this.el.components.forcegraph.forceGraph);
        if (repo.commits) {
          fillGraphData();
        }
      }, 1000);
    }
  });
});

watch(repo.commits, fillGraphData);
onUpdated(fillGraphData);
onUnmounted(() => {
  delete AFRAME.components.foo;
  delete AFRAME.components.tag;
});

</script>

<template>
  <a-scene stats class="graph" fog="type: linear; color: #000; near:1; far: 100000"
           vr-mode-ui=" enterARButton: #enter-ar">
    <a-entity id="rig"
              rotation="0 270 0"
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
        <a-cursor color="lavender" opacity="0.5" raycaster="objects: [forcegraph]">
          <a-entity id="forcegraph-tooltip" position="0 -0.9 -1" htmlembed>
            <div id="page" class="screen dark main">
              <div class="time-section">
                <p><span class="label"></span> <span class="data" id="time"></span></p>
              </div>
              <div class="message-section">
                <p><span class="label"></span> <span class="data" id="short"></span></p>
              </div>
              <div class="info-section">
                <p><span class="label">Author:</span> <span class="data" id="author"></span></p>
                <p><span class="label">Committer:</span> <span class="data" id="committer"></span></p>
              </div>
              <div class="sha-section">
                <p><span class="label">SHA:</span> <span class="data" id="ID"></span></p>
              </div>
            </div>
          </a-entity>
        </a-cursor>
      </a-camera>
    </a-entity>
    <a-entity forcegraph="on-node-hover: hoverNode" foo></a-entity>
    <div id="enter-ar" hidden="">
    </div>
  </a-scene>
</template>

<style scoped>
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
