<template>

  <!--
     todo do files like keyboard, input user name like keyboard
     https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

     https://stemkoski.github.io/A-Frame-Examples/
     https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->

  <div style="background-color: wheat; height:100vh">
    <a-scene hit-test>
      <a-assets>
        <a-asset-item id="cityModel"
                      src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
      </a-assets>
      <switch-theme-panels>
      </switch-theme-panels>
      <git-log></git-log>
      <Player/>

      <!--      <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2"></a-entity>-->
      <!--      <a-entity ref="city"  scale="2 2 2"></a-entity>-->
      <!--      <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2" shadow="cast: true; receive: true;"></a-entity>-->
      <!--      <a-entity  gltf-model="models/robot_dog__4kriggedasset/scene.gltf" scale="1 1 1" position="20 0 0" animation-mixer="" shadow="cast: true; receive: true;"></a-entity>-->
      <a-plane position="0 -1 0" rotation="-90 0 0" width="1000" height="1000" color="white" opacity="0.75" geometry=""
               material="opacity: 0.71" shadow=""></a-plane>
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
  mounted() {
    // this.$refs.city.setAttribute('gltf-model', '#cityModel')
    // this.$refs.city.setAttribute('gltf-model', 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF/Duck.gltf');
  },
  data() {
    return {
      offsetNumbers: [0, 1, -1, 10]
    }
  },
  methods: {
    hittestTest() {
      var scene = window.AFRAME.scenes[0];

      var newObject = function(data) {
        var entity = data.detail;

        entity.setAttribute('geometry', {
          primitive: 'box',
          width: 0.1,
          height: 0.1,
          depth: 0.1
        });

        entity.setAttribute('material', {
          shader: 'standard',
          transparent: true,
          opacity: 0.45,
          fog: false,
          color: '#ffcc00'
        });

        scene.appendChild(entity);
      }

      scene.addEventListener('newAnchoredEntity', newObject);
    },
    attatchHitTest() {
      window.AFRAME.registerComponent('hit-test', {
        init: function () {
          if (!this.el.isScene) {
            console.warn('hit-test component can only be applied to <a-scene>');
            return;
          }
          this.tapData = null;

          this.bindMethods();
          this.addDOMEls();
          this.scene = this.el.sceneEl;
          this.scene.addEventListener('xrInitialized', this.xrInitialized);
          this.scene.addEventListener('realityChanged', this.realityChanged);
        },
        addDOMEls: function () {
          var title = document.createElement('div');
          title.style.position = 'absolute';
          title.style.top = '30px';
          title.style.fontFamily = 'Arial, Helvetica, sans-serif';
          title.style.fontSize = '16px';
          title.style.fontWeight = 'bold';
          title.style.zIndex = 10;
          title.style.width = '100%';
          title.style.textAlign = 'center';
          title.innerHTML = 'Find anchors by searching on tap events.';
          document.body.appendChild(title);

          this.alertMessage = document.createElement('div');
          this.alertMessage.style.position = 'absolute';
          this.alertMessage.style.bottom = '50px';
          this.alertMessage.style.fontFamily = 'Arial, Helvetica, sans-serif';
          this.alertMessage.style.fontSize = '24px';
          this.alertMessage.style.fontWeight = 'bold';
          this.alertMessage.style.zIndex = 10;
          this.alertMessage.style.width = '100%';
          this.alertMessage.style.textAlign = 'center';
          document.body.appendChild(this.alertMessage);
        },
        bindMethods: function () {
          this.xrInitialized = this.xrInitialized.bind(this);
          this.realityChanged = this.realityChanged.bind(this);
          this.updateFrame = this.updateFrame.bind(this);
          this.onTouchStart = this.onTouchStart.bind(this);
        },
        xrInitialized: function () {
          this.scene.removeEventListener('xrInitialized', this.xrInitialized);
          this.xrIsInit = true;
          // normalized device coordinates position
          this.normalizedCoordinatedPositionPointer = new THREE.Vector2();
          //Screen coordinates normalized to -1..1 (0,0 is at center and 1,1 is at top right)
          this.coordinatesToFindAnchors = new THREE.Vector2(0.5, 0.5);
          window.addEventListener('touchstart', this.onTouchStart);

          if (this.isNotStartedYet) {
            this.start();
          }
        },
        realityChanged: function (data) {
          if (data.detail === 'ar') {
            if (AFRAME.scenes[0].systems.xr.supportAR) {
              if (this.xrIsInit) {
                this.start();
              } else {
                this.isNotStartedYet = true;
              }
            }
          }
        },
        start: function () {
          this.scene.addEventListener('updateFrame', this.updateFrame);
        },
        onTouchStart: function (ev) {
          if (!ev.touches || ev.touches.length === 0) {
            console.error('No touches on touch event', ev);
            return
          }
          this.tapData = [
            ev.touches[0].clientX / window.innerWidth,
            ev.touches[0].clientY / window.innerHeight
          ];
        },
        /*
        Add a node to the scene and keep its pose updated using the anchorOffset
        */

        updateFrame: function (data) {
          var frame = data.detail;
          if (this.tapData !== null) {
            var x = this.tapData[0];
            var y = this.tapData[1];
            this.tapData = null;
            var self = this;
            data.detail.findAnchor(x, y).then(function (anchorOffset) {
              if (anchorOffset === null) {
                self.alertMessage.innerHTML = 'miss';
              } else {
                self.alertMessage.innerHTML = 'hit';
                var entity = document.createElement('a-entity');

                // will set the position and orientation based on the anchorOffset attached to the entity
                entity.setAttribute('xranchor', {});
                entity.components.xranchor.anchorOffset = anchorOffset;

                self.el.emit('newAnchoredEntity', entity);
              }
            }).catch(function (err) {
              console.error('Error in hit test', err);
            });
          }
        }
      });
    }
  },
  created() {
    this.attatchHitTest();
    this.hittestTest();
  }

}
</script>

