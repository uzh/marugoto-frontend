<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'radioField',
  props: ['item', 'name', 'value'],
  methods: {
    emitChange(value){
      this.$emit('emitRadioChange', value);
    },
  },
  computed: {
    ...mapGetters([ 'get_page' ]),
  },
  watch: {
    'get_page.id': function(newVal, oldVal) {
      if( newVal != oldVal ){
        // checked from css
      }
    },
  },
};
</script>
