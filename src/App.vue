<template>
  <div id="app">
    <div class="page-container">
      <Topbar />
      <div><router-view /></div>
    </div>
    <RightSidebar />
    <NotebookContainer v-if="get_status.isLoged" />
    <MailContainer v-if="get_status.isLoged"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NotebookContainer from './components/notebookContainer';
import MailContainer from './components/mailContainer';
import Topbar from './components/sidebars/topbar';
import RightSidebar from './components/sidebars/rightSidebar';

export default{
  components: { NotebookContainer, MailContainer, Topbar, RightSidebar },
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
