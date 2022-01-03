<template>
  <sphere :key="n" v-for="n in data" v-bind:distance="n"></sphere>
</template>

<script>
import ExampleProvider from "@/components/ExampleProvider";
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
    this.exampleProvider = new ExampleProvider();
    console.log(this.exampleProvider.getAll())
    this.data = this.exampleProvider.getAll()
    // this.exampleProvider.getAll().then((result) => {
      // this.data = result;
    // });
  }
}
</script>

<style scoped>

</style>
