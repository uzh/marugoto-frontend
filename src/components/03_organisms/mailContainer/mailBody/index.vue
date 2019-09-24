<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown'
import Btn from "@/components/01_atoms/buttons"

export default {
  name: 'MailBody',
  components: { Btn, VueMarkdown },
  props: ['mail'],
  data() {
    return {
      sendingMail: false,
      mailRef: '',
    };
  },
  computed: {
    ...mapGetters([ 'get_transitions_state' ]),
  },
  methods: {
    respondToMail: function() {
      this.sendingMail = true;
    },
    sendReply: function(id) {
      if( this.get_transitions_state.mail ){
        this.$store.dispatch('TRANSITIONS_STATE', {mail: false, page: false}).then(() => {
          this.$store.dispatch('SAVE_MAIL_REPLY', {
            id,
            text: this.$refs[`mailArea${id}`].value,
          }).then(() => {
            this.sendingMail = false;
            this.$store.dispatch('LAYOUT_CLOSE', 'mail');
            this.$store.dispatch('TRANSITIONS_STATE', {mail: true, page: true});
          });
        });
      }
    },
    autoGrow: function(element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
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
          self.mailRef = self.$refs[`mailArea${self.mail.mail.id}`];
          self.$refs[`mailArea${self.mail.mail.id}`].focus();
        }, 100);
      }
    },
  },
}
</script>
