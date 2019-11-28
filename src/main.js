import Vue from 'vue'
import App from './App.vue'
import  { ToastPlugin  } from 'vux'
Vue.use(ToastPlugin)
new Vue({
  el: '#app',
  render: h => h(App)
})
