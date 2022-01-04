<template>

  <!--
     todo do files like keyboard, input user name like keyboard
     https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

     https://stemkoski.github.io/A-Frame-Examples/
     https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->

  <div style="background-color: wheat; height:100vh">
    <a-scene>
      <a-assets>
        <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
      </a-assets>
      <switch-theme-panels>
      </switch-theme-panels>
      <git-log></git-log>
      <Player/>

<!--      <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2"></a-entity>-->
<!--      <a-entity ref="city"  scale="2 2 2"></a-entity>-->
<!--      <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2" shadow="cast: true; receive: true;"></a-entity>-->
<!--      <a-entity  gltf-model="models/robot_dog__4kriggedasset/scene.gltf" scale="1 1 1" position="20 0 0" animation-mixer="" shadow="cast: true; receive: true;"></a-entity>-->
      <a-plane position="0 -1 0" rotation="-90 0 0" width="1000" height="1000" color="white" opacity="0.75" geometry="" material="opacity: 0.71" shadow=""></a-plane>
    </a-scene>
  </div>
</template>

<script>
import SwitchThemePanels from "@/components/SwitchThemePanels";
import Player from "@/components/Player";
import GitLog from "@/components/gitLog";

export default {
  name: "Scene",
  components: {GitLog, Player, SwitchThemePanels},
  mounted(){
    // this.$refs.city.setAttribute('gltf-model', '#cityModel')
    // this.$refs.city.setAttribute('gltf-model', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf');
  },
  data() {
    return {
      offsetNumbers: [0, 1, -1, 10]
    }
  },

}
</script>

