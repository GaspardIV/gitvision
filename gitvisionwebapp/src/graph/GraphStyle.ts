import type { ForceGraph3DGenericInstance, ForceGraph3DInstance } from '3d-force-graph'
import type { CommitNode, GraphData } from '@/graph/GraphData'

import { MeshBasicMaterial } from 'three'
import { GraphOptionsGui } from '@/graph/GraphOptionsGui'

export class GraphStyle {
  private highlightNodes = new Set()
  private highlightLinks = new Set()
  private hoverNode: CommitNode | null = null

  private optionsHashVisible = true
  private optionsNodeSize = 30
  // private branchMode= false;
  private ultraMode = false
  private graphOptionsGui: GraphOptionsGui | null = null

  constructor(
    private graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>,
    private graphData: GraphData
  ) {}

  setNodesObjects() {
    this.graph
      .nodeRelSize(25)
      .nodeOpacity(1)
    this.graph.refresh()
    // this.graph
      // .linkWidth((link) => (this.highlightLinks.has(link) ? 4 : 0))
      // .linkDirectionalParticles(4)
      // .linkDirectionalParticleWidth(20)

    this.graph.nodeColor((node) => {
        // @ts-ignore
        return node.color.replace('rgb', 'rgba').replace(')', ', 0.8)')
    })
  }

  setLinksObjects() {
    const nodesCount = this.graphData.commitIdToNodeMap.size
    this.graph.linkMaterial((link) => {
      // @ts-ignore
      // if (this.highlightLinks.has(link)) {

        return new MeshBasicMaterial({
          // @ts-ignore
          color: link.color,
          transparent: true,
          opacity: 0.7
        })
        // @ts-ignore next-line
      // @ts-nocheck
      // @ts-ignore
    })
  }

  update() {
    this.setNodesObjects()
    this.setLinksObjects()
    this.setArrows()
    this.setParticles()
    this.setActions()
    this.graph.refresh()
  }

  private setArrows() {
    this.graph.linkDirectionalArrowLength(12).linkDirectionalArrowRelPos(0.5)
  }

  private setParticles() {}

  private setActions() {
    // this.graph.onNodeRightClick(this.flyToNode.bind(this))
    // this.graph.onNodeClick(this.onNodeClick.bind(this))
    // this.graph.onLinkClick(this.onLinkClick.bind(this))
  }

  flyToNode(node: object) {
    // console.log('flyToNode', node)
    // node.__threeObj.material.color.set(0xff0000);
    const distance = 100
    // @ts-ignore
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    // @ts-ignore
    const newPos =
      // @ts-ignore
      node.x || node.y || node.z
        ? // @ts-ignore
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }
        : { x: 0, y: 0, z: distance } // special case if node is in (0,0,0)

    this.graph.cameraPosition(
      newPos, // new position
      // @ts-ignore
      null, //node, // lookAt ({ x, y, z })
      2000 // ms transition duration
    )
  }

  private updateHighlight() {
    this.graph
      .nodeColor(this.graph.nodeColor())
      .linkWidth(this.graph.linkWidth())
      .nodeThreeObject(this.graph.nodeThreeObject())
      .linkDirectionalParticles(this.graph.linkDirectionalParticles())
      .linkMaterial(this.graph.linkMaterial())
  }

  private onNodeClick(node: object | null) {
    if (!node && !this.highlightNodes.size) return

    this.highlightNodes.clear()
    this.highlightLinks.clear()
    const commitNode: CommitNode = <CommitNode>node
    // this.branchMode = false;
    if (this.hoverNode == commitNode) {
      if (this.ultraMode) {
        this.ultraMode = false
        this.hoverNode = null
        this.updateHighlight()
        return
      } else {
        this.ultraMode = true
      }
    }
    if (node) {
      const queue = []
      if (commitNode.firstChild) queue.push(commitNode.firstChild)
      if (commitNode.firstParent) queue.push(commitNode.firstParent)
      while (queue.length > 0) {
        console.log('queue', queue)
        const node1 = queue.pop()
        console.log('node1', node1)
        // @ts-ignore
        if (this.highlightNodes.has(node1)) continue

        console.log('node12', node1)
        // @ts-ignore
        this.highlightNodes.add(node1)
        // @ts-ignore
        if (node1.firstParent) {
          // @ts-ignore
          queue.push(node1.firstParent)
        }
        // @ts-ignore
        if (node1.firstChild) {
          // @ts-ignore
          queue.push(node1.firstChild)
        }
      }

      this.highlightNodes.add(node)
      commitNode.neighborsToHighlight.forEach((neighbor) => this.highlightNodes.add(neighbor))
      commitNode.linksToHighlight.forEach((link) => this.highlightLinks.add(link))
    }

    for (const link of this.graphData.commitsLinks) {
      if (this.highlightNodes.has(link.source) && this.highlightNodes.has(link.target)) {
        this.highlightLinks.add(link)
      }
    }

    this.hoverNode = commitNode
    this.updateHighlight()
  }

  setOptions(graphOptionsGui: GraphOptionsGui) {
    this.graphOptionsGui = graphOptionsGui
    graphOptionsGui.onStyleChange(this.update.bind(this))
    // graphOptionsGui.onStyleChange(this.update.bind(this));
  }
}
