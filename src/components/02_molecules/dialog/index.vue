<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '@/components/01_atoms/buttons';

export default {
  // name of the component
  name: 'dialogComponent',
  components: { Btn },
  props: ['text'],
  data() {
    return {
      images: [
        {
          name: 'image',
          background: 'https://picsum.photos/960/540',
        }
      ],
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