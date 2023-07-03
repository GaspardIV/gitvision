<template>
  <div class="item">
    <img
      :src="'https://github.com/' + props.url?.split('/')[3] + '.png'"
      width="50"
      height="50"
      class="avatar"
      alt="repository logo"
    />
    <div class="details">
      <h3>
        {{ props.title }}
      </h3>
      {{ props.description }} <br />
      <div class="columns">
        <div class="column">
          <div class="tags">
            <span class="tag is-info">Size: {{ props.size }}</span> <br />
<!--            <span class="tag is-info">Branching: {{ props.branchingStrategy }}</span>-->
          </div>
        </div>
        <div class="column">
          <router-link :to="'g/' + props.url?.split('/')[3] + '/' + props.url?.split('/')[4]"
            ><button class="button is-primary is-small">
              Explore {{ props.title }} repository in GitVision
            </button></router-link>
        </div>
      </div>
      {{ props.notes }} <br />
      <a :href="props.url" class="url" target="_blank" rel="noopener">{{ props.url }}</a> <br />
    </div>
    <!--  asas-->
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  align-items: center;
}
@media (max-width: 420px) {
  .avatar {
    float: left;
    margin-right: 1rem;
  }
  .item {
    display: block;
  }
}

.url {
  word-break: break-all;
}
.details {
  flex: 1;
  margin-left: 1rem;
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}
.item:hover .button {
  background-color: purple; /* Add this to change background color on hover */
  color: white;
  transform: scale(1.1); /* Add this to slightly increase the size on hover */
  cursor: pointer; /* Add this to change cursor on hover */
}
.button {
  white-space: normal;
  word-wrap: break-word;
  //background-color: #4caf50; /* Add this to change background color on hover */
  border-radius: 25px; /* Add this for rounded corners */
  transition: all 0.5s; /* Add this for smooth hover effect */
}


.button {
  padding: 1em;
  appearance: none;
  background: #00000095;
  border: 3px solid var(--color-text);
  border-radius: 1em;
  //margin: 1em 1em 0 0;
  color: white;
}


.button:hover:active:enabled {
  background-color: #4caf50; /* Add this to change background color on hover */
  transform: scale(1.4); /* Add this to slightly increase the size on hover */
  cursor: pointer; /* Add this to change cursor on hover */
}

  .item {
    width: 100%;
  }

.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  //height: 100%;
}
.column {
  display: flex;
  width: 300px;
  min-width: 100px;
  justify-content: center;
  align-items: center; /* Add this to center align the button */
}
</style>
<script setup lang="ts">
const props = defineProps({
  url: String,
  title: String,
  description: String,
  branchingStrategy: String,
  strategy: String,
  notes: String,
  size: String
})
</script>
