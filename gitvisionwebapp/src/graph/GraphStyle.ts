import type { ForceGraph3DGenericInstance, ForceGraph3DInstance } from '3d-force-graph'
import { MeshBasicMaterial } from 'three'
import { GraphOptionsGui } from '@/graph/GraphOptionsGui'

export class GraphStyle {
  private graphOptionsGui: GraphOptionsGui | null = null

  constructor(
    private graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>
  ) {}

  setNodesObjects() {
    this.graph
      .nodeRelSize(25)
      .nodeOpacity(1)
    this.graph.refresh()
    this.graph.nodeColor((node) => {
        // @ts-ignore
        return node.color.replace('rgb', 'rgba').replace(')', ', 0.8)')
    })
  }

  setLinksObjects() {
    this.graph.linkMaterial((link) => {
        return new MeshBasicMaterial({
          // @ts-ignore
          color: link.color,
          transparent: true,
          opacity: 0.8
        })
    })
  }

  update() {
    this.setNodesObjects()
    this.setLinksObjects()
    this.setArrows()
    this.graph.refresh()
  }

  private setArrows() {
    this.graph.linkDirectionalArrowLength(12).linkDirectionalArrowRelPos(0.5)
  }

  setOptions(graphOptionsGui: GraphOptionsGui | null) {
    this.graphOptionsGui = graphOptionsGui
    graphOptionsGui?.onStyleChange(this.update.bind(this))
  }
}
