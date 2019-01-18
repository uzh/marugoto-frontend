<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import Btn from '@/components/01_atoms/buttons'

export default {
  name: 'PageTransitions',
  components: { Btn },
  props: [ 'optionsList' ],
  computed: {
    ...mapGetters([ 'get_transitions' ]),
  },
  methods: {
    emitTransition(id){
      this.$emit('transitionChoosen', id);
    },
  },
}
</script>