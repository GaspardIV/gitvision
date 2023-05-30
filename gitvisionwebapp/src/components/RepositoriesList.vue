<script setup lang="ts">
import RepositoryCard from "./RepositoryCard.vue";
import { useRepoStore } from "@/stores/repositories";
import OwnRepositoryCard from "@/components/OwnRepositoryCard.vue";

const repos = useRepoStore()
</script>

<template>
  <RepositoryCard
    v-for="repo in repos.repos"
    :key="repo.url"
    v-bind="repo"
    style="margin-bottom: 50px; width: 100%"
  >
  </RepositoryCard>
  <OwnRepositoryCard />


</template>
