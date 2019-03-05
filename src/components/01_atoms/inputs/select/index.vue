<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';
export default {
  name: 'selectField',
  props: [ 'list', 'labelName', 'required' ],
  components: { SvgIcon},
  data() {
    return {
      selectedValue: '',
      listOpened: false,
    };
  },
  methods: {
    optionSelection: function(item) {
      this.selectedValue = item.name;
      this.$emit('selectChange', item.value);
      this.listOpened = false;
    },
  },
};
</script>