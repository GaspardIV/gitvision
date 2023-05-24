<template>
  <div class="item">
    <img
      :src="'https://github.com/' + props.url?.split('/')[3] + '.png'"
      width="50"
      height="50"
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
            <span class="tag is-info">Branching: {{ props.branchingStrategy }}</span>
          </div>
        </div>
        <div class="column">
          <button class="button is-primary is-small">
            Explore {{ props.title }} repository in GitVision
          </button>
        </div>
      </div>
      {{ props.notes }} <br />
      <a :href="props.url" target="_blank" rel="noopener">{{ props.url }}</a> <br />
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
.item:hover .button{
  background-color: purple; /* Add this to change background color on hover */
  color: white;
  transform: scale(1.1); /* Add this to slightly increase the size on hover */
  cursor: pointer; /* Add this to change cursor on hover */
}
.button {
  border-radius: 25px; /* Add this for rounded corners */
  transition: all 0.5s; /* Add this for smooth hover effect */
}
.button:hover:active:enabled {
  background-color: #4CAF50; /* Add this to change background color on hover */
  transform: scale(1.4); /* Add this to slightly increase the size on hover */
  cursor: pointer; /* Add this to change cursor on hover */
}
@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  img {
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 100px;
    height: 100px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
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
  min-width: 150px;
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
