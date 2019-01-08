<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MailContainer',
  data(){
    return{
      title: 'MailContainer',
      list: [
        {
          id: '333',
          selected: false,
          sender: 'Prof. Martinus',
          subject: 'Essay 3',
          date: 'Heute',
          time: '14:01',
          text: 'Dear Students, you will have to write a essay till the 22nd of...'
        },
        {
          id: '222',
          selected: true,
          sender: 'Helen Schorno',
          subject: 'Essay 2',
          date: 'Heute',
          time: '13:23',
          text: 'Dear Students, you will have to write a essay till the 22nd of...'
        },
        {
          id: '111',
          selected: false,
          sender: 'Prof. Martinus',
          subject: 'Essay 1',
          date: 'Heute',
          time: '11:09',
          text: 'Dear Students, you will have to write a essay till the 22nd of...'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
    itemSelected: function() {
       return this.list.filter(item => item.selected)
    }
  }
}

</script>
