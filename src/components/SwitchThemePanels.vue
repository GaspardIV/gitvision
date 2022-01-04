<template>
<a-assets>
  <img id="sky" src="../assets/Hill_O_Garvock_and_Tullo_Windfarm.jpg"> <!--  heaven theme-->
</a-assets>
  <a-entity light="type: ambient; castShadow:true; intensity: 0.5;"></a-entity>

<!--  TODO LIGHT TYPE SPOT ??? -->
<!--  <a-entity light="castShadow: true; type: spot; shadowCameraLeft: -10; shadowCameraRight: 10; shadowCameraTop: 10;" position="-1.5 3 -10"></a-entity>-->
  <a-entity light="castShadow: true; type: directional; shadowCameraLeft: -100; shadowCameraRight: 100; shadowCameraTop: 100;" position="-1.5 3 -10"></a-entity>
  <a-entity light="castShadow: true; type: directional; shadowCameraLeft: -100; shadowCameraRight: 100; shadowCameraTop: 100;" position="-1.5 0 -10"></a-entity>
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

