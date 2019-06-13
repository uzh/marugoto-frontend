<template src="./template.html"></template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'VideoComponent',
  components: { VueMarkdown, },
  props: [ 'source', 'numberOfColumns', 'caption', 'componentID' ],
  data: function() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
    };
  },
}
</script>
