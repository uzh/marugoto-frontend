<!-- import html template -->
<template src="./template.html"></template>

<!-- start JS -->
<script>
/* eslint-disable */
import SvgIcon from '@/components/01_atoms/svgicon';
export default {
  // name of the component
  name: 'selectField',
  props: [ 'list', 'genderLabel', 'required' ],
  components: { SvgIcon},
  data() {
    return {
      selectedValue: 'Gender',
      listOpened: false,
      error: false,
      activatedValidation: false,
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
      this.verifyField();
    },
    verifyField() {
      if ( this.selectedValue == 'Gender' && this.activatedValidation == true ) {
        this.error = true;
      } else {
        this.error = false;
      }
    }
  },
  destroyed () {
    document.removeEventListener('click', this.blurSelect)
  }
};
</script>