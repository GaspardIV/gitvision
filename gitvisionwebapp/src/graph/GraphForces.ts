import type { ForceGraph3DGenericInstance, ForceGraph3DInstance } from '3d-force-graph'
// import { GraphOptionsGui } from '@/graph/GraphOptionsGui'

export class GraphForces {
  private graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>
  // private gui: GraphOptionsGui | null = null

  constructor(
    graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>,
  ) {
    this.graph = graph
  }

  private chargeStrength = -5000
  private linkStrength = 2.0
  private centerStrength = 1.0

  public setChargeStrength(chargeStrength: number) {
    this.chargeStrength = chargeStrength
    this.updateForce()
  }

  public setLinkStrength(linkStrength: number) {
    this.linkStrength = linkStrength
    this.updateForce()
  }

  public setCenterStrength(centerStrength: number) {
    this.centerStrength = centerStrength
    this.updateForce()
  }

  updateForce() {
    this.graph.d3Force('charge')?.strength(this.chargeStrength)
    this.graph.d3Force('link')?.strength(this.linkStrength)
    this.graph.d3ReheatSimulation()
  }

  updateGraph() {
    this.createChargeForce()
    this.createLinkForce()
    this.createCenterForce()
    this.createStickToYForce()
    this.createStickToXForce()
    // this.createStickToZForce() //removed because it is not worth it, looks bad
  }

  createChargeForce() {
    this.graph.d3Force('charge')?.strength(this.chargeStrength)
  }

  createLinkForce() {
    this.graph.d3Force('link')?.strength(this.linkStrength)
  }
  createCenterForce() {
    this.graph.d3Force('center')?.strength(this.centerStrength)
  }

  createStickToYForce() {
    this.graph.d3Force('stickToY', (alpha) => {
      this.graph.graphData().nodes.forEach((node) => {
        // @ts-ignore
        node.fx = node.chronologicalOrder * 50
      })
    })
  }
  createStickToXForce() {
    this.graph.d3Force('stickToX', (alpha) => {
      this.graph.graphData().nodes.forEach((node) => {
        // @ts-ignore
        node.fy = (node.topologicalOrder) * 10;
        // node.fy = 0
      })
    })
  }

  // createStickToZForce() {
  //   this.graph.d3Force('stickToZ', (alpha) => {
  //     this.graph.graphData().nodes.forEach((node) => {
  //       // @ts-ignore
  //       node.fz = (node.j) * 10;
  //     })
  //   })
  // }

  getChargeStrength() {
    return this.chargeStrength
  }

  getLinkStrength() {
    return this.linkStrength
  }

  getCenterStrength() {
    return this.centerStrength
  }

  // setGui(param: GraphOptionsGui) {
  //   this.gui = param
  // }
}
