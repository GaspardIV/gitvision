import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "aframe";
import "aframe-forcegraph-component";
import "aframe-extras"
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
