<template src="./template.html"></template>

<script>

export default {
  name: 'MailBody',
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
    switchMail() {
      this.sendingMail = true;
    },
  },
}
</script>
