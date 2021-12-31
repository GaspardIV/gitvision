<template>
  <a-entity position="0 0 5">
    <a-camera wasd-controls-enabled=true fov=60 preset='hiro' near=0.1 far=10000>
      <a-cursor></a-cursor>
      <a-entity cursor raycaster="far: 20; interval: 1000; objects: .clickable"></a-entity>
    </a-camera>
  </a-entity>
</template>
<script>
export default {
  name: 'Player',
  props: {}
}
</script>
