import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// Import components
import LoginView from '@/components/04_pages/LoginView.vue'
import RegisterView from '@/components/04_pages/RegisterView.vue'
import StorylineView from '@/components/04_pages/StorylineView.vue'
import SupervisorView from '@/components/04_pages/SupervisorView.vue'
import PageNotFound from '@/components/04_pages/PageNotFound.vue'
import ResetView from '@/components/04_pages/ResetView.vue'


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
    {
      path: '/reset',
      name: 'reset',
      component: ResetView,
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
    document.body.classList.add('sidebars-off');
    if( to.name == 'register' || to.name == 'login' || to.name == 'reset' ){
      next();
      return;
    }else{
      next('/login')
    }
  }else{
    document.body.classList.remove('sidebars-off');
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
