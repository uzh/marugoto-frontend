<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import Btn from '../../01_atoms/buttons';

export default {
  name: 'MailContainer',
  components: { Btn },
  data(){
    return{
      title: 'MailContainer',
      sendingMail: true,
      list: [
        {
          id: '333',
          selected: true,
          sender: 'Prof. Martinus',
          subject: 'Essay 3',
          date: 'Heute',
          time: '14:01',
          text: 'Dear Students, in order to complete your weekly task, complete the following exercises: Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni iure nobis expedita animi distinctio, suscipit itaque tempora qui! Voluptatem!'
        },
        {
          id: '222',
          selected: false,
          sender: 'Helen Schorno',
          subject: 'Essay 2',
          date: 'Heute',
          time: '13:23',
          text: 'Dear Students, you will have to write a essay till the 22nd of Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni iure nobis expedita animi distinctio, suscipit itaque tempora qui! Voluptatem!'
        },
        {
          id: '111',
          selected: false,
          sender: 'Prof. Martinus',
          subject: 'Essay 1',
          date: 'Heute',
          time: '11:09',
          text: 'Dear Students, for next week you will write an essay about propositions of Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni iure nobis expedita animi distinctio, suscipit itaque tempora qui! Voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni iure nobis expedita animi distinctio, suscipit itaque tempora qui! Voluptatem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci magni iure nobis expedita animi distinctio, suscipit itaque tempora qui!'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
    itemSelected: function() {
       return this.list.filter(item => item.selected)
    }
  },
  methods: {
    selectMail(item) {
      this.list.forEach(i => i.selected = false);
      item.selected = true;
    }
  }
}

</script>
