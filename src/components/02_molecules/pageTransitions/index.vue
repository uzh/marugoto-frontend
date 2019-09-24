<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import Btn from '@/components/01_atoms/buttons'

export default {
  name: 'PageTransitions',
  components: { Btn },
  props: [ 'optionsList' ],
  computed: {
    ...mapGetters([ 'get_transitions', 'get_layoutState', 'get_transitions_state' ]),
  },
  methods: {
    emitTransition(id){
      if( this.get_transitions_state.page ){
        this.$emit('transitionChoosen', {'id': id, 'userTransition': true});
      }
    },
  },
}
</script>