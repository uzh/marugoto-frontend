import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import Clipboard from 'v-clipboard';

Vue.config.productionTip = false
Vue.use(VCalendar);
Vue.use(Clipboard);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')