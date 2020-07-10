import Vue from 'vue'
import App from './App'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from '@/router/router.js'
import store from '@/store/store.js'
import Axios from 'axios'


Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Token ' + token
}

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
