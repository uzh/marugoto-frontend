<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
import InputCheckbox from '@/components/01_atoms/inputs/checkbox'

export default {
  name: 'ExerciseCheckbox',
  props: [ 'optionsList', 'exerciseId', 'name' ],
  components: { InputCheckbox },
  data() {
    return {
      checkedFields: [],
    }
  },
  computed: {
    ...mapGetters([ 'get_page' ]),
  },
  methods: {
    emitAnswer: function(){
      this.$emit('emitCheckboxChange', this.checkedFields.toString(), this.exerciseId);
    },
  },
  watch: {
    'get_page.id': function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.checkedFields = [];
      }
    },
    checkedFields : function() {
      if (this.checkedFields.toString() != ''){
        this.emitAnswer();
      }
    },
  },
}
</script>
