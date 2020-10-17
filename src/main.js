import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './dependences/antdv.js'
import dict from './dependences/dictionary.js'

Vue.config.productionTip = false
Vue.use(router)

Vue.prototype.$axios = axios
Vue.prototype.$dict = dict
axios.defaults.baseURL = 'http://localhost:2333'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
