<template>
  <div id="app">
    <div class="page-container" :class="get_layoutState.notebook.opened ? 'halved' : ''">
      <Topbar v-if="get_status.isLoged && get_topic.selected"/>
      <router-view />
    </div>
    <RightSidebar v-if="get_status.isLoged && get_topic.selected" />
    <NotebookContainer v-if="get_status.isLoged && get_topic.selected"/>
    <MailContainer v-if="get_status.isLoged && get_topic.selected" />
    <!-- <NotificationCmpt /> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import NotebookContainer from '@/components/03_organisms/notebookContainer';
import MailContainer from '@/components/03_organisms/mailContainer';
import Topbar from '@/components/03_organisms/sidebars/topbar';
import RightSidebar from '@/components/03_organisms/sidebars/rightSidebar';

import NotificationCmpt from './components/01_atoms/notificationCmpt';

export default{
  components: { NotebookContainer, MailContainer, Topbar, RightSidebar, NotificationCmpt },
  computed: {
    ...mapGetters([
      'get_status',
      'get_layoutState',
      'get_topic'
    ]),
  },
  methods: {
    ...mapActions([ 'LAYOUT_OPEN', 'LAYOUT_CLOSE' ]),
  },
}

</script>

<style lang="sass">@import './assets/scss/main.scss'</style>
