<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  // name of the component
  name: 'Btn',
  components: { svgIcon },
  props: ['primary', 'secondary', 'text', 'ghost',
   'disabled', 'iconName'],
  data() {
    return {
      
    };
  }
};
</script>