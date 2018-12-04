<template src="./template.html"></template>

<script>

export default {
  name: 'test',
  data(){
    return{
      title: 'Test strana',
      lista: ['Voce', 'Povrce', 'Pice']
    }
  },
  methods:{
    izbrisiMe(){
      this.title = ''
    }
  }
}
</script>
