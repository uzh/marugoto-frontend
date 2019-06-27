<template src="./template.html"></template>

<script>
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'downloadListItem',
  components: { SvgIcon },
  props: [ 'title', 'action', 'startedAt' ],
  data: function() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', ' September', 'October', 'December'],
    };
  },
  computed: {
    startedAtP:  function() {
      let date = new Date(this.startedAt);
      return `${date.getDate()} ${this.months[date.getMonth()]}`;
    },
  },
};
</script>