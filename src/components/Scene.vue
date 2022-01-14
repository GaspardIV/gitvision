<template>

  <!--
     todo do files like keyboard, input user name like keyboard
     https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

     https://stemkoski.github.io/A-Frame-Examples/
     https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->

  <div style="background-color: wheat; height:100vh">
    <a-scene hit-test webxr="requiredFeatures: hit-test,local-floor;">
      <a-assets>
        <a-asset-item id="cityModel"
                      src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
      </a-assets>
      <a-assets>
        <!-- Model source: https://sketchfab.com/3d-models/spinosaurus-2135501583704537907645bf723685e7
                 Model author: https://sketchfab.com/VapTor
                 Model license: CC Attribution -->
        <a-asset-item id="spinosaurus"
                      src="https://cdn.glitch.com/324a5290-5aa7-4efc-92d6-ae0736433b12%2Fspinosaurus.glb"
                      response-type="arraybuffer"></a-asset-item>

        <a-asset-item id="reticle"
                      src="reticle.gltf"
                      response-type="arraybuffer"></a-asset-item>
      </a-assets>
      <switch-theme-panels>
      </switch-theme-panels>
      <git-log></git-log>
      <Player/>

      <!--      <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2"></a-entity>-->
      <!--      <a-entity ref="city"  scale="2 2 2"></a-entity>-->
<!--            <a-entity ref="city" gltf-model="models/Duck/Duck.gltf" scale="2 2 2" shadow="cast: true; receive: true;" ar-hit-test></a-entity>-->
<!--            <a-entity  gltf-model="models/robot_dog__4kriggedasset/scene.gltf" scale="1 1 1" position="20 0 0" animation-mixer="" shadow="cast: true; receive: true;"></a-entity>-->
      <a-entity id="dino" position="-1 0 -3" scale="0.5 0.5 0.5">
        <a-entity position="0 2.15 0" rotation="0 55 0"
                  gltf-model="#spinosaurus"
                  animation-mixer
                  shadow="cast: true; receive: false"></a-entity>

        <!-- This shadow-receiving plane is only visible in AR mode.-->
        <a-plane height="30" width="30" rotation="-90 0 0"
                 shadow="receive: true"
                 ar-shadows="opacity: 0.2"
                 visible="false"></a-plane>

      </a-entity>
      <a-entity   scale="0.03 0.03 0.03" position="0 -0.5 -5" rotation="0 270 0" animation-mixer="" castShadow="true" shadow="cast: true; receive: true;"></a-entity>

      <a-entity gltf-model="models/reticle/reticle.gltf" scale="0.8 0.8 0.8" ar-hit-test></a-entity>
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
    attatchHitTest2() {

    },
    attatchArHelpers() {
      window.AFRAME.registerComponent('hide-in-ar-mode', {
        // Set this object invisible while in AR mode.
        init: function () {
          this.el.sceneEl.addEventListener('enter-vr', () => {
            this.wasVisible = this.el.getAttribute('visible');
            if (this.el.sceneEl.is('ar-mode')) {
              this.el.setAttribute('visible', false);
            }
          });
          this.el.sceneEl.addEventListener('exit-vr', () => {
            if (this.wasVisible) this.el.setAttribute('visible', true);
          });
        }
      });

      window.AFRAME.registerComponent('ar-shadows', {
        // Swap an object's material to a transparent shadows-only material while
        // in AR mode. Intended for use with a ground plane. The object is also
        // set visible while in AR mode, this is useful if it's hidden in other
        // modes due to them using a 3D environment.
        schema: {
          opacity: {default: 0.3}
        },
        init: function () {
          this.el.sceneEl.addEventListener('enter-vr', () => {
            this.wasVisible = this.el.getAttribute('visible');
            if (this.el.sceneEl.is('ar-mode')) {
              this.savedMaterial = this.el.object3D.children[0].material;
              this.el.object3D.children[0].material = new window.THREE.ShadowMaterial();
              this.el.object3D.children[0].material.opacity = this.data.opacity;
              this.el.setAttribute('visible', true);
            }
          });
          this.el.sceneEl.addEventListener('exit-vr', () => {
            if (this.savedMaterial) {
              this.el.object3D.children[0].material = this.savedMaterial;
              this.savedMaterial = null;
            }
            if (!this.wasVisible) this.el.setAttribute('visible', false);
          });
        }
      });

      window.AFRAME.registerComponent('ar-hit-test', {
        init: function () {
          this.xrHitTestSource = null;
          this.viewerSpace = null;
          this.refSpace = null;

          this.el.sceneEl.renderer.xr.addEventListener('sessionend', () => {
            this.viewerSpace = null;
            this.refSpace = null;
            this.xrHitTestSource = null;
          });
          this.el.sceneEl.renderer.xr.addEventListener('sessionstart', () => {
            let session = this.el.sceneEl.renderer.xr.getSession();

            let element = this.el;
            session.addEventListener('select', function () {
              let position = element.getAttribute('position');

              document.getElementById('dino').setAttribute('position', position);
              document.getElementById('light').setAttribute('position', {
                x: (position.x - 2),
                y: (position.y + 4),
                z: (position.z + 2)
              });
            });

            session.requestReferenceSpace('viewer').then((space) => {
              this.viewerSpace = space;
              session.requestHitTestSource({space: this.viewerSpace})
                  .then((hitTestSource) => {
                    this.xrHitTestSource = hitTestSource;
                  });
            });

            session.requestReferenceSpace('local-floor').then((space) => {
              this.refSpace = space;
            });
          });
        },
        tick: function () {
          if (this.el.sceneEl.is('ar-mode')) {
            if (!this.viewerSpace) return;

            let frame = this.el.sceneEl.frame;
            let xrViewerPose = frame.getViewerPose(this.refSpace);

            if (this.xrHitTestSource && xrViewerPose) {
              let hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
              if (hitTestResults.length > 0) {
                let pose = hitTestResults[0].getPose(this.refSpace);

                let inputMat = new window.THREE.Matrix4();
                inputMat.fromArray(pose.transform.matrix);

                let position = new window.THREE.Vector3();
                position.setFromMatrixPosition(inputMat);
                this.el.setAttribute('position', position);
              }
            }
          }
        }
      });
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
          this.normalizedCoordinatedPositionPointer = new window.THREE.Vector2();
          //Screen coordinates normalized to -1..1 (0,0 is at center and 1,1 is at top right)
          this.coordinatesToFindAnchors = new window.THREE.Vector2(0.5, 0.5);
          window.addEventListener('touchstart', this.onTouchStart);

          if (this.isNotStartedYet) {
            this.start();
          }
        },
        realityChanged: function (data) {
          if (data.detail === 'ar') {
            if (window.AFRAME.scenes[0].systems.xr.supportAR) {
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
          // var frame = data.detail;
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
    this.attatchHitTest2();
    this.attatchArHelpers();
    // this.hittestTest();
  }

}
</script>

