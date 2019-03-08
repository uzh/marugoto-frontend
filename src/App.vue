<template>
  <div id="app">
    <Errors v-if="get_errors" />
    <div v-if="!get_errors">
      <div class="page-container" :class="get_layoutState.notebook.opened ? 'halved' : ''">
        <Topbar v-if="get_status.isLoged && get_topic.selected"/>
        <router-view />
      </div>
      <RightSidebar v-if="get_status.isLoged && get_topic.selected" />
      <NotebookContainer v-if="get_status.isLoged && get_topic.selected"/>
      <MailContainer v-if="get_status.isLoged && get_topic.selected" />
      <NotificationCmpt 
        v-if="get_mailNotificationState" 
        :mailArrived="get_mailNotificationState" 
        :mailSender="get_mails" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NotificationCmpt from './components/01_atoms/notificationCmpt';
import Errors from './components/02_molecules/errors';
import NotebookContainer from '@/components/03_organisms/notebookContainer';
import MailContainer from '@/components/03_organisms/mailContainer';
import Topbar from '@/components/03_organisms/sidebars/topbar';
import RightSidebar from '@/components/03_organisms/sidebars/rightSidebar';

/* eslint-disable */
export default{
  components: { Errors, NotebookContainer, MailContainer, Topbar, RightSidebar, NotificationCmpt },
  computed: {
    ...mapGetters([
      'get_status',
      'get_layoutState',
      'get_topic',
      'get_mails',
      'get_mailNotificationState',
      'get_errors'
    ]),
  },
  created: function() {
    this.$store.dispatch('ERROR_NETWORK_CONNECTION', false);
    // console.log('Base path: ', process.env.VUE_APP_BASE_PATH)
  },
  methods: {
    ...mapActions([ 'LAYOUT_OPEN', 'LAYOUT_CLOSE' ]),
  },
}
</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
