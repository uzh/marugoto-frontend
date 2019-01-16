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
  data() {
    return {
      images: [
        {
          name: 'image',
          background: 'https://picsum.photos/960/540',
        }
      ],
      components: [
        {
          name: 'title',
          text: 'Lorem ipsum dolor sit amet consectetur'
        },
        {
          name: 'text',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quis inventore ab reprehenderit aut deleniti consequuntur. Assumenda aperiam nemo voluptatibus, eum quaerat doloremque totam distinctio molestias adipisci, labore in sequi.'
        },
        {
          name: 'text',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, quis inventore ab reprehenderit aut deleniti consequuntur. Assumenda aperiam nemo voluptatibus, eum quaerat doloremque totam distinctio molestias adipisci, labore in sequi.'
        },
        {
          name: 'subtitle',
          text: 'Lorem ipsum dolor'
        },
        {
          name: 'text',
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