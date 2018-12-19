<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Icon from '@/components/icons';

export default {
  // name of the component
  name: 'btn',
  components: { Icon },
  props: ['primary', 'secondary', 'text', 'ghost', 'disabled', 'iconPosition', 'iconColor'],
  data() {
    return {
      
    };
  }
};
</script>