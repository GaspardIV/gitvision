<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref, watch } from "vue";
import "aframe";
import  AFRAME from "aframe";
import "aframe-extras";
import "aframe-htmlembed-component";
import { useGRepoStore } from "@/stores/gRepoStore";

import { CommitsGraph } from "@/graph/CommitsGraph";
import type { Entity } from "aframe";

const numberOfCommits = ref(3000);
let currentCommitBegin = ref(0); // start at 3000

const repo = useGRepoStore();
const commitsGraph = new CommitsGraph();

// @ts-ignore
window.hoverNode = (node: any) => {
  let tooltip = document.querySelector("#forcegraph-tooltip");
  if (node) {
    let commit = node.commit;
    // @ts-ignore
    tooltip.querySelector("#author").textContent = commit.author + " (" + commit.authorMail + ")";
    // @ts-ignore
    tooltip.querySelector("#committer").textContent = commit.committer + " (" + commit.committerMail + ")";
    // @ts-ignore
    tooltip.querySelector("#ID").textContent = commit.id;
    // @ts-ignore
    tooltip.querySelector("#short").textContent = commit.short;
    let commitTime = commit.time;
    let timeSinceCommit = timeSince(commitTime);
    // @ts-ignore
    tooltip.querySelector('#time').textContent = `${commitTime.toLocaleString()}`;
    // @ts-ignore
    tooltip.querySelector('#time').textContent += ' (' + timeSinceCommit + ' ago)';
    // @ts-ignore
    tooltip.setAttribute("style", "display: block;");
  } else {
    // @ts-ignore
    tooltip.setAttribute("style", "display: none;");
  }
};
const fillGraphData = async () => {
  commitsGraph.updateWithData(await repo.getCommitsForViewFrame(numberOfCommits.value, currentCommitBegin.value), repo.branches, repo.tags);
  const sceneEl = document.querySelector("a-scene");
  setTimeout(() => commitsGraph.initTagsAndBranches(sceneEl), 2000);
};

function updateTagPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeTagPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    // @ts-ignore
    el.parentNode.removeChild(el);
  }
}

function updateBranchPosition(el: Entity, commitId: any) {
  const position = commitsGraph.getNodeBranchPosition(commitId);
  if (position) {
    el.setAttribute("position", position);
  } else {
    // @ts-ignore
    el.parentNode.removeChild(el);
  }
}
// @ts-ignore
function timeSince(date) {

  // @ts-ignore
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
      // @ts-ignore
        commitsGraph.setup(this.el.components.forcegraph.forceGraph);
        if (repo.hasLoadedCommits) {
          fillGraphData();
        }
    }
  });
  if (AFRAME.components.cameralog) delete AFRAME.components.cameralog;
  AFRAME.registerComponent("cameralog", {
    tick: async function() {
      let x = this.el.object3D.position.x;
      if (x > (numberOfCommits.value) * 50 /*+ 1000 */&& repo.canLoadMoreCommits) {
        currentCommitBegin.value += numberOfCommits.value;

        this.el.object3D.position.x = 0;
        this.el.object3D.position.y = 0;
        await fillGraphData()
        this.el.object3D.position.x = 0;
      } else if (x < 0/*- 1000*/ && currentCommitBegin.value > 0) {
        currentCommitBegin.value -= numberOfCommits.value;
        currentCommitBegin.value = Math.max(0, currentCommitBegin.value);
        await fillGraphData()
        this.el.object3D.position.x = (/*currentCommitBegin.value +*/ numberOfCommits.value) * 50;
      }


      /*

            let x = this.el.object3D.position.x;
      if (x > (numberOfCommits.value)/3*2 * 50 + 1000 && repo.canLoadMoreCommits) {
        currentCommitBegin.value += Math.floor(numberOfCommits.value / 3);
        this.el.object3D.position.x = numberOfCommits.value/3 * 50;
        await fillGraphData()
        this.el.object3D.position.x = numberOfCommits.value/3 * 50;
      } else if (x < (numberOfCommits.value)/3 * 50 - 1000 && currentCommitBegin.value > 0) {
        currentCommitBegin.value -= Math.floor(numberOfCommits.value / 3);
        currentCommitBegin.value = Math.max(0, currentCommitBegin.value);
        this.el.object3D.position.x = numberOfCommits.value/3*2 * 50;
        await fillGraphData()
        this.el.object3D.position.x = numberOfCommits.value/3*2 * 50;
      }
       */
    }
  });
});

watch([repo.hasLoadedCommits], fillGraphData);
onUpdated(fillGraphData);
onUnmounted(() => {
  delete AFRAME.components.foo;
  delete AFRAME.components.tag;
  delete AFRAME.components.branch;
});

</script>

<template>
  <a-scene class="graph" fog="type: linear; color: #000; near:1; far: 100000"
            :vr-mode-ui="!AFRAME.utils.device.checkHeadsetConnected() ? 'enterARButton: #enter-ar; enterVRButton: #enter-vr; enabled: false;' : ''">


    <a-entity id="rig"
              rotation="0 270 0"
              movement-controls="camera: #camera; fly: true; speed: 200;"
              position="25 0 25">
      <a-entity cursor="rayOrigin: mouse; mouseCursorStylesEnabled: true;"
                raycaster="objects: [forcegraph];"></a-entity>
      <a-entity laser-controls="hand: left"
                raycaster="objects: [forcegraph]; lineOpacity: 0.85;"></a-entity>
      <a-entity laser-controls="hand: right"
                raycaster="objects: [forcegraph]; lineOpacity: 0.85;"></a-entity>
      <a-camera
        camera
        id="camera"
        position="0 1.6 0"
        far="100000"
        look-controls="pointerLockEnabled: true">
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
    <a-entity forcegraph="on-node-hover: hoverNode" foo></a-entity>
    <div id="enter-ar" hidden></div>
    <div id="enter-vr" hidden></div>
  </a-scene>
  <div id="forcegraph-tooltip" style="display: none;">
    <div id="page" class="dark__ main__" style="position: absolute">
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
      [MOBILE] Touch - fly forward + tilt sensors - rotation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    [DESKTOP] WSAD - fly + mouse - rotation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    [AR & VR - headset only] joysticks - fly + head - rotation</p>
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
.controlls-info{
  position: absolute;
  bottom: 0;
  text-align: center;
  left: 0;
  right: 0;
  font-size: 10px;
  font-family: sans-serif;
  z-index: 9999;
}
</style>
