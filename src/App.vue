<template>
  <div id="app">
    <div class="page-container">
      <Topbar />
      <div><router-view /></div>
    </div>
    <RightSidebar />
    <NotebookContainer v-if="get_status.isLoged" />
    <MailContainer v-if="get_status.isLoged"/>
    <button id="show-dialog" @click="toggleDialog(true)">Show Dialog</button>
    <DialogContainer v-if="dialogOpened" @close="toggleDialog(false)" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import NotebookContainer from '@/components/03_organisms/notebookContainer';
import MailContainer from '@/components/03_organisms/mailContainer';
import Topbar from '@/components/03_organisms/sidebars/topbar';
import RightSidebar from '@/components/03_organisms/sidebars/rightSidebar';

import DialogContainer from '@/components/02_molecules/dialog';

export default{
  components: { NotebookContainer, MailContainer, Topbar, RightSidebar, DialogContainer },
  data() {
    return {
      dialogOpened: false
    };
  },
  computed: {
    ...mapGetters([ 'get_status' ]),
  },
  methods: {
    toggleDialog(para) {
      if(para) {
        this.dialogOpened = true;
      } else {
        this.dialogOpened = false;
      }
    }
  },
  created(){
    
  }
}

</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
