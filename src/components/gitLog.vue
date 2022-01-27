<template>
  <sphere :key="n" v-for="n in data" v-bind:distance="n"></sphere>
</template>

<script>
import Sphere from "@/components/Sphere";

export default {
  name: "gitLog",
  components: {Sphere},
  data() {
    return {
      data: [1, 2]
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
