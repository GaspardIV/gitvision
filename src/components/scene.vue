<template>
  <div style="background-color: red; height:400px">
    <a-scene>
      <a-entity position="0 0 5">
        <a-camera wasd-controls-enabled=true fov=60 near=0.1 far=10000>
          <a-cursor></a-cursor>
          <a-entity cursor raycaster="far: 20; interval: 1000; objects: .clickable"></a-entity>
        </a-camera>
      </a-entity>
      <a-entity id="scene">
        <sphere :key="n" v-for="n in offsetNumbers" v-bind:distance="n"></sphere>
      </a-entity>
    </a-scene>
  </div>
</template>

<script>
import Sphere from "@/components/Sphere";

export default {
  name: "scene",
  components: {Sphere},
  data() {
    return {
      offsetNumbers: [0, 1, -1]
    }
  },

}
</script>

<style scoped>

</style>
