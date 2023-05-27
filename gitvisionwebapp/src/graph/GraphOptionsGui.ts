import type { GraphForces } from '@/graph/GraphForces'
import type { GraphScene } from '@/graph/GraphScene'
import GUI from 'lil-gui'

export class GraphOptionsGui {
  public gui = new GUI()
  public settings = {
    charge: -1500,
    link: 1.0,
    centerStrength: 0.0,
    enableStickToY: true,
    enableStickToX: true,
    Xheight: 20,
    Yheight: 30,
    enableOnDragEnd: true,
    enableShowLabels: true,
    enableSky: false,
    enableWater: false,
    enableShowBranches: true,
    enableShowTags: true,
    enableShowCommits: false
  }

  // singleton
  private static instance: GraphOptionsGui
  private onStyleChangeCallback = false
  static getInstance(graphForces: GraphForces, graphScene: GraphScene): GraphOptionsGui {
    if (!GraphOptionsGui.instance) {
      GraphOptionsGui.instance = new GraphOptionsGui(graphForces, graphScene)
    }
    return GraphOptionsGui.instance
  }

  private constructor(private graphForces: GraphForces, private graphScene: GraphScene) {
    this.settings.charge = graphForces.getChargeStrength()
    this.settings.link = graphForces.getLinkStrength()
    this.settings.centerStrength = graphForces.getCenterStrength()
    this.gui
      .add(this.settings, 'charge', -5500.0, 500.0, 1)
      .onChange(graphForces.setChargeStrength.bind(graphForces))
    this.gui
      .add(this.settings, 'link', 0.0, 10.0, 0.01)
      .onChange(graphForces.setLinkStrength.bind(graphForces))
    this.gui
      .add(this.settings, 'centerStrength', -10.0, 10.0, 0.01)
      .onChange(graphForces.setCenterStrength.bind(graphForces))
    this.graphForces.setGui(this)
  }

  // destructor
  destroy() {
    this.gui.destroy()
  }

  onStyleChange(update1: () => void) {
    if (!this.onStyleChangeCallback) {
      this.onStyleChangeCallback = true
      this.gui.add(this.settings, 'enableStickToY').onChange(update1)
      this.gui.add(this.settings, 'enableStickToX').onChange(update1)
      this.gui.add(this.settings, 'Yheight').onChange(update1)
      this.gui.add(this.settings, 'Xheight').onChange(update1)
      // this.gui
      //   .add(this.settings, "enableOnDragEnd")
      //   .onChange(update1);
      // this.gui
      //   .add(this.settings, "enableShowLabels")
      //   .onChange(update1);
      this.gui.add(this.settings, 'enableShowBranches').onChange(update1)
      this.gui.add(this.settings, 'enableShowTags').onChange(update1)
      this.gui.add(this.settings, 'enableShowCommits').onChange(update1)
    }
  }
}
