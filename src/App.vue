<template>
  <div id="app">
    <!-- Layout concept -->
    <router-link to="/">home | </router-link>
    <router-link to="/login">Login | </router-link>
    <router-link to="/register">Register | </router-link>
    <router-link to="/overview">Supervisor | </router-link>
    <router-link to="/storyline">Player</router-link>
    <Sidebars />
    <div class="page-container">
      <router-view />
    </div>
    
    <!-- #Layout concept -->

    <!-- Can be moved to routed containers later on -->
    <NotebookContainer v-if="get_status.isLoged" />
    <MailContainer v-if="get_status.isLoged"/>
    <!-- #Can be moved to routed containers later on -->
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NotebookContainer from './components/notebookContainer';
import MailContainer from './components/mailContainer';
import Sidebars from './components/sidebars';

export default{
  components: { NotebookContainer, MailContainer, Sidebars },
  computed: {
    ...mapGetters([ 'get_status' ]),
  },
  methods: {

  },
  created(){
    
  }
}

</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
