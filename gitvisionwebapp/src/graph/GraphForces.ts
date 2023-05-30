import type { ForceGraph3DGenericInstance, ForceGraph3DInstance } from '3d-force-graph'
import { GraphOptionsGui } from '@/graph/GraphOptionsGui'

export class GraphForces {
  private graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>
  private gui: GraphOptionsGui | null = null

  constructor(graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>) {
    this.graph = graph
  }

  private chargeStrength = -5000
  private linkStrength = 2.0
  private centerStrength = 0.0

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
    this.initOnDragEnd()
  }

  createChargeForce() {
    this.graph.d3Force('charge')?.strength(this.chargeStrength)
  }

  createLinkForce() {
    this.graph.d3Force('link')?.strength(this.linkStrength)
  }
  createCenterForce() {
    this.graph.d3Force('center', (alpha: number) => {
      const k = -0.005 * alpha //alpha * (this.centerStrength+ 0.1) * 5; // Control the strength of the force

      this.graph.graphData().nodes.forEach((node) => {
        // @ts-ignore
        const scale = node.topologicalOrder / this.graph.graphData().nodes.length
        // const scale = node.topologicalOrder / this.graph.graphData().nodes.length;
        // @ts-ignore
        // node.vz = node.vz - node.z * k * scale;
        // @ts-ignore
        // node.vx = node.vx - node.x * k * scale;
      })
    })
  }

  createStickToYForce() {
    this.graph.d3Force('stickToY', (alpha) => {
      this.graph.graphData().nodes.forEach((node) => {
        // @ts-ignore
        // node.vy = node.vy - (node.y - node.chronologicalOrder);
        // @ts-ignore
        // if (this.gui && this.gui.settings.stickToY) {
        node.fx = node.chronologicalOrder * 50
        // }
      })
    })
  }
  createStickToXForce() {
    this.graph.d3Force('stickToX', (alpha) => {
      // first and last date of commits
      // const firstDate = this.graph.graphData().nodes[0].commit.commitTime;
      // const lastDate = this.graph.graphData().nodes[this.graph.graphData().nodes.length - 1].commit.commitTime;
      // const dateRange = lastDate - firstDate;

      this.graph.graphData().nodes.forEach((node) => {
        // @ts-ignore
        // node.vx = node.vx - (node.x - node.topologicalOrder);
        // @ts-ignore
        // if (this.gui && this.gui.settings.stickToX) {
        //   node.fz = (node.topologicalOrder)*5;
        //   node.vz = node.vz -(node.z - node.topologicalOrder)*alpha
        // node.vy = node.vy - (node.y - node.topologicalOrder)*alpha
        node.fy = (node.topologicalOrder) * 10;
        // node.fy = node.chronologicalOrder * 20
        // node.fy = (node.chronologicalOrder) * 20;
        //fz is first date - last date * 20
        // let date = node.commit.commitTime;
        // let dateDiff = date - firstDate;
        // let dateDiffPercent = dateDiff / dateRange;
        // node.vz = (new Date().getTime()-(node.commit.time.getTime()))/node.commit.time.getTime()*1000;

        // let commit = node.commit;
        // node.fz =
        // }
      })
    })
  }

  initOnDragEnd() {
    // this.graph.onNodeDragEnd((node) => {
    //   // @ts-ignore
    //   node.fx = node.x
    //   // node.fy = node.y;
    //   // @ts-ignore
    //   node.fz = node.z
    // })
  }

  getChargeStrength() {
    return this.chargeStrength
  }

  getLinkStrength() {
    return this.linkStrength
  }

  getCenterStrength() {
    return this.centerStrength
  }

  setGui(param: GraphOptionsGui) {
    this.gui = param
  }
}
