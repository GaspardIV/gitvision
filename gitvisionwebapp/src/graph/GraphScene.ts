import { Camera, Scene, WebGLRenderer, WebGLRenderTarget } from 'three'
import { THREE } from 'aframe'
import { Sky } from 'three/examples/jsm/objects/Sky'
import { Water } from 'three/examples/jsm/objects/Water'
import GUI from 'lil-gui'
import type { GraphOptionsGui } from '@/graph/GraphOptionsGui'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

export class GraphScene {
  private camera: Camera = new THREE.PerspectiveCamera();
  private scene: Scene = new Scene()
  private renderer: WebGLRenderer = new WebGLRenderer()
  private graphOptionsGui: GraphOptionsGui | null = null
  private sky: Sky | null = null
  private water: Water | null = null

  private guiInitialized = false
  private guiInitializedGraphical = false

  init(
    scene: Scene,
    camera: Camera,
    webGLRenderer: WebGLRenderer,
    graphOptionsGui: GraphOptionsGui
  ) {
    this.scene = scene
    this.camera = camera
    this.renderer = webGLRenderer
    this.graphOptionsGui = graphOptionsGui
    // this.initSky()
    // this.initCamera()
    // this.setupScene()
  }

  private setupScene() {
    // if (!this.graphOptionsGui?.gui?.has("enableSky")) {
    if (!this.guiInitialized) {
      this.graphOptionsGui?.gui
        .add(this.graphOptionsGui.settings, 'enableSky')
        .onChange(this.setupScene.bind(this))
      this.graphOptionsGui?.gui
        .add(this.graphOptionsGui.settings, 'enableWater')
        .onChange(this.setupScene.bind(this))
      this.guiInitialized = true
    }
    // }
    // this.initSky();
    // if (this.graphOptionsGui?.settings?.enableSky) {
    //
    // } else {
    if (!this.graphOptionsGui?.settings?.enableSky) {
      if (this.sky) {
        this.scene.remove(this.sky)
      }
    } else {
      if (this.sky) {
        this.scene.add(this.sky)
      }
    }
    //
    // }
    if (!this.graphOptionsGui?.settings?.enableWater) {
      if (this.water) {
        this.scene.remove(this.water)
      }
    } else {
      if (this.water) {
        this.scene.add(this.water)
      }
    }
  }

  private initSky() {
    const sky = new Sky()
    this.sky = sky
    this.sky.name = 'sky'
    this.sky.scale.setScalar(450000)
    this.scene.add(this.sky)

    const xLine = new THREE.Line3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100000, 0, 0))
    const yLine = new THREE.Line3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100000, 0))
    const zLine = new THREE.Line3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100000))
    const xGeometry = new THREE.BufferGeometry().setFromPoints([xLine.start, xLine.end])
    const yGeometry = new THREE.BufferGeometry().setFromPoints([yLine.start, yLine.end])
    const zGeometry = new THREE.BufferGeometry().setFromPoints([zLine.start, zLine.end])
    const xMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 })
    const yMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 })
    const zMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff })
    const xLineMesh = new THREE.Line(xGeometry, xMaterial)
    const yLineMesh = new THREE.Line(yGeometry, yMaterial)
    const zLineMesh = new THREE.Line(zGeometry, zMaterial)
    this.scene.add(xLineMesh)
    this.scene.add(yLineMesh)
    this.scene.add(zLineMesh)
    // const sun = new THREE.Vector3();
    // const waterGeometry = new THREE.PlaneGeometry(100000, 100000);
    // const water = new Water(waterGeometry, {
    // this.scene
    const sun = new THREE.Vector3()

    const waterGeometry = new THREE.PlaneGeometry(100000, 100000)
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('/waternormals.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      }),
      sunDirection: sun,
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,

      fog: this.scene.fog !== undefined
    })
    this.water = water
    this.water.rotation.x = -Math.PI / 2
    this.water.position.set(5000, -100, 0)
    this.scene.add(this.water)
    const effectController = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.7,
      elevation: 0,
      azimuth: 130,
      exposure: this.renderer.toneMappingExposure
    }
    const this_ = this
    const pmremGenerator = new THREE.PMREMGenerator(this_.renderer)
    let renderTarget: WebGLRenderTarget

    function guiChanged() {
      const uniforms = sky.material.uniforms
      uniforms['turbidity'].value = effectController.turbidity
      uniforms['rayleigh'].value = effectController.rayleigh
      uniforms['mieCoefficient'].value = effectController.mieCoefficient

      uniforms['mieDirectionalG'].value = effectController.mieDirectionalG
      const phi = THREE.MathUtils.degToRad(90 - effectController.elevation)

      const theta = THREE.MathUtils.degToRad(effectController.azimuth)

      sun.setFromSphericalCoords(1, phi, theta)

      if (renderTarget !== undefined) renderTarget.dispose()
      renderTarget = pmremGenerator.fromScene(this_.scene)

      this_.scene.environment = renderTarget.texture

      uniforms['sunPosition'].value.copy(sun)

      water.material.uniforms['sunDirection'].value.copy(sun).normalize()
      this_.renderer.toneMappingExposure = effectController.exposure
      this_.renderer.render(this_.scene, this_.camera)
    }

    function animate() {
      requestAnimationFrame(animate)
      render()
    }

    function render() {
      const time = performance.now() * 0.001

      // mesh.position.y = Math.sin( time ) * 20 + 5;
      // mesh.rotation.x = time * 0.5;
      // mesh.rotation.z = time * 0.51;

      water.material.uniforms['time'].value += 1.0 / 60.0

      this_.renderer.render(this_.scene, this_.camera)
    }

    if (!this.guiInitializedGraphical) {
      this.graphOptionsGui?.gui
        .add(effectController, 'turbidity', 0.0, 20.0, 0.1)
        .onChange(guiChanged)
      this.graphOptionsGui?.gui
        .add(effectController, 'rayleigh', 0.0, 4, 0.001)
        .onChange(guiChanged)
      // this.graphOptionsGui?.gui
      // .add(effectController, "mieCoefficient", 0.0, 0.1, 0.001)
      // .onChange(guiChanged);
      // this.graphOptionsGui?.gui
      // .add(effectController, "mieDirectionalG", 0.0, 1, 0.001)
      // .onChange(guiChanged);
      this.graphOptionsGui?.gui.add(effectController, 'elevation', 0, 90, 0.1).onChange(guiChanged)
      this.graphOptionsGui?.gui
        .add(effectController, 'azimuth', -180, 180, 0.1)
        .onChange(guiChanged)
      // this.graphOptionsGui?.gui.add(effectController, "exposure", 0, 1, 0.0001).onChange(guiChanged);
      this.guiInitializedGraphical = true
    }

    // const gui = new GUI();
    //
    guiChanged()
    animate()
  }

  isCloseToCamera(position: {
    x: number | undefined
    y: number | undefined
    z: number | undefined
  }) {
    if (!position.x || !position.y || !position.z) {
      return false
    }
    const vector = new THREE.Vector3(position.x, position.y, position.z)
    return this.camera.position.distanceTo(vector) < 800
  }

  onCameraMove(updateHighlight: () => void) {
    this.camera.addEventListener('move', updateHighlight)
  }

  private initCamera() {
    // this.camera = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // this.camera.position.set(0, 0, 0);
    // this.camera.lookAt(0, 0, 0);
    //   set fly camera controls speed
    // this.scene
  }
}
