import Vue from 'vue'
import Router from 'vue-router'
import LoginView from './views/LoginView.vue'
import StorylineView from './views/StorylineView.vue'
import SupervisorView from './views/SupervisorView.vue'
import PageNotFound from './views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/storyline',
      name: 'storyline',
      component: StorylineView
    },
    {
      path: '/overview',
      name: 'overview',
      component: SupervisorView
    },
    {
      path: '/404',
      name: 'pageNotFound',
      component: PageNotFound,
    },
    // Redirects Unknown Urls to 404
    {
      path: '*',
      redirect: '404',
    },
  ]
})
