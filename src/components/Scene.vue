<template>

  <!--
     todo do files like keyboard, input user name like keyboard
     https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

     https://stemkoski.github.io/A-Frame-Examples/
     https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->

  <div style="background-color: wheat; height:100vh">
    <!--    <a-scene webxr="requiredFeatures: hit-test,local;">-->
    <a-scene>
      <a-assets>
        <a-asset-item id="cityModel"
                      src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
      </a-assets>
      <a-assets>
        <!-- Model source: https://sketchfab.com/3d-models/spinosaurus-2135501583704537907645bf723685e7
                 Model author: https://sketchfab.com/VapTor
                 Model license: CC Attribution -->
        <a-asset-item id="spinosaurus"
                      src="models/spinosaurus/scene.gltf"></a-asset-item>
      </a-assets>
      <switch-theme-panels>
      </switch-theme-panels>
      <git-log :commits="this.commits" :branches="this.branches"></git-log>
      <Player/>

      <!--      <a-entity id="dino" position="-1 0 -3" scale="0.05 0.05 0.05">-->
      <!--        <a-entity position="0 2.15 0" rotation="0 55 0"-->
      <!--                  gltf-model="models/spinosaurus/scene.gltf"-->
      <!--                  animation-mixer-->
      <!--                  shadow="cast: true; receive: false"></a-entity>-->
      <!---->
      <!--         This shadow-receiving plane is only visible in AR mode.-->
      <!--        <a-plane height="30" width="30" rotation="-90 0 0"-->
      <!--                 shadow="receive: true"-->
      <!--                 ar-shadows="opacity: 0.2"-->
      <!--                 visible="false"></a-plane>-->
      <!--      </a-entity>-->
      <!--            <a-entity gltf-model="models/spinosaurus/scene.gltf" scale="0.018 0.018 0.018" ar-hit-test></a-entity>-->

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
  props: {
    branches: [],
    commits: new Map(),
  },
  methods: {
    attatchComponents() {
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
            this.xrHitTestSource = null;
            this.refSpace = null;
          });
          this.el.sceneEl.renderer.xr.addEventListener('sessionstart', () => {
            let session = this.el.sceneEl.renderer.xr.getSession();

            let element = this.el;
            session.addEventListener('select', function () {
              let position = element.getAttribute('position');

              document.getElementById('dino').setAttribute('position', position);
              // document.getElementById('light').setAttribute('position', {
              //   x: (position.x - 2),
              //   y: (position.y + 4),
              //   z: (position.z + 2)
              // });
            });

            session.requestReferenceSpace('viewer').then((space) => {
              this.viewerSpace = space;
              session.requestHitTestSource({space: this.viewerSpace})
                  .then((hitTestSource) => {
                    this.xrHitTestSource = hitTestSource;
                  });
            });

            session.requestReferenceSpace('local').then((space) => {
              this.refSpace = space
              // this.refSpace =  this.el.sceneEl.renderer.xr.getReferenceSpace();
            });
          });
        },
        tick: function () {
          // if (this.el.sceneEl.is('ar-mode')) {
          if (!this.viewerSpace) return;

          let frame = this.el.sceneEl.frame;
          // let xrViewerPose = frame.getViewerPose(this.refSpace);

          if (this.xrHitTestSource /*&& xrViewerPose*/) {
            let hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
            if (hitTestResults.length > 0) {
              console.log(hitTestResults)
              let pose = hitTestResults[0].getPose(this.refSpace);

              let inputMat = new window.THREE.Matrix4();
              inputMat.fromArray(pose.transform.matrix);

              // let position = new window.THREE.Vector3();
              // position.setFromMatrixPosition(inputMat);
              // this.el.setAttribute('position', position);
              this.el.matrix = inputMat;
            }
          }
          // }
        }
      });

      window.AFRAME.registerComponent('look-at', {
        schema: { type: 'selector' },

        init: function () {},

        tick: function () {
          this.el.object3D.lookAt(this.data.object3D.position)
        }
      })
    },
  },
  created() {
    this.attatchComponents();
  }

}
</script>

