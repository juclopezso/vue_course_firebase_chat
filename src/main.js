import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from "vue-toast-notification"
import "vue-toast-notification/dist/theme-default.css"

// better notifications
Vue.use(VueToast, {
  position: "bottom"
})
// import bulma
require("./assets/css/main.scss");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
