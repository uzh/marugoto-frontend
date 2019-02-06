<template src="./template.html"></template>

<script>
import InputCheckbox from '@/components/01_atoms/inputs/checkbox'

export default {
  name: 'ExerciseCheckbox',
  props: [ 'optionsList', 'exerciseId' ],
  components: { InputCheckbox },
  data() {
    return {
      checkedFields: [],
    }
  },
  methods: {
    emitAnswer: function(){
      this.$emit('emitCheckboxChange', this.checkedFields.toString(), this.exerciseId);
    },
  },
  watch: {
    checkedFields : function() {
      if (this.checkedFields.toString() != ''){
        this.emitAnswer();
      }
    },
  },
}
</script>
