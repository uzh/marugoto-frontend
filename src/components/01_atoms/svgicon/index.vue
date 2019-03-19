<template src="./template.html"></template>

<script>
/* eslint-disable */
import IconsFile from '@/assets/images/icons.svg';

export default {
  name: 'SvgIcon',
  props: [ 'name', 'customColor', 'sizeH', 'sizeW' ],
  component: { IconsFile },
  computed: {
    iconPath() {
      console.log('icons file: ', `${IconsFile}#${this.name}` )
      console.log(require(`@/assets/icons/${this.name}.svg`) )
      return require(`@/assets/icons/${this.name}.svg`).url;
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
