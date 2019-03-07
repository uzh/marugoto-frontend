<template src="./template.html"></template>

<script>
/* eslint-disable */
import Icons from "@/assets/icons/arrow-bottom.svg"

export default {
  name: 'SvgIcon',
  props: [ 'name', 'customColor', 'sizeH', 'sizeW' ],
  components: {Icons},
  created: function() {
    console.log(Icons)
  },
  computed: {
    iconPath() {
      //console.log(require(`@/assets/icons/${this.name}.svg`).default.url)
      return Icons.url;
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
