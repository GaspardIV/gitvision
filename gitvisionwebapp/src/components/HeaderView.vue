<script setup lang="ts"></script>

<template>
  <div class="greetings">
    <h1 class="green">GitVision</h1>
    <h3>Immersive Visualization of Git Repositories</h3>
    <p style="border: 1px solid purple; padding: 10px; border-radius: 5px">
      Your participation in our short
      <a href="https://form_link_here" target="_blank" rel="noopener">research survey</a> will
      contribute significantly to our ongoing research and the improvement of GitVision. We value
      your feedback!
    </p>
    <br />
    <p>
      GitVision is a web tool designed to visualize Git repositories in virtual, augmented, and 3D
      reality. You can read more information about this project on
      <a href="http://github.com/gaspardIV/gitvision" target="_blank">Github</a>. Try the
      visualization by exploring a repository from the list below:
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
</style>
