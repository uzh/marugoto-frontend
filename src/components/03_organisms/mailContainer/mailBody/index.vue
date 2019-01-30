<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MailBody',
  props: ['selectedIndex'],
  data() {
    return {
      sendingMail: false,
    };
  },
  computed: {
    ...mapGetters([ 'get_mails' ]),
    selectedMail: function() {
      return this.get_mails.filter( (item, index) => {
        if( index == this.selectedIndex){
          return item;
        }
      });
    },
  },
  methods: {
    switchMail() {
      this.sendingMail = true;
    },
  },
}
</script>
