import Vue from 'vue'
import App from './App.vue'
import { store } from './store';
import { router } from './router';
import axios from 'axios';

axios.defaults.baseURL = 'https://todoapp-vue-c8914-default-rtdb.firebaseio.com/';

new Vue({
  el: '#app',
  render: h => h(App),
  store: store,
  router: router,
})
