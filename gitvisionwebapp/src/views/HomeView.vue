<script setup lang="ts">
import RepositoriesList from "../components/RepositoriesList.vue";
import HeaderView from "@/components/HeaderView.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <HeaderView />
    </div>
  </header>
  <main>
    <RepositoriesList />
  </main>
  <footer>
    <h4
      style="
        position: fixed;
        border-radius: 0 20px 0 0;
        bottom: 0;
        left: 0;
        background-color: var(--color-background);
        border: purple 1px solid;
        padding: 10px;
      "
    >
      Finished Exploring?<br />
      Please Assist with a <a href="https://docs.google.com/forms/d/1bjKZ8hNTx1DVMMZ7PspAB_cJOv3KHcO18ki87c084uQ">Short Survey for a Master's Thesis</a>!
    </h4>

    <p style="text-align: center; width: 100%; padding-bottom: 40px">This page uses Google cookies for analytics. Learn more <a href="https://policies.google.com/technologies/cookies">here</a>.</p>
  </footer>
</template>

<style lang="css">
body {
  overflow: auto !important;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

</style>
