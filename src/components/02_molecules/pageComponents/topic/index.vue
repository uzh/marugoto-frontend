<template src="./template.html"></template>

<script>
import Btn from '@/components/01_atoms/buttons';

export default {
  name: 'TopicComponent',
  components: { Btn },
  props: [ 'list' ],
}
</script>
