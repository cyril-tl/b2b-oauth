import "core-js/stable";
import "regenerator-runtime/runtime";
import "@babel/polyfill"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { API } from './constants.js'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  router,
  store,
  mounted() {
    this.$store.state.auth_base64 = btoa(API.clientId+':'+API.clientSecret);
    // this.$store.state.auth_base64 = Buffer.from(API.clientId+':'+API.clientSecret, 'base64');
  },
  methods: {
  },
  render: h => h(App)
}).$mount('#app')
