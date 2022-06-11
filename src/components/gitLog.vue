<template>
<!--  <div id="container">-->
  <a-entity v-for="(name, index1) in this.data" :key="name" :position="pos(index1)">
    <a-text :value="name" position="0 -1 -4" rotation="-90 0 0" color="black"></a-text>
    <a-entity v-for="(commit, index) in this.commits.get(name)" :key="index">
      <sphere  v-bind:distance="2*index" :color="this.colors[index1 % this.colors.length]" :commit="commit"></sphere>
      <a-entity v-if="index!=0">
            <a-entity  :line="`start: ${2 + 4 * index} -0.3 -4; end: ${2 + 4 * (index-1)} -0.3 -4; color: ${this.colors[index1 % this.colors.length]}`"></a-entity>
<!--        <a-entity :line="`start: ${2 + 4 * index-1} -0.3 -4; end: ${2 + 4 * index} -0.3 -4; color: red`"></a-entity>-->
      </a-entity>
    </a-entity>
  </a-entity>
<!--  </div>-->
<!--    <a-entity >-->
<!--      <a-entity :text="name.name"></a-entity>-->
<!--    </a-entity>-->
<!--  </div>-->
</template>

<!--
TODO -> KAZDY BRANCH Z MERGAMI TAK JAK W GITLOGU -> WSPOLNE COMMITY SA W BRANCZACH KAZDY PO SHA PODOBNYM.
-->


<script>
import Sphere from "@/components/Sphere";

export default {
  name: "gitLog",
  components: {Sphere},
  props: {
    branches: [],
    commits: new Map()
  },
  data() {
    return {
      data: [1, 2],
      colors: [
        '#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000'
      ]
    }
  },
  created() {
    let res = []
    for (const branchesKey in this.branches) {
      res.push(this.branches[branchesKey].name)
    }
    this.data = res;
  },
  methods: {
    pos(distance) {
      return `0 0 ${5*distance}`;
    },
    text_pos(distance) {
      return `0 0 ${distance}`;
    }
  },
  computed: {
    branch_names() {
      return ['xxx']
    }
  }
}
</script>

<style scoped>

</style>
