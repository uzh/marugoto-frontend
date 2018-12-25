<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '../buttons';
import DialogText from '../dialog/dialogText';
import DialogTitle from '../dialog/dialogTitle';

export default {
  // name of the component
  name: 'dialogContainer',
  components: { Btn, DialogText, DialogTitle },
  data() {
    return {
      newDialog: false
    };
  },
  methods: {
    
  }
};
</script>