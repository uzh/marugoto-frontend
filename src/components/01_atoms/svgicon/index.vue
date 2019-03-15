<template src="./template.html"></template>

<script>
/* eslint-disable */

export default {
  name: 'SvgIcon',
  props: [ 'name', 'customColor', 'sizeH', 'sizeW' ],
  created: function() {
    console.log(this.name)
  },
  computed: {
    iconPath() {
      return require(`@/assets/icons/${this.name}.svg`);
    },
    className() {
      return 'svg-icon svg-icon--' + this.name;
    },
  },
};
</script>

<style>
  .svg-icon {
    max-width: 40px;
  }
</style>
