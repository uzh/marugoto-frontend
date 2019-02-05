<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import SvgIcon from '@/components/01_atoms/svgicon';
export default {
  // name of the component
  name: 'selectField',
  props: [ 'list', 'labelName', 'required' ],
  components: { SvgIcon},
  data() {
    return {
      selectedValue: '',
      listOpened: false,
      error: false,
      activatedValidation: false,
      optionSelected: false,
    };
  },
  created() {
    document.addEventListener('click', this.blurSelect)
  },
  methods: {
    optionSelection: function(item) {
      this.selectedValue = item.name;
      this.$emit('selectChange', item.value);
    },
    blurSelect(e){
      let el = this.$refs.selectWrapper;
      let target = e.target;
      if (( el !== target) && !el.contains(target)) {
        this.listOpened = false;
      }
      this.onOptionSelected();
    },
    onOptionSelected() {
      if ( this.selectedValue == '' && this.activatedValidation) {
        this.error = true;
      } else if (this.activatedValidation) {
        this.error = false;
        this.optionSelected = true;
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.blurSelect);
  }
};
</script>