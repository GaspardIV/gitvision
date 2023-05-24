<script setup lang="ts">
import RepositoriesList from '../components/RepositoriesList.vue'
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
    <h3 style="position: fixed; border-radius: 0 20px 0 0; bottom: 0; left: 0; background-color: var(--color-background); border: purple 1px solid; padding: 10px">
      Finished Exploring?<br/> Assist with a <a>Short Survey for a Master's Thesis</a>!
    </h3>
  </footer>
</template>
