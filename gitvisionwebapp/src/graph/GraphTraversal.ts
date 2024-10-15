// dla kazdego brancza/taga przypisz nowy kolor jezeli nie jest juz przypisany
// idz do jego parentow - przypisz parent[0] ten sam kolor, a dla drugiego nowy kolor
// dfs...
import type { CommitNode, CommitsLink } from '@/graph/GraphData'

export class GraphTraversal {
  static colors = [
    [0.0, 1.0, 0.0],
    [1.0, 0.0, 1.0],
    [0.0, 0.5, 1.0],
    [1.0, 0.5, 0.0],
    [0.5, 0.75, 0.5],
    [0.3531948899886336, 0.04113357537865503, 0.7027526738378668],
    [0.9989446332202108, 0.01174480697416358, 0.25024098658984784],
    [0.005519786933469106, 0.4014012522655761, 0.3820626791431261],
    [0.0, 1.0, 1.0],
    [0.7729188357962592, 0.4946415163965777, 0.9885374602034788],
    [1.0, 1.0, 0.0],
    [0.4491955306849762, 0.2979587207034653, 0.0249476557607331],
    [0.0, 1.0, 0.5],
    [0.9744412511502203, 0.6461587092705581, 0.5456932615392985],
    [0.5215508797439956, 0.9234577649806555, 0.02387189505661036],
    [0.5725350154006781, 0.34440133088477753, 0.4974876336011872],
    [0.4614163388106377, 0.8534829131252263, 0.9657371563767638],
    [0.006338524980616156, 0.6210107707017605, 0.04701302935666485],
    [0.0, 0.0, 1.0],
    [0.9942998407045156, 0.2945252780475046, 0.6530073189073693],
    [1.0, 1.0, 0.5],
    [0.3436238010809912, 0.0482923731447672, 0.28656826412462755],
    [0.6130137755634842, 0.16553117238827864, 0.976772131724209],
    [0.0004459678742342321, 0.6750259957601806, 0.5896820429532125],
    [0.5696112013914137, 0.6087860006961489, 0.01788766054139368],
    [0.754438596768832, 0.03192357516282629, 0.6163866594588179],
    [0.0, 0.0, 0.5],
    [0.07210460703761512, 0.27140425617804864, 0.7350764531236769],
    [0.39278421429395616, 0.5450523007974024, 0.8333703828576021],
    [0.7968946111375996, 0.8144125952561377, 0.27440399599886567],
    [0.7689492175533834, 0.8173281939668111, 0.7692825440808171],
    [0.6713800765985845, 0.0189787994963726, 0.009113547837223512],
    [0.22757401828976742, 0.8524379510618648, 0.22906980558102474],
    [0.7870187177371777, 0.25522279600101894, 0.21257791580978413],
    [0.030295100402102038, 0.31932905056300986, 0.05695762076208999],
    [0.32428351083268625, 0.5387314017573244, 0.3384373251879348],
    [0.3587532510499759, 0.9879217787900137, 0.6155699352859026],
    [0.7193970079993935, 0.5594587919284283, 0.3770255027994771],
    [0.30811643760068064, 0.3036916460224339, 0.9453410132629932],
    [0.10844219998095916, 0.8658507231906818, 0.7523653326460661],
    [0.9277305166862184, 0.25949990537544976, 0.9960186883380455],
    [0.9908464124227994, 0.43654641515834935, 0.35149105080419907],
    [0.7051046786868267, 0.9932465982140011, 0.48726604669164386],
    [0.7085497548855638, 0.4933076989864319, 0.6816531666461354],
    [0.9514194823205107, 0.6930088024383836, 0.9707488697621204],
    [0.06148761361538502, 0.15511837232589765, 0.2643150454742158],
    [0.30724623722504363, 0.4058987693688899, 0.6056494728454381],
    [0.9993690583334355, 0.7769272447199284, 0.07517986965191759],
    [0.6700488419203312, 0.022534719503841005, 0.3129842373563939],
    [0.16321180006920244, 0.7070542199741625, 0.975789768241869]
  ]

  static getColorForGroup(group: number) {
    const color = this.colors[group % this.colors.length]
    return `rgb(${Math.floor(color[0] * 255)}, ${Math.floor(color[1] * 255)}, ${Math.floor(
      color[2] * 255
    )})`
  }

  static colorNodes(commitIdToNode: Map<string, CommitNode>) {
    let newColor = 1
    const dfs = (id: string) => {
      const commitNode = commitIdToNode.get(id)
      if (commitNode == undefined) return
      const commit = commitNode?.commit
      for (let i = 0; i < commit.parentsIds.length; i++) {
        const parentId = commit.parentsIds[i]
        const parentNode = commitIdToNode.get(parentId)
        if (parentNode == undefined) continue
        if (parentNode.colorGroup == -1) {
          if (i == 0) parentNode.colorGroup = commitNode.colorGroup
          else parentNode.colorGroup = newColor++
          parentNode.color = this.getColorForGroup(parentNode.colorGroup)
          dfs(parentId)
        }
      }
    }

    for (const commitNode of commitIdToNode.values()) {
      if (commitNode.colorGroup == -1) {
        commitNode.colorGroup = newColor++
        commitNode.color = this.getColorForGroup(commitNode.colorGroup)
        dfs(commitNode.id)
      }
    }
  }

  static calculateTopologicalOrder(commitIdToNodeMap: Map<string, CommitNode>) {
    const visited = new Set<string>()
    const dfs = (id: string) => {
      const commitNode = commitIdToNodeMap.get(id)
      if (commitNode == undefined) return
      const commit = commitNode.commit
      if (visited.has(commit.id)) return
      visited.add(commit.id)
      for (let i = 0; i < commit.parentsIds.length; i++) {
        const parentId = commit.parentsIds[i]
        dfs(parentId)
      }
      commitNode.topologicalOrder = visited.size
    }

    for (const commitNode of commitIdToNodeMap.values()) {
      if (visited.has(commitNode.id)) continue;
      dfs(commitNode.id)
    }
    const minTopologicalOrder = Array.from(commitIdToNodeMap.values()).reduce(
      (min, node) => Math.min(min, node.topologicalOrder),
      Infinity
    )
    for (const commitNode of commitIdToNodeMap.values()) {
      if (minTopologicalOrder != Infinity)
        commitNode.topologicalOrder = commitNode.topologicalOrder - minTopologicalOrder
    }
  }

  static calculateChronologicalOrder(commitIdToNodeMap: Map<string, CommitNode>) {
    const commitsNodes = Array.from(commitIdToNodeMap.values())
    commitsNodes.sort((a, b) => {
      return a.commit.time.getTime() - b.commit.time.getTime()
    })

    let order = 0
    for (let i = 0; i < commitsNodes.length; i++) {
      commitsNodes[i].chronologicalOrder = order
      order++
    }
  }

  static colorLinks(commitIdToNodeMap: Map<string, CommitNode>, commitsLinks: CommitsLink[]) {
    for (const link of commitsLinks) {
      const sourceNode = commitIdToNodeMap.get(link.source)
      const targetNode = commitIdToNodeMap.get(link.target)
      if (sourceNode == undefined || targetNode == undefined) continue
      link.color = targetNode.commit.parentsIds.length > 1 ? sourceNode.color : targetNode.color
    }
  }
}
