<template>
  <div style="height: 100%; width: 100%; margin: 0; font-size: 26px">
    <!--    <div class="hello">-->
    <!--      <h1>{{ msg }}</h1>-->
    <!--    </div>-->
    <div v-if="commits.length===0" class="center" style="height: 100%; width: 100%; background-color: #42b983">
      <form @submit.prevent="submitForm">
        <div>
          github.com/<input  id="owner" type="text" v-model="owner" placeholder="owner" style="width: 73px"
                            required
                            oninput="onKeyPressed(this, 73);" onchange="onKeyPressed(this, 73)" />/<input  id="repo" type="text" v-model="repo" onchange="onKeyPressed(this, 55)" oninput="onKeyPressed(this, 55);"
                                                                       placeholder="repo" style="width: 55px" required/>
        </div>
        <button :class="[owner && repo  ? activeClass : '']" type="submit">ENTER GITVISION</button>
      </form>
    </div>
    <scene v-else :commits="commits" :branches="branches"></scene>
  </div>
</template>

<script>

import Scene from "@/components/Scene";


export default {
  name: 'HelloWorld',
  components: {Scene},
  props: {
    msg: String,
  },
  data() {
    return {
      owner: '',
      repo: '',
      commits: [],
      branches: [],
      activeClass: 'active'
    }
  },
  created() {
    window.onKeyPressed = (that, number) => {
      that.value = that.value.toLowerCase();
      if (that.value.length > 0) {
        that.style.width = ((that.value.length) * 19) + 'px';
      } else {
        that.style.width = number + 'px';
      }
    }
  },
  methods: {
    submitForm() {

      // axios.post('//jsonplaceholder.typicode.com/posts', {
      //   userID: this.userID,
      //   name: this.name,
      //   email: this.email,
      //   firstSon: this.firstSon
      // }).then(response => {
      //   // console.log(response);
      //   // this.response = response.data
      //   this.success = 'Data saved successfully';
      //   this.response = JSON.stringify(response, null, 2)
      // }).catch(error => {
      //   this.response = 'Error: ' + error.response.status
      // })
      // this.name = '';
      // this.email = '';
      // this.firstSon = '';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: white;
  border-radius: 10px;
  font-size: 26px;
  margin: 0 2px;
  max-width: calc(100vw - 100px) !important;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 26px;
  padding: 12px 38px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: black;
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  color: #fff;
  background-color: #FFBCD1;
}

button:active {
  color: #fff;
  background-color: transparent;
}

button:focus {
  outline: none;
  box-shadow: 20px 15px 30px #6867AC, -20px 15px 30px #A267AC, -20px -15px 30px #CE7BB0, 20px -15px 30px #FFBCD1;
}


h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
