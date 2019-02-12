<template src="./template.html"></template>

<script>
// TODO 
// will be important to add list of mail trigring que to be able to reset timers
// foo handleNewMails

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
      selectedIndex: undefined,
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mails', 'get_newMails' ]),
  },
  methods: {
    handleMail: function(payload) {
      this.$store.dispatch('HANDLE_NEW_MAIL', payload);
    },
    handleNewMails: function() {
      // HANDLE_NEW_MAIL is part of timer & update here
      for( var ii = 0; ii < this.get_newMails.length; ii++){
        let mail = this.get_newMails[ii];
        let callback = this.handleMail;

        if( mail.receiveAfter == 0 || mail.openOnReceive ){
          callback(mail);
          this.$store.dispatch('LAYOUT_OPEN','mail');
        }else{
          new Timer(mail.receiveAfter, callback, mail).start();
        }
      }
    },
    selectByIndex: function(obj) {
      this.selectedIndex = obj.index;
      this.$store.dispatch('SET_NEW_MAIL_AS_READ', obj.id );
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
