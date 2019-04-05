<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'Btn',
  components: { SvgIcon },
  props: ['primary', 'secondary', 'text', 'ghost', 'white',
   'disabled', 'iconName', 'iconColor', 'iconPosition'],
};
</script>