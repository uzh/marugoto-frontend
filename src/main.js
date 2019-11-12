import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import Clipboard from 'v-clipboard';

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.config.productionTip = false;
Vue.use(VCalendar);
Vue.use(Clipboard);
Vue.use(VueMoment, {
    moment: moment,
})

moment.tz.setDefault("UTC");

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
