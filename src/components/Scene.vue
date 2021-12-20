<template>
  <div style="background-color: wheat; height:100vh">
    <a-scene>
<!--      <a-box log="Hello, Box!"></a-box>-->
<!--      <a-entity ></a-entity>-->
      <a-assets>
        <img id="sky" src="../assets/Hill_O_Garvock_and_Tullo_Windfarm.jpg">
<!--        <img src="../assets/simon_waldherr.jpg"/>-->
      </a-assets>
      <a-entity light="type: ambient" position="1 1 -4"></a-entity>
      <a-entity light="type: directional" position="5 30 5"></a-entity>
<!--
todo do files like keyboard, input user name like keyboard
https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

https://stemkoski.github.io/A-Frame-Examples/
https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"
             event-set__enter="_event: mouseenter; color: #8FF7FF"
             event-set__leave="_event: mouseleave; color: #4CC3D9"></a-box>
      <a-text position="0 2"  geometry="primitive:plane" value="Hello, World!"></a-text>
      <a-entity geometry="primitive: circle; radius: 1" material="side: double"></a-entity>
      <a-light type="point" color="blue" position="20d 5 30"></a-light>

      <a-entity position="0 0 5">
        <a-camera wasd-controls-enabled=true fov=60 near=0.1 far=10000>
          <a-cursor></a-cursor>
          <a-entity cursor raycaster="far: 20; interval: 1000; objects: .clickable"></a-entity>
        </a-camera>
      </a-entity>
      <a-entity id="scene">
        <sphere :key="n" v-for="n in offsetNumbers" v-bind:distance="n"></sphere>
      </a-entity>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="1000" height="1000" color="green" opacity="0.7"></a-plane>
      <a-sky src="#sky"></a-sky>
    </a-scene>
  </div>
</template>

<script>
import Sphere from "@/components/Sphere";

export default {
  name: "Scene",
  components: {Sphere},
  data() {
    return {
      offsetNumbers: [0, 1, -1, 10]
    }
  },

}
</script>

<style scoped>

</style>
