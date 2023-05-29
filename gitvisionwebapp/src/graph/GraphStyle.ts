import type { ForceGraph3DGenericInstance, ForceGraph3DInstance } from '3d-force-graph'
import type { GraphScene } from '@/graph/GraphScene'
import type { CommitNode, GraphData } from '@/graph/GraphData'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import * as d3 from 'd3'
import { THREE } from 'aframe'
import { CullFaceNone, MeshBasicMaterial, MeshLambertMaterial } from 'three'
import { GraphOptionsGui } from '@/graph/GraphOptionsGui'

export class GraphStyle {
  private highlightNodes = new Set()
  private highlightLinks = new Set()
  private hoverNode: CommitNode | null = null

  private optionsHashVisible = true
  private optionsNodeSize = 10
  // private branchMode= false;
  private ultraMode = false
  private graphOptionsGui: GraphOptionsGui | null = null

  constructor(
    private graph: ForceGraph3DGenericInstance<ForceGraph3DInstance>,
    private graphScene: GraphScene,
    private graphData: GraphData
  ) {}

  timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000)

    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + ' years'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months'
    }
    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + ' days'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes'
    }
    return Math.floor(seconds) + ' seconds'
  }

  setNodesObjects() {
    this.graph
      // @ts-ignore
      .nodeThreeObject((node) => {
        // is close to camera position
        // const isCloseToCamera = this.graphScene.isCloseToCamera({x: node.x, y: node.y, z: node.z});
        const nodeEl = document.createElement('div')
        // if (node.commit.tag) {
        //   const shortMessage = document.createElement("p");
        //   shortMessage.textContent = node.commit.tag;
        //   shortMessage.style.color = node.color;
        //   nodeEl.appendChild(shortMessage);
        // }
        const shortSha = node.id.toString().substring(0, 7)
        if (
          (this.highlightNodes.has(node) && (this.ultraMode || this.hoverNode == node)) ||
          (node.commit.branch && this.graphOptionsGui?.settings.enableShowBranches) ||
          (node.commit.tag && this.graphOptionsGui?.settings.enableShowTags)
        ) {
          nodeEl.textContent = shortSha + '   ' + node.commit.committer // node.commit.short;
          if (node.commit.branch && this.graphOptionsGui?.settings.enableShowBranches) {
            nodeEl.textContent = node.commit.branch + ' -> ' + node.commit.committer
            nodeEl.className = 'branch'
          }
          const shortMessage = document.createElement('p')
          shortMessage.textContent =
            node.commit.short + ' ' + node.topologicalOrder + ' ' + node.chronologicalOrder
          shortMessage.style.color = 'white'
          if (node.commit.tag && this.graphOptionsGui?.settings.enableShowTags) {
            shortMessage.className = 'tag'
          }
          nodeEl.appendChild(shortMessage)
          const date = document.createElement('p')
          date.textContent = this.timeSince(node.commit.time)
          date.className = 'date'
          nodeEl.appendChild(date)
          if (!nodeEl.className) {
            nodeEl.className = 'node-label'
          }
          if (this.hoverNode == node) {
            nodeEl.style.color = 'magenta'
            nodeEl.style.textShadow = 'text-shadow: 2px 2px black'
            // nodeEl.style.fontSize = "8px";
          }
          // nodeEl.addEventListener(
          nodeEl.addEventListener('click', (e) => {
            this.onNodeClick(node)
            this.flyToNode(node)
          })
          // nodeEl.className = "node-label";
          const res = new CSS2DObject(nodeEl)
          res.position.set(30, 40, 0)
          return res
        } else if (this.highlightNodes.size > 0) {
          return null
        } else if (this.graphOptionsGui?.settings.enableShowCommits) {
          /*if (this.clickHighlightNodes.has(node)) {*/ nodeEl.textContent = shortSha // node.commit.short;
          nodeEl.style.color = node.color.replace('rgba', 'rgba').replace(', 0.6)', ')')
          nodeEl.style.textShadow = 'text-shadow: 2px 2px black'
          nodeEl.style.fontSize = '10px'
          // nodeEl.addEventListener(
          nodeEl.addEventListener('click', (e) => {
            this.onNodeClick(node)
            this.flyToNode(node)
          })
          // nodeEl.className = "node-label";
          const res = new CSS2DObject(nodeEl)
          res.position.set(0, 10, 0)
          return res
        }
      })
      .nodeThreeObjectExtend(true)
      .nodeRelSize(this.optionsNodeSize)
      .nodeOpacity(1)

    this.graph
      .linkWidth((link) => (this.highlightLinks.has(link) ? 4 : 0))
      .linkDirectionalParticles((link) => (this.highlightLinks.has(link) ? 4 : 0))
      .linkDirectionalParticleWidth(4)

    this.graph.nodeColor((node) => {
      if (this.highlightNodes.has(node)) {
        if (this.hoverNode == node) {
          return 'white'
        }
        return node.color
      } else if (this.highlightNodes.size > 0) {
        return node.color.replace('rgb', 'rgba').replace(')', ', 0.2)')
      } else {
        return node.color.replace('rgb', 'rgba').replace(')', ', 0.8)')
      }
    })
  }

  setLinksObjects() {
    const nodesCount = this.graphData.commitIdToNodeMap.size
    this.graph.linkMaterial((link) => {
      // @ts-ignore
      if (this.highlightLinks.has(link)) {
        return new MeshBasicMaterial({
          color: link.color,
          transparent: true,
          opacity: 1
        })
      } else if (this.highlightNodes.size > 0) {
        return new MeshBasicMaterial({
          color: link.color,
          transparent: true,
          opacity: 0.3
        })
      } else {
        // const opacity =  (link.target.chronologicalOrder - link.source.chronologicalOrder) / nodesCount;
        const sourceOrder = this.graphData.commitIdToNodeMap.get(link.source).chronologicalOrder
        const targetOrder = this.graphData.commitIdToNodeMap.get(link.target).chronologicalOrder
        let opacity = 1 - (targetOrder - sourceOrder) / (nodesCount / 3)
        opacity = Math.max(0.2, opacity)
        // console.log(opacity)
        // const opacity = node.chronologicalOrder / this.graph.getNodesCount();
        return new MeshBasicMaterial({
          color: link.color,
          transparent: true,
          opacity: opacity
        })
      }
    })
  }

  update() {
    this.setNodesObjects()
    this.setLinksObjects()
    this.setArrows()
    this.setParticles()
    this.setActions()
  }

  private setArrows() {
    this.graph.linkDirectionalArrowLength(12).linkDirectionalArrowRelPos(0.5)
  }

  private setParticles() {}

  private setActions() {
    console.log('setActions', this.graph)

    // this.graph.onNodeRightClick(this.flyToNode.bind(this))
    // this.graph.onNodeClick(this.onNodeClick.bind(this))
    // this.graph.onLinkClick(this.onLinkClick.bind(this))
  }

  flyToNode(node: object) {
    console.log('flyToNode', node)
    // node.__threeObj.material.color.set(0xff0000);
    const distance = 100
    // @ts-ignore
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    // @ts-ignore
    const newPos =
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
          queue.push(node1.firstParent)
        }
        if (node1.firstChild) {
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
