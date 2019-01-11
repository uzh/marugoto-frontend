<template src="./template.html"></template>

<script>
import Btn from '@/components/01_atoms/buttons'

export default {
  name: 'PageTransitions',
  components: { Btn },
  props: [ 'optionsList' ],
  methods: {
    emitTransition(id){
      this.$emit('transitionChoosen', id);
    },
  },
}
</script>