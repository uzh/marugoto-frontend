import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// Import components
import LoginView from '@/components/04_pages/LoginView.vue'
import RegisterView from '@/components/04_pages/RegisterView.vue'
import ResetView from '@/components/04_pages/ResetView.vue'
import StorylineView from '@/components/04_pages/StorylineView.vue'
import GamesView from '@/components/04_pages/GamesView.vue'
import TopicsView from '@/components/04_pages/TopicsView.vue'
import SupervisorView from '@/components/04_pages/SupervisorView.vue'
import PageNotFound from '@/components/04_pages/PageNotFound.vue'


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
      path: '/games',
      name: 'games',
      component: GamesView,
      meta: {
        requireAuth: true,
        role: 'player'
      },
    },
    {
      path: '/topics',
      name: 'topics',
      component: TopicsView,
      meta: {
        requireAuth: true,
        role: 'player'
      },
    },
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
        role: 'player'
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
  // console.log('=============== GUARD ON ===============')
  if( !store.getters.get_status.isLoged ){
    document.body.classList.add('sidebar-page-padding-right');
    store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
    if( to.name == 'register' || to.name == 'login' || to.name == 'reset' ){
      // console.log('Go to: ', to.name)
      next();
      return;
    }else{
      // console.log('Go to: LOGIN')
      next('/login')
    }
  }else{
    if( store.getters.get_status.role === 'player' && !store.getters.get_supervision.selected ){
      document.body.classList = 'sidebar-page-padding-top sidebar-page-padding-right';

      if( to.name === 'home' && store.getters.get_topic.id != undefined ){
        // console.log('Go to: STORYLINE from home, coz we have alreaady selected topic active')
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', true);
        next('/storyline');
      }else if( to.name === 'home' && store.getters.get_topic.id === undefined ){
        // console.log('Go to: GAMES from home, coz there is no selected topic')
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
        document.body.classList = '';
        next('/games');
      }else if( to.name === 'games' ){
        // console.log('Go to: ', to.name)
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
        document.body.classList = '';
        next();
      }else if( to.name === 'topics' ){
        // console.log('Go to: ', to.name)
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
        document.body.classList = '';
        next();
      }else if( to.name === 'storyline' && store.getters.get_topic.id != undefined ){
        // console.log('Go to: ', to.name)
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', true);
        next();
      }else if( to.name === 'storyline' && store.getters.get_topic.id === undefined ){
        // console.log('Go to: GAMES from stopryline, coz for storyline is not selected topic!')
        store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
        document.body.classList = '';
        next('/games');
      }else{
        // console.log('Go to: from, ', from.name)
        next(from.path);
      }
    }
    else if( store.getters.get_status.role === 'player' && store.getters.get_supervision.selected  ){
      store.dispatch('TOGGLE_SIDEBAR_VISIBILITY', false);
      if( to.name === 'home' ){
        document.body.classList = 'sidebar-page-padding-right';
        next('/overview');
      }
      else if( to.name === 'overview' ){
        document.body.classList = 'sidebar-page-padding-right';
        next();
      }
      else if( to.name === 'games' ){
        store.dispatch('UPDATE_SUPERVISION', false);
        next();
      }else{
        next(from.path);
      }
      
    }
  }
});

export default router;
