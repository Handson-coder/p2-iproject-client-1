import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
Vue.config.productionTip = false

const socket = io('http://localhost:3000');
Vue.use(VueSocketIOExt, socket);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
