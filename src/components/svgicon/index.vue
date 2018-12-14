<template src="./template.html"></template>

<script>

export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  computed: {
    iconPath() {
      return require(`@/assets/icons/${this.name}.svg`).default.url;
    },

    className() {
      return 'svg-icon svg-icon--' + this.name;
    }
  }
};
</script>

<style>
  .svg-icon {
    fill: currentColor;
    height: 40px;
    width: 40px;
  }
</style>
