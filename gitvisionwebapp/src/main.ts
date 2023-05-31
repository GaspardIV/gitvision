import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { analytics, firebase } from "./utils/firebase";

import "aframe";
import "aframe-forcegraph-component";
import "aframe-extras"
import "aframe-htmlembed-component";
import "aframe-look-at-component";

import App from './App.vue'
import router from './router'


const app = createApp(App)
console.log(analytics, firebase)
app.use(createPinia())
app.use(router)

app.mount('#app')
