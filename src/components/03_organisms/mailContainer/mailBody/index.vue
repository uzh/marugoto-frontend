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
  },
  watch: {
    mail: function(oldVal, newVal) {
      if( newVal != oldVal ) {
        this.sendingMail = false;
      }
    },
    sendingMail: function(oldVal, newVal) {
      let self = this;
      if( newVal == true ){
        this.$refs.mailArea.blur();
      }else{
        setTimeout(function(){
          self.$refs.mailArea.focus();
        }, 100);
      }
    },
  },
}
</script>
