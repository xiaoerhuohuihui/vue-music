// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from "mint-ui"
import swiper from 'swiper'
import axios from 'axios'
import { jsonp } from './api/jsonp'
import store from './store'


import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.min.css'

Vue.use(MintUI)
Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$jsonp = jsonp
Vue.prototype.$swiper = swiper

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
