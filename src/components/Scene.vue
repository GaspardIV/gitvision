<template>
  <div style="background-color: wheat; height:100vh">
    <a-scene>
<!--      <a-box log="Hello, Box!"></a-box>-->
<!--      <a-entity ></a-entity>-->
      <a-entity light="type: ambient" position="1 1 -4"></a-entity>
      <a-entity light="type: directional" position="5 30 5"></a-entity>
<!--
todo do files like keyboard, input user name like keyboard
https://stemkoski.github.io/A-Frame-Examples/
https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"
             event-set__enter="_event: mouseenter; color: #8FF7FF"
             event-set__leave="_event: mouseleave; color: #4CC3D9"></a-box>
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
      <a-plane position="0 0 -4" rotation="-90 0 0" width="1000" height="1000" color="green"></a-plane>
      <a-sky color="pink"></a-sky>
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
