<template>

  <!--
     todo do files like keyboard, input user name like keyboard
     https://aframe.io/docs/1.2.0/components/link.html link do wizji komita wejscie w niego podejrzenie diffow ???

     https://stemkoski.github.io/A-Frame-Examples/
     https://stemkoski.github.io/A-Frame-Examples/keyboard.html-->

  <div style="background-color: wheat; height:100vh">
    <a-scene>
      <switch-theme-panels>
      </switch-theme-panels>
      <git-log></git-log>
      <Player/>
      <sphere :key="n" v-for="n in offsetNumbers" v-bind:distance="n"></sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
    </a-scene>
  </div>
</template>

<script>
import Sphere from "@/components/Sphere";
import SwitchThemePanels from "@/components/SwitchThemePanels";
import Player from "@/components/Player";

export default {
  name: "Scene",
  components: {Player, Sphere, SwitchThemePanels},
  data() {
    return {
      offsetNumbers: [0, 1, -1, 10]
    }
  },

}
</script>

