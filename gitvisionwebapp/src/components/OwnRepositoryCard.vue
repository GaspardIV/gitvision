<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h1>Visualize your own repository</h1>
        <p>

        </p>
        <input id="fileUpload" type="file" @change="fileInputChanged" />
        <router-link :to="'/own/'"
        ><button class="button is-primary is-small" :disabled="fileName===''">
          Explore {{ fileName }} repository in GitVision
        </button></router-link>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref } from "vue";
import pako from "pako";
import { useGRepoStore } from "@/stores/gRepoStore";
import axios from "axios";

const fileName= ref("")
const fileInputChanged = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    const compressed = new Uint8Array(e.target.result);
    const decompressed = pako.inflate(compressed);
    const text = new TextDecoder("utf-8").decode(decompressed);
    const repo = useGRepoStore();
    repo.readOwnRepoFromUpload({data: JSON.parse(text)})
    console.log(text);
  };
  reader.readAsArrayBuffer(file);
  fileName.value = file.name;

};
</script>

<style scoped>
.card {
  background-color: var(--color-background);
  border: purple 1px solid;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 100px;
}

</style>
