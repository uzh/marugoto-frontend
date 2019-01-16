<template>
  <div id="app">
    <div class="page-container" :class="get_layoutState.notebook.opened ? 'halved' : ''">
      <!-- <Topbar /> -->
      <div><router-view /></div>
    </div>
    <RightSidebar v-if="get_status.isLoged"/>
    <NotebookContainer v-if="get_status.isLoged"/>
    <MailContainer v-if="get_status.isLoged" />
    <!-- <button id="show-dialog" @click="LAYOUT_OPEN('dialog')">Open Dialog</button> -->
    <DialogComponent v-if="get_layoutState.dialog.opened" @close="LAYOUT_CLOSE('dialog')" />
    <!-- <NotificationCmpt /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NotebookContainer from '@/components/03_organisms/notebookContainer';
import MailContainer from '@/components/03_organisms/mailContainer';
import Topbar from '@/components/03_organisms/sidebars/topbar';
import RightSidebar from '@/components/03_organisms/sidebars/rightSidebar';
import DialogComponent from '@/components/02_molecules/dialog';

import NotificationCmpt from './components/01_atoms/notificationCmpt';

export default{
  components: { NotebookContainer, MailContainer, Topbar, RightSidebar, DialogComponent, NotificationCmpt },
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
