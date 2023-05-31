<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <h1>Visualize your own repository</h1>
        <p>
          GitVision allows you to upload your own repository. To start, prepare your data file using the
          <a href="https://github.com/GaspardIV/gitvision/tree/main/tool" target="_blank" rel="noopener">GitVision script</a>.
          All the data pertaining to your repository will be stored securely within your browser's memory. This ensures that no private data is sent anywhere outside your system. Please note, this is a frontend project, and all processing and storage occur locally, without any data transmission.
          However you can always build GitVision from the source code and run it on your local machine.
          For source code and more information about the project, visit our
          <a href="https://www.github.com/gaspardIV/gitvision" target="_blank" rel="noopener">Github page</a>.
        </p>
        <input id="fileUpload" type="file" @change="fileInputChanged" />
        <router-link :to="'/localupload/'"
        ><button class="button is-primary is-small" :disabled="fileName===''">
          Explore {{ fileName }} repository in GitVision
        </button></router-link>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

import { ref } from "vue";
import pako from "pako";
import { useGRepoStore } from "@/stores/gRepoStore";

const fileName= ref("")

// @ts-ignore
const fileInputChanged = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (e) => {
    // @ts-ignore
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
