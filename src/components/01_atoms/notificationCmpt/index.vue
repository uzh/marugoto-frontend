<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */

export default {
  // name of the component
  name: 'notificationCmpt',
  props: [ 'mailArrived', 'mailSender' ],
  data() {
    return {
      disappeared: false,
    }
  },
  mounted() {
    var self = this;
    setTimeout(function() {
      self.disappeared = true;
    }, 5000);
  },
};
</script>