<template>
  <a-assets>
    <img id="sky" src="../assets/Hill_O_Garvock_and_Tullo_Windfarm.jpg">
    <!--        <img id="sky" src="../assets/sechelt.jpeg">-->
    <!--        <img src="../assets/simon_waldherr.jpg"/>-->
    <!--        <a-asset-item id="tree" src="../assets/realtime_grass/scene.gltf"></a-asset-item>-->
  </a-assets>
  <a-entity light="type: ambient"></a-entity>
  <a-entity light="type: point; color: yellow"   position="0 10 -100" ></a-entity>
  <a-plane position="0 0 0" rotation="-90 0 0" width="1000" height="1000" color="white" opacity="0.7"></a-plane>
  <a-sky src="#sky"></a-sky>
</template>

<script>
export default {
  name: "SwitchThemePanels"
}
</script>

<style scoped>

</style>
