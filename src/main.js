import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Carousel, initTE } from "tw-elements";
initTE({ Carousel }, true); 

const app = createApp(App)

app.use(router)

app.mount('#app')
