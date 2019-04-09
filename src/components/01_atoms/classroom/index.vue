<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'Classroom',
  components: { SvgIcon },
  props: [ 'item' ],
  methods: {
    emitChange: function() {
      this.$emit('emitClassroomSelection', this.item);
    },
  }
};
</script>