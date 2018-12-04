<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import MailSidebar from './mailSidebar';
import NotebookSidebar from './notebookSidebar';

export default {
  name: 'StatusBar',
  components: { NotebookSidebar, MailSidebar },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
