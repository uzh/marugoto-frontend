<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '../buttons';

export default {
  // name of the component
  name: 'dialogComponent',
  props: ['dialogText', 'dialogTitle', 'textWidth' ],
  components: { Btn },
  data() {
    return {
      options: [
        {
          text: 'option A'
        },
        {
          text: 'option B'
        }
      ]
    };
  }
};
</script>