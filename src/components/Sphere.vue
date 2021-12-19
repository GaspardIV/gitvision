<template>
  <a-sphere radius=".5" v-bind:color="color" v-bind:position="pos" v-on:click="clicked"></a-sphere>
</template>

<script>

export default {
  name: "Sphere",
  props: ['distance'],
  computed: {
    pos() {
      return `${this.distance} 0 -4`;
    }
  },
  data() {
    return {
      color: "#aaa223",
      offsetNumbers: [0, 1, -1]
    }
  },
  methods: {
    clicked: function () {
      this.color = "#00FF00"
    }
  }
}
</script>

<style scoped>

</style>
