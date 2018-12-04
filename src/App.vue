<template>
  <div id="app">
    <!-- Layout concept -->
    <Sidebars />
    <div class="page-container">
      <router-view/>
      
    </div>
    <!-- #Layout concept -->

    <!-- Can be moved to routed containers later on -->
    <NotebookContainer v-if="get_loggedStatus" />
    <MailContainer v-if="get_loggedStatus"/>
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
    ...mapGetters([ 'get_loggedStatus' ]),
  },
}

</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
