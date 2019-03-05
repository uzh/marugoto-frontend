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
    };
  },
  // created() {
  //   document.addEventListener('click', this.blurSelect)
  // },
  methods: {
    optionSelection: function(item) {
      this.selectedValue = item.name;
      this.$emit('selectChange', item.value);
      this.listOpened = false;
    },
    // blurSelect(e){
    //   let el = this.$refs.selectWrapper; // select-field had this ref
    //   let target = e.target;
    //   if (( el !== target) && !el.contains(target)) {
    //     this.listOpened = false;
    //   }
    // },
  },
  // destroyed () {
  //   document.removeEventListener('click', this.blurSelect);
  // }
};
</script>