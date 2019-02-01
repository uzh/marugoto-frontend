import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

Vue.config.productionTip = false
Vue.use(VCalendar);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')