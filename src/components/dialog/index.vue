<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import Btn from '../buttons';

export default {
  // name of the component
  name: 'dialogComponent',
  components: { Btn },
  data() {
    return {
      components: [
        {
          name: 'title',
          width: '12',
          text: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          name: 'image',
          width: '4',
          background: 'https://picsum.photos/960/540',
        },
        {
          name: 'text',
          width: '6',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quis inventore ab reprehenderit aut deleniti consequuntur. Assumenda aperiam nemo voluptatibus, eum quaerat doloremque totam distinctio molestias adipisci, labore in sequi.'
        },
        {
          name: 'image',
          width: '10',
          background: 'https://picsum.photos/1920/1080',
        },
        {
          name: 'text',
          width: '8',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quis inventore ab reprehenderit aut deleniti consequuntur. Assumenda aperiam nemo voluptatibus, eum quaerat doloremque totam distinctio molestias adipisci, labore in sequi.'
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