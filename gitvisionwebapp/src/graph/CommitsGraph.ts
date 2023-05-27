import ForceGraph3D from '3d-force-graph'
import type { ConfigOptions } from '3d-force-graph'
import { GraphScene } from '@/graph/GraphScene'
import type { Branch, Tag } from '@/stores/Types'
// @ts-ignore
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { GraphData } from '@/graph/GraphData'
import type { Commit } from '@/stores/Types'
import { GraphForces } from '@/graph/GraphForces'
import { GraphOptionsGui } from '@/graph/GraphOptionsGui'
import { GraphStyle } from '@/graph/GraphStyle'
// @ts-ignore
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'

export class CommitsGraph {
  private graphOptions: ConfigOptions = {
    controlType: 'fly',
    // controlType: "orbit",
    // @ts-ignore
    extraRenderers: [new CSS2DRenderer()]
  }
  private graph = ForceGraph3D(this.graphOptions)
  private graphScene = new GraphScene()
  private graphData = new GraphData()

  private graphForces = new GraphForces(this.graph)

  private graphOptionsGui = GraphOptionsGui.getInstance(this.graphForces, this.graphScene)

  private graphStyle = new GraphStyle(this.graph, this.graphScene, this.graphData)

  setup(element: HTMLElement) {
    this.graph = this.graph(element)
    this.graph.backgroundColor('#00000000')
    this.graphScene.init(
      this.graph.scene(),
      this.graph.camera(),
      this.graph.renderer(),
      this.graphOptionsGui
    )

    // const controls = new FlyControls(this.camera, this.renderer.domElement);
    // controls.movementSpeed = 100;
    // controls.domElement = this.renderer.domElement;
    // controls.rollSpeed = Math.PI / 24;
    // controls.autoForward = false;
    // controls.dragToLook = true;
    this.graph.controls().movementSpeed = 10000
    this.graph.controls().rollSpeed = Math.PI / 4
    this.graph.controls().autoForward = false
    this.graph.controls().dragToLook = true
    // this.graph.controls().domElement = this.graph.renderer().domElement;
    this.graph.controls().enabled = true
  }

  updateWithData(commits: Commit[], branches: Branch[], tags: Tag[]) {
    const gData = this.graphData.updateData(commits, branches, tags)
    this.graphForces.updateGraph()
    this.graphStyle.update()
    this.graph.graphData(gData)
    this.graphStyle.setOptions(this.graphOptionsGui)
  }
}
