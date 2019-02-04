<template src="./template.html"></template>

<script>
import svgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';

export default {
  name: 'NotebookPages',
  components: { svgIcon, Btn },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      transitionTime: 300,
    }
  },
  methods: {
    toggleScroll: function() {
      this.$emit('toggleScroll');
    },
    openEntriesMenu: function() {},
  },
}
</script>