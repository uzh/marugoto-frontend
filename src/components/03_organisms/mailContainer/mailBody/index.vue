<template src="./template.html"></template>

<script>
import Btn from "@/components/01_atoms/buttons"

export default {
  name: 'MailBody',
  components: { Btn },
  props: ['list', 'selectedIndex'],
  data() {
    return {
      sendingMail: false,
    };
  },
  computed: {
    selectedMail: function() {
      return this.list.filter( (item, index) => {
        if( index == this.selectedIndex){
          return item;
        }
      })[0];
    },
  },
  methods: {
    switchMail: function() {
      this.sendingMail = true;
    },
    respondToMail: function() {
      this.sendingMail = true;
    },
  },
  watch: {
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
