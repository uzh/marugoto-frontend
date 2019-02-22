<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown'
import Btn from "@/components/01_atoms/buttons"

export default {
  name: 'MailBody',
  components: { Btn, VueMarkdown },
  props: ['mail', 'selectedIndex'],
  data() {
    return {
      sendingMail: false,
    };
  },
  methods: {
    respondToMail: function() {
      this.sendingMail = true;
    },
    sendReply: function(id) {
      this.$store.dispatch('SAVE_MAIL_REPLY', {
        id,
        text: this.$refs[`mailArea${id}`].value,
      }).then(() => this.sendingMail = false);
    },
  },
  watch: {
    mail: function(oldVal, newVal) {
      if( newVal != oldVal ) {
        this.sendingMail = false;
      }
    },
    sendingMail: function(newVal) {
      let self = this;
      if( newVal != true ){
        return;
      }else{
        setTimeout(function(){
          self.$refs[`mailArea${self.mail.mail.id}`].focus();
        }, 100);
      }
    },
  },
}
</script>
