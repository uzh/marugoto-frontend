<template src="./template.html"></template>

<script>
/* eslint-disable */

export default {
  name: 'SvgIcon',
  props: [ 'name', 'customColor', 'sizeH', 'sizeW' ],
  computed: {
    iconPath() {
      return require(`@/assets/icons/${this.name}.svg`).url;
    },
    className() {
      return 'svg-icon svg-icon--' + this.name;
    },
  },
};
</script>
