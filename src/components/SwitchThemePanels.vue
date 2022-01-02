<template>
  <a-assets>
    <img id="sky" src="../assets/Hill_O_Garvock_and_Tullo_Windfarm.jpg"> <!--  heaven theme-->
  </a-assets>

  <a-entity light="type: ambient"></a-entity>
  <a-entity light="type: directional; color: orange; intensity: 0.7; castShadow: true;" position="1 0 -50"></a-entity>
  <a-plane position="0 0 0" rotation="-90 0 0" width="1000" height="1000" color="white" opacity="0.75"></a-plane>
  <a-sky src="#sky"></a-sky>
  <wind-farm/>

</template>
<script>
import WindFarm from "@/components/WindFarm";

export default {
  name: "SwitchThemePanels",
  components: {WindFarm}
}
</script>

