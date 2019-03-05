<template src="./template.html"></template>

<script>
export default {
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
