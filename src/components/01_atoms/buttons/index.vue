<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  // name of the component
  name: 'Btn',
  components: { SvgIcon },
  props: ['primary', 'secondary', 'text', 'ghost',
   'disabled', 'iconName', 'iconColor'],
  data() {
    return {
      
    };
  }
};
</script>