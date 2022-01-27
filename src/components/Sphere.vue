<template>
  <a-entity v-bind:position="pos">
    <a-sphere radius=".5" v-bind:color="color" v-on:click="clicked"
              shadow="cast: true"></a-sphere>
    <a-plane v-if="this.enabled" look-at="#camera" position="0 2.5 0" width="5" height="2.2" rotation="0 45 0" color="black" opacity="0.4" transparent="true">
      <a-text value="sha:" position="-2.5 1 0"></a-text>
      <a-text :value="this.commit.sha" position="-2 1 0"></a-text>
      <a-text value="message:" position="-2.5 0.7 0"></a-text>
      <a-text :value="this.commit.commit.message" position="-2.2 0.2 0" width="4" height="1"></a-text>
      <a-image :src="this.commit.committer.avatar_url" position="-2 -0.5 0.01" width="0.8" height="0.8"></a-image>
      <a-text :value="this.commit.committer.login" position="-2.4 -1 0"></a-text>
    </a-plane>
  </a-entity>
</template>

<script>

export default {
  name: "Sphere",
  props: ['distance', 'commit'],
  computed: {
    pos() {
      return `${2 + 2 *this.distance} -0.3 -4`;
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
      this.color = this.enabled?  "#bbbccc" : "#aaa223"
    }
  }
}
</script>

<style scoped>

</style>
