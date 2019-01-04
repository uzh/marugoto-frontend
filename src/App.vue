<template>
  <div id="app">
    <div class="page-container">
      <Topbar />
      <div><router-view /></div>
    </div>
    <RightSidebar />
    <NotebookContainer v-if="get_status.isLoged" />
    <MailContainer v-if="get_status.isLoged" />
    <button id="show-dialog" @click="LAYOUT_OPEN('dialog')">Open Dialog</button>
    <DialogComponent v-if="get_layoutState.dialog" @close="LAYOUT_CLOSE('dialog')" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NotebookContainer from './components/notebookContainer';
import MailContainer from './components/mailContainer';
import Topbar from './components/sidebars/topbar';
import RightSidebar from './components/sidebars/rightSidebar';
import DialogComponent from './components/dialog';

export default{
  components: { NotebookContainer, MailContainer, Topbar, RightSidebar, DialogComponent },
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters([
      'get_status',
      'get_layoutState'
    ]),
  },
  methods: {
    ...mapActions([ 'LAYOUT_OPEN', 'LAYOUT_CLOSE' ]),
  },
  created(){
    
  }
}

</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
