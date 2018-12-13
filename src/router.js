import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// Import components
import LoginView from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue'
import StorylineView from './views/StorylineView.vue'
import SupervisorView from './views/SupervisorView.vue'
import PageNotFound from './views/PageNotFound.vue'


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Auth pages
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requireAuth: false,
      },
    },
    // User pages
    {
      path: '/storyline',
      name: 'storyline',
      component: StorylineView,
      meta: {
        requireAuth: true,
        role: 'player'
      },
    },
    {
      path: '/overview',
      name: 'overview',
      component: SupervisorView,
      meta: {
        requireAuth: true,
        role: 'supervisor'
      },
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
  ],
})

// Global Guard
router.beforeEach((to, from, next) => {
  if( !store.getters.get_status.isLoged ){
    if( to.name == 'register' || to.name == 'login' ){
      next();
      return;
    }else{
      next('/login')
    }
  }else{
    if( store.getters.get_status.role === 'player' ){
      if( to.name === 'home' ){
        next('/storyline');
      }else if( to.name === 'storyline' ){
        next();
      }
      next(from.path);
    }
    else if( store.getters.get_status.role === 'supervisor'  ){
      if( to.name === 'home' ){
        next('/overview');
      }else if( to.name === 'overview' ){
        next();
      }
      next(from.path);
    }
  }
});

export default router;
