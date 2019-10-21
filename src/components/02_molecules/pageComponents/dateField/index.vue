<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon'
import InputComponent from '@/components/01_atoms/inputs/text'

export default {
  name: 'DateComponent',
  props: [ 'exerciseId', 'existingDate', 'label' ],
  components: { SvgIcon, InputComponent },
  data: function() {
    return{
      stateID: this.exerciseId,
      inputValue: '',
    }
  },
  methods: {
    dateInputEmit: function(){
      this.$emit('emitDate', {
        value: this.inputValue,
        exerciseId: this.exerciseId,
      });
    },
  },
}
</script>
