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
      headerTitle: '',
      listItems: [
        {
          title: 'First of a kind',
          current: false
        },
        {
          title: 'The one before',
          current: false
        },
        {
          title: 'Dancing at the rokumenikan',
          current: false
        },
        {
          title: 'Spreckensville',
          current: false
        },
      ]
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState' ]),
  },
  methods: {
    chooseStory(item) {
      this.headerTitle = item.title;
      this.listItems.forEach(el => el.current = false);
      item.current = true;
    }
  }
}
</script>
