<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import svgIcon from '@/components/svgicon';

export default {
  // name of the component
  name: 'Btn',
  components: { svgIcon },
  props: ['primary', 'secondary', 'text', 'ghost',
   'disabled'],
  data() {
    return {
      
    };
  }
};
</script>