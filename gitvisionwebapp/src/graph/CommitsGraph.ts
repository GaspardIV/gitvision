import ForceGraph3D from "3d-force-graph";
import type { ForceGraph3DInstance } from "3d-force-graph";
import type { ConfigOptions } from "3d-force-graph";
import type { Branch, Tag } from "@/stores/Types";
// @ts-ignore
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { GraphData } from "@/graph/GraphData";
import type { Commit } from "@/stores/Types";
import { GraphForces } from "@/graph/GraphForces";
import { GraphOptionsGui } from "@/graph/GraphOptionsGui";
import { GraphStyle } from "@/graph/GraphStyle";
// @ts-ignore
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import type { Scene } from "aframe";


export class CommitsGraph {
  private graphOptions: ConfigOptions = {
    controlType: "fly",
    // controlType: "orbit",
    // @ts-ignore
    extraRenderers: [new CSS2DRenderer()]
  };
  private graph = ForceGraph3D(this.graphOptions);

  private graphData = new GraphData();

  private graphForces = new GraphForces(this.graph);

  private graphOptionsGui = GraphOptionsGui.getInstance(this.graphForces);

  private graphStyle = new GraphStyle(this.graph, this.graphData);

  setup(element: ForceGraph3DInstance) {
    this.graph = element;
    this.graphForces = new GraphForces(this.graph);
    this.graphOptionsGui = GraphOptionsGui.getInstance(this.graphForces);
    this.graphStyle = new GraphStyle(this.graph, this.graphData);
  }

  updateWithData(commits: Commit[], branches: Branch[], tags: Tag[]) {
    const gData = this.graphData.updateData(commits, branches, tags);
    this.graphForces.updateGraph();
    this.graphStyle.update();
    this.graph.graphData(gData);
    this.graphStyle.setOptions(this.graphOptionsGui);
  }

  initTagsAndBranches(sceneEl: Scene) {
    const alreadyHasTags = new Set();
    this.graphData.tags.forEach((tag) => {
      // console.log("tag", tag);
      const tagEl = document.createElement("a-text");
      if (alreadyHasTags.has(tag.commitId)) {
        return;
      }
      alreadyHasTags.add(tag.commitId);

      const nodeEl = this.graphData.commitIdToNodeMap.get(tag.commitId);
      if (!nodeEl) {
        return;
      }
      tagEl.setAttribute("value", "[tag] " + tag.tagId);
      tagEl.setAttribute("look-at", "[camera]");
      tagEl.setAttribute("tag", tag.commitId);
      tagEl.setAttribute("scale", "10 10 10");
      tagEl.setAttribute("side", "double");
      tagEl.setAttribute("color", "green");
      tagEl.setAttribute("align", "center");
      tagEl.setAttribute("baseline", "bottom");
      tagEl.setAttribute("width", "100");
      sceneEl.appendChild(tagEl);
      tagEl.setAttribute("position", this.getNodeTagPosition(tag.commitId));
    });

    this.graphData.branches.forEach((branch) => {
      const branchEl = document.createElement("a-text");
      const nodeEl = this.graphData.commitIdToNodeMap.get(branch.commitId);
      if (!nodeEl) {
        return;
      }
      console.log("branch", branch);
      branchEl.setAttribute("value", "[HEAD] " + branch.name);
      branchEl.setAttribute("look-at", "[camera]");
      branchEl.setAttribute("branch", branch.commitId);
      branchEl.setAttribute("color", nodeEl?.color || "green");
      branchEl.setAttribute("scale", "20 20 20");
      branchEl.setAttribute("side", "double");
      branchEl.setAttribute("align", "center");
      branchEl.setAttribute("baseline", "bottom");
      branchEl.setAttribute("width", "100");
      sceneEl.appendChild(branchEl);
      branchEl.setAttribute("position", this.getNodeBranchPosition(branch.commitId));
    });
  }

  getNodeTagPosition(commitId: any) {
    const node = this.graphData.commitIdToNodeMap.get(commitId);
    if (!node) return "";
    // @ts-ignore
    return `${node.x} ${node.y + 20} ${node.z}`;
  }

  getNodeBranchPosition(commitId: any) {
    const node = this.graphData.commitIdToNodeMap.get(commitId);
    if (!node) return "";
    // @ts-ignore
    return `${node.x} ${node.y + 100} ${node.z}`;
  }

  dispose() {
    this.graph.graphData();
    // this.graphData.dispose();
    // this.graphForces.dispose();
    // this.graphOptionsGui.dispose();
    // this.graphStyle.dispose();
  }
}
