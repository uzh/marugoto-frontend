<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import NotebookHeader from '../../01_atoms/notebookHeader';
import NotebookList from '../../01_atoms/notebookList';
import NotebookChapterMenu from '../../01_atoms/notebookChapterMenu';

export default {
  name: 'NotebookContainer',
  components: { NotebookHeader, NotebookList, NotebookChapterMenu },
  data(){
    return{
      title: 'Notebook',
      list: true,
      chapterMenu: true,
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
}
</script>
