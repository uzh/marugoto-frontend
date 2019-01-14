<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import NotebookHeader from '../../01_atoms/notebookHeader';
import NotebookList from '../../01_atoms/notebookList';

export default {
  name: 'NotebookContainer',
  components: { NotebookHeader, NotebookList },
  data(){
    return{
      title: 'Notebook',
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
