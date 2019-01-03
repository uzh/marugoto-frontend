<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '../buttons';

export default {
  // name of the component
  name: 'dialogContainer',
  props: ['dialogText', 'dialogTitle', ],
  components: { Btn },
  data() {
    return {
      newDialog: false
    };
  },
  methods: {
    
  }
};
</script>