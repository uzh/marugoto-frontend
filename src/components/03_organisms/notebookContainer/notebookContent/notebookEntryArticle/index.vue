<template src="./template.html"></template>

<script>

export default {
  name: 'NotebookEntryArticle',
  data(){
    return{
      list: [
        {
          name: 'image',
          backgroundImage: 'https://picsum.photos/960/540',
          imageText: 'Ukiyoe depicting ballroom dancing at the Rokumeikan, quibusdam harum quae velit aliquid, modi nemo, ratione labore ut?'
        },
        {
          name: 'text',
          text: 'The key element of the Rokumeikan is the fact that everyone dressed up in western clothes to go there. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorum, veniam reprehenderit minus suscipit, id, repellendus quidem totam a et omnis? Magni cumque commodi quod quas assumenda quaerat illum veritatis non voluptas quibusdam harum quae velit aliquid, modi nemo, ratione labore ut? Incidunt natus, corrupti consequatur facilis dolor quis architecto.'
        },
        {
          name: 'text',
          text: 'Magni cumque commodi quod quas assumenda quaerat illum veritatis non voluptas quibusdam harum quae velit aliquid, modi nemo, ratione labore ut? Incidunt natus, corrupti consequatur facilis dolor quis architecto.'
        }
      ]
    }
  },
  computed: {
    
  },
}
</script>
