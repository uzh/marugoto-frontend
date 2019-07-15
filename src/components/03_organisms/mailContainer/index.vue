<template src="./template.html"></template>

<script>
// TODO 
// will be important to add list of mail triggering que to be able to reset timers
// foo handleNewMails

import Timer from '@/timer';
import { mapGetters } from 'vuex';
import Btn from '../../01_atoms/buttons'

import MailList from './mailList';
import MailBody from './mailBody';

export default {
  name: 'MailContainer',
  components: { Btn, MailList, MailBody },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mails', 'get_newMails', 'get_selectedMailIndex' ]),
  },
  methods: {
    handleMail: function({id, read, autoOpen, mailIndex}) {
      let indexMail = {mailIndex}.mailIndex;

      this.$store.dispatch('SYNC_MAIL', {id, read}).then( () => {
        if( {autoOpen}.autoOpen == true ) {
          this.$store.dispatch('LAYOUT_OPEN','mail');
        }
        // CHECK SELECTED INDEX
        if(  indexMail === false && this.get_selectedMailIndex == undefined ){
          return;
        }else if( indexMail === false ){
          this.$store.dispatch('UPDATE_SELECTED_MAIL', this.get_selectedMailIndex + 1);
        }else {
          this.$store.dispatch('UPDATE_SELECTED_MAIL', indexMail);
        }
      });
    },
    handleNewMails: function() {
      // HANDLE_NEW_MAIL is part of timer & update here
      for( var ii = 0; ii < this.get_newMails.length; ii++){
        let mail = this.get_newMails[ii];
        let callback = this.handleMail;

        if( mail.openOnReceive ){
          new Timer(mail.receiveAfter, callback, {id: mail.id, read: true, autoOpen: true, mailIndex: 0}).start();
        }else{
          new Timer(mail.receiveAfter, callback, {id: mail.id, read: false, autoOpen: false, mailIndex: false}).start();
        }
      }
    },
    selectByIndex: function(obj) {
      this.handleMail({id: obj.id, read: true, autoOpen: false, mailIndex: obj.index});
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
