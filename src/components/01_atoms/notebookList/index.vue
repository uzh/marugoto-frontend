<template src="./template.html"></template>

<script>

export default {
  name: 'NotebookList',
  data(){
    return{
      list: [
        {
          text: 'First of a kind',
          current: false
        },
        {
          text: 'The one before',
          current: false
        },
        {
          text: 'Dancing at the rokumenikan',
          current: true
        },
        {
          text: 'Spreckensville',
          current: false
        },
      ]
    }
  },
  computed: {
    
  },
}
</script>
