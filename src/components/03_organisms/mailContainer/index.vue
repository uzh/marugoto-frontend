<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import Btn from '../../01_atoms/buttons'

import MailList from './mailList';
import MailBody from './mailBody';

export default {
  name: 'MailContainer',
  components: { Btn, MailList, MailBody },
  data(){
    return{
      selectedIndex: 0,
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mails', 'get_newMails' ]),
  },
  methods: {
    selectByIndex: function(index) {
      this.selectedIndex = index;
    },
  }
}

</script>
