<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import ImageComponent from './imageComponent';
import TextComponent from './textComponent';

export default {
  // name of the component
  name: 'contentComponent',
  components: { ImageComponent, TextComponent },
  data() {
    return {
      comps: [
        {
          type: 'text',
          width: 7
        },
        {
          type: 'image',
          width: 4
        },
        {
          type: 'text',
          width: 4
        }
      ]
    };
  }
};
</script>