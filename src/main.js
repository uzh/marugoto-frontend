import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

import Clipboard from 'v-clipboard';

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

// eslint-disable-next-line
console.info('%cMARUGOTO-FRONTEND', 'font-weight: bold',
  '\n - title:', process.env.VUE_APP_TITLE,
  '\n - tag:', process.env.VUE_APP_BUILD_IMAGE,
  '\n - tag:', process.env.VUE_APP_GIT_TAG,
  '\n - branch:', process.env.VUE_APP_GIT_BRANCH,
  '\n - revision: ', process.env.VUE_APP_GIT_REVISION,
)

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
