import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Carousel, initTE } from "tw-elements";
initTE({ Carousel }, true); 

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import store from './store'

/* add icons to the library */
library.add(fas)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)

app.use(router)

app.mount('#app')
