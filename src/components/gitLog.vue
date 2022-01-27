<template>
<!--  <div id="container">-->
  <a-entity v-for="(name, index) in this.data" :key="name" :position="pos(index)">
    <a-text :value="name" position="0 -1 -4" rotation="-90 0 0" color="black"></a-text>
    <sphere v-for="(commit, index) in this.commits.get(name)" :key="index" v-bind:distance="2*index" :commit="commit"></sphere>
  </a-entity>
<!--  </div>-->
<!--    <a-entity >-->
<!--      <a-entity :text="name.name"></a-entity>-->
<!--    </a-entity>-->
<!--  </div>-->
</template>

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
      data: [1, 2]
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
