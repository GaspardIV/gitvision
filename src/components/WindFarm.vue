<template>
  <a-entity scale="2 2 2" position="-300 -170 350" rotation="0 150 0">
    <a-box depth="3" height="80" width="3" position="0 -0 0"></a-box>
    <a-entity position="0 40 3" scale="2 2 2"
              animation="property: rotation; to: 0 0 360; loop: true; dur: 10000; easing: linear;">
      <a-cylinder color="white" height="5" position="0 0 -2" rotation="90 0 0 " radius="1.7"></a-cylinder>
      <a-box depth="1" height="15" width="1" position="0 8 0" color="white"></a-box>
      <a-box depth="1" height="15" width="1" position="-8 -4 0" rotation="0 0 120" color="white"></a-box>
      <a-box depth="1" height="15" width="1" position="8 -4 0" rotation="0 0 240" color="white"></a-box>
    </a-entity>
  </a-entity>
  <a-entity scale="2 2 2" position="-240 -170 360" rotation="0 150 0">
    <a-box depth="3" height="80" width="3" position="0 -0 0"></a-box>
    <a-entity position="0 40 3" scale="2 2 2"
              animation="property: rotation; to: 0 0 360; loop: true; dur: 10000; easing: linear;">
      <a-cylinder color="white" height="5" position="0 0 -2" rotation="90 0 0 " radius="1.7"></a-cylinder>
      <a-box depth="1" height="15" width="1" position="0 8 0" color="white"></a-box>
      <a-box depth="1" height="15" width="1" position="-8 -4 0" rotation="0 0 120" color="white"></a-box>
      <a-box depth="1" height="15" width="1" position="8 -4 0" rotation="0 0 240" color="white"></a-box>
    </a-entity>
  </a-entity>
</template>
<script>
export default {
  name: 'wind-farm'
}
</script>
