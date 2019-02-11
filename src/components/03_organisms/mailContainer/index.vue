<template src="./template.html"></template>

<script>
// TODO will be important to add list of mail trigring que to be able to reset timers
import Timer from '@/timer';
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
    handleNewMails: function() {
      // Handle new mails update here
      for( var ii = 0; ii < this.get_newMails.length; ii++){
        new Timer(3, this.get_newMails[ii]).start();
      }
    },
    selectByIndex: function(index, id) {
      console.log('Select by index: ', index, id);
      this.selectedIndex = index;
      this.$store.dispatch('SET_NEW_MAIL_AS_READ', id);
    },
  },
  watch: {
    get_newMails: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.handleNewMails();
      }
    },
  },
}

</script>
