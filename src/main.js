import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { register } from 'swiper/element/bundle';
import VueTheMask from 'vue-the-mask'

register();

const app = createApp(App)

app.use(router).use(VueTheMask);

app.mount('#app')
