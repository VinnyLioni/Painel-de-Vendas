import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/transitionsFile.css'
import "./assets/fontawesome/all.js";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')