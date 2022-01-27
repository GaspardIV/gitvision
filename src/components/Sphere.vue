<template>
  <a-entity v-bind:position="pos">
    <a-sphere radius=".5" v-bind:color="color" v-on:click="clicked"
              shadow="cast: true"></a-sphere>
    <a-plane v-if="this.enabled" look-at="#camera" position="-1 0.5 0" rotation="0 45 0" color="#334455"></a-plane>
  </a-entity>
</template>

<script>

export default {
  name: "Sphere",
  props: ['distance'],
  computed: {
    pos() {
      return `${this.distance} 0.5 -4`;
    }
  },
  data() {
    return {
      enabled: false,
      color: "#aaa223"
    }
  },
  methods: {
    clicked: function () {
      this.enabled = !this.enabled
      this.color = this.enabled? "#aaa223" : "#bbbccc"
    }
  }
}
</script>

<style scoped>

</style>
