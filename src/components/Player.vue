<template>
  <a-entity position="0 0 0">
<!--    <a-camera  look-controls wasd-controls-enabled=true wasd-controls="fly: true;" fov=60 preset='hiro' near=0.1 far=1000>-->
    <a-camera camera-logger look-controls wasd-controls-enabled=true fov=60 preset='hiro' near=0.1 far=1000>
<!--      <a-entity light="type: point;"   position="0 1 0" ></a-entity>-->
      <a-cursor></a-cursor>
      <a-entity  gltf-model="models/butterfly2/scene.gltf" scale="0.03 0.03 0.03" position="0 -0.5 -5" rotation="0 270 0" animation-mixer="" castShadow="true" shadow="cast: true; receive: true;"></a-entity>
<!--      <a-entity cursor raycaster="far: 50; interval: 1000; objects: .clickable"></a-entity>-->
    </a-camera>
    <a-entity ref="help" gltf-model="models/low-poly_falling_astronaut_-_3december/scene.gltf" scale="1 1 1" position="0 0 -15" rotation="320 0 0" animation-mixer="" shadow="cast: true; receive: true;"></a-entity>
  </a-entity>
</template>
<script>

export default {
  name: 'Player',
  props: {},
  mounted() {
    let self = this;
    window.AFRAME.registerComponent('camera-logger', {

      schema: {
        timestamp: {type: 'int'},
        seconds: {type: 'int'} // default 0
      },

      log : function () {
        var cameraEl = this.el.sceneEl.camera.el;
        var rotation = cameraEl.getAttribute('rotation');
        var worldPos = new window.THREE.Vector3();
        worldPos.setFromMatrixPosition(cameraEl.object3D.matrixWorld);

        console.log("Time: " + this.data.seconds
            + "; Camera Position: (" + worldPos.x.toFixed(2) + ", " + worldPos.y.toFixed(2) + ", " + worldPos.z.toFixed(2)
            + "); Camera Rotation: (" + rotation.x.toFixed(2) + ", " + rotation.y.toFixed(2) + ", " + rotation.z.toFixed(2) + ")");
        // self.$refs.help.setPosition(worldPos.x, worldPos.y, worldPos.z);

        if (self.$refs.help) {
          // self.$refs.help.appendChild()
          self.$refs.help.setAttribute('position', {x: worldPos.x, y: worldPos.y, z: worldPos.z + 15})
          self.$refs.help.setAttribute('rotation', {x: -rotation.x - 40, y: -rotation.y, z: -rotation.z})
        }
      },

      play: function () {
        this.data.timestamp = Date.now();
        this.log();
      },

      tick: function () {
        if (Date.now() - this.data.timestamp > 1000) {
          this.data.timestamp = Date.now();
          this.data.seconds += 1;
          this.log();
        }
      },
    });

    // this.$refs.cameraEL.addEventListener('componentchanged', function (evt) {
    //       // if (evt.detail.name !== 'position') { return; }
    //       console.log(evt);
    //     }
    // )
  },
  unmounted() {
    delete window.AFRAME.components['camera-logger']
    // window.AFRAME.removeComponent()
  }
}
</script>
