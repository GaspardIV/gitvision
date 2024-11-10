<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import 'aframe'
import AFRAME from 'aframe'
import 'aframe-extras'
import 'aframe-htmlembed-component'
import { useGRepoStore } from '@/stores/gRepoStore'

import { CommitsGraph } from '@/graph/CommitsGraph'
import type { Entity } from 'aframe'

const numberOfCommits = ref(5000)
let currentCommitBegin = ref(0)

const repo = useGRepoStore()
const commitsGraph = new CommitsGraph()


const nextFramePosition = ref({ x: 0, y: 0, z: 0 });
const prevFramePosition = ref({ x: 0, y: 0, z: 0 });


const showNextFrame = computed(() => repo.canLoadMoreCommits(currentCommitBegin.value + numberOfCommits.value));
const showPrevFrame = computed(() => currentCommitBegin.value > 0);

const nextFrameText = computed(() => ({
  value: `Pass to load next frame\nCommits ${currentCommitBegin.value + numberOfCommits.value} - ${currentCommitBegin.value + 2 * numberOfCommits.value}`,
  align: "center",
  color: "#000000",
}));

const prevFrameText = computed(() => ({
  value: `Pass to load previous frame\nCommits ${Math.max(0, currentCommitBegin.value - numberOfCommits.value)} - ${currentCommitBegin.value}`,
  align: "center",
  color: "#000000",
}));

function updateFramePlanePositions(userPosition: THREE.Vector3) {
  nextFramePosition.value = {
    x: numberOfCommits.value * 50,
    y: userPosition.y,
    z: userPosition.z,
  };
  prevFramePosition.value = {
    x: 0,
    y: userPosition.y,
    z: userPosition.z,
  };
}


const fillGraphData = async () => {
  commitsGraph.updateWithData(
    await repo.getCommitsForViewFrame(numberOfCommits.value, currentCommitBegin.value),
    repo.branches,
    repo.tags
  );
  const sceneEl = document.querySelector("a-scene");
  setTimeout(() => commitsGraph.initTagsAndBranches(sceneEl), 2000);
};

function updateTagPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeTagPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    el.parentNode?.removeChild(el);
  }
}

function updateBranchPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeBranchPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    el.parentNode?.removeChild(el);
  }
}

function timeSince(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " years";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes";
  return Math.floor(seconds) + " seconds";
}

// @ts-ignore
window.hoverNode = (node: any) => {
  const tooltip = document.querySelector("#forcegraph-tooltip") as HTMLElement;
  if (node) {
    const commit = node.commit;
    tooltip.querySelector("#author")!.textContent = `${commit.author} (${commit.authorMail})`;
    tooltip.querySelector("#committer")!.textContent = `${commit.committer} (${commit.committerMail})`;
    tooltip.querySelector("#ID")!.textContent = commit.id;
    tooltip.querySelector("#short")!.textContent = commit.short;
    const commitTime = new Date(commit.time);
    const timeSinceCommit = timeSince(commitTime);
    const timeElement = tooltip.querySelector('#time')!;
    timeElement.textContent = `${commitTime.toLocaleString()} (${timeSinceCommit} ago)`;
    tooltip.style.display = "block";
  } else {
    tooltip.style.display = "none";
  }
};

onMounted(() => {
  if (AFRAME.components.tag) delete AFRAME.components.tag;
  AFRAME.registerComponent("tag", {
    schema: { type: 'string' },
    tick() {
      const el = this.el;
      const commitId = this.data;
      updateTagPosition(el, commitId);
    },
  });

  if (AFRAME.components.branch) delete AFRAME.components.branch;
  AFRAME.registerComponent("branch", {
    schema: { type: 'string' },
    tick() {
      const el = this.el;
      const commitId = this.data;
      updateBranchPosition(el, commitId);
    },
  });

  if (AFRAME.components.graphloader) delete AFRAME.components.graphloader;
  AFRAME.registerComponent("graphloader", {
    init() {
      // @ts-ignore
      commitsGraph.setup(this.el.components.forcegraph.forceGraph);
      if (repo.hasLoadedCommits) {
        fillGraphData();
      }
    },
  });

  if (AFRAME.components.frameloader) delete AFRAME.components.frameloader;
  AFRAME.registerComponent("frameloader", {
    tick: async function () {
      const userPosition = this.el.object3D.position;
      updateFramePlanePositions(userPosition);

      const x = userPosition.x;

      if (x > numberOfCommits.value * 50 && showNextFrame.value) {
        currentCommitBegin.value += numberOfCommits.value;
        this.el.object3D.position.x = 0;
        this.el.object3D.position.y = 0
        await fillGraphData();
      } else if (x < prevFramePosition.value.x && showPrevFrame.value) {
        currentCommitBegin.value = Math.max(0, currentCommitBegin.value - numberOfCommits.value);
        await fillGraphData();
        this.el.object3D.position.x = numberOfCommits.value * 50;
        this.el.object3D.position.y = numberOfCommits.value  * 10;
      }
    },
  });
});

watch([repo.hasLoadedCommits], fillGraphData);
// onUpdated(fillGraphData);
onUnmounted(() => {
  delete AFRAME.components.graphloader;
  delete AFRAME.components.tag;
  delete AFRAME.components.branch;
  delete AFRAME.components.frameloader;
});

</script>

<template>
  <a-scene
    class="graph"
    fog="type: linear; color: #000; near:1; far: 100000"
    :vr-mode-ui="
      !AFRAME.utils.device.checkHeadsetConnected()
        ? 'enterARButton: #enter-ar; enterVRButton: #enter-vr; enabled: false;'
        : ''
    "
  >
    <a-plane
      v-if="showNextFrame"
      :position="nextFramePosition"
      color="#CCCCCC80"
      width="1000"
      height="1000"
      rotation="0 270 0"
      :text="nextFrameText"
    ></a-plane>

    <a-plane
      v-if="showPrevFrame"
      :position="prevFramePosition"
      color="#CCCCCC80"
      width="1000"
      height="1000"
      rotation="0 90 0"
      :text="prevFrameText"
    ></a-plane>

    <a-entity
      id="rig"
      rotation="0 270 0"
      movement-controls="camera: #camera; fly: true; speed: 420;"
      position="25 0 25"
      frameloader
    >
      <a-entity
        cursor="rayOrigin: mouse; mouseCursorStylesEnabled: true;"
        raycaster="objects: [forcegraph];"
      ></a-entity>
      <a-entity
        laser-controls="hand: left"
        raycaster="objects: [forcegraph]; lineOpacity: 0.85;"
      ></a-entity>
      <a-entity
        laser-controls="hand: right"
        raycaster="objects: [forcegraph]; lineOpacity: 0.85;"
      ></a-entity>
      <a-camera
        camera
        id="camera"
        position="0 1.6 0"
        far="100000"
        look-controls="pointerLockEnabled: true"
      >
        <a-cursor color="green" opacity="0.5" raycaster="objects: [forcegraph]">
          <!--          <a-entity id="forcegraph-tooltip" position="0 -0.9 -1" htmlembed visible="false" >-->
          <!--            <div id="page" class="screen dark main">-->
          <!--              <div class="time-section">-->
          <!--                <p><span class="label"></span> <span class="data" id="time"></span></p>-->
          <!--              </div>-->
          <!--              <div class="message-section">-->
          <!--                <p><span class="label"></span> <span class="data" id="short"></span></p>-->
          <!--              </div>-->
          <!--              <div class="info-section">-->
          <!--                <p><span class="label">Author:</span> <span class="data" id="author"></span></p>-->
          <!--                <p><span class="label">Committer:</span> <span class="data" id="committer"></span></p>-->
          <!--              </div>-->
          <!--              <div class="sha-section">-->
          <!--                <p><span class="label">SHA:</span> <span class="data" id="ID"></span></p>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </a-entity>-->
          <!--          <a-entity geometry="primitive: box" material="shader: html; target: #forcegraph-tooltip"></a-entity>-->
        </a-cursor>
      </a-camera>
    </a-entity>
    <a-entity forcegraph="on-node-hover: hoverNode" graphloader></a-entity>
    <div id="enter-ar" hidden></div>
    <div id="enter-vr" hidden></div>
  </a-scene>
  <div id="forcegraph-tooltip" style="display: none">
    <div id="page" class="dark__ main__" style="position: absolute; z-index: 101">
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
  </div>
  <div class="controlls-info">
    <p>
      [Desktop 3D]: WSAD=Fly, Mouse=Rotate, Esc=Cursor<BR /> [Mobile 3D/AR/VR]: Touch=Fly,
      Tilt=Rotate<BR /> [Headset AR/VR]: Joysticks=Fly, Head=Rotate
    </p>
  </div>
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

.controlls-info {
  position: absolute;
  bottom: 0;
  text-align: LEFT;
  left: 0;
  right: 0;
  font-size: 10px;
  font-family: sans-serif;
  z-index: 100;
}
</style>
