<template src="./template.html"></template>

<script>

export default {
  name: 'PageTransitions',
  components: { Btn },
  props: [ 'buttonsList' ],
  methods: {
    emitTransition(id){
      this.$emit('transitionChoosen', id);
    },
  },
}
</script>
