<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import NotebookHeader from './notebookHeader';
import NotebookList from './notebookList';
import NotebookChapterMenu from './notebookChapterMenu';
import NotebookContent from './notebookContent';

export default {
  name: 'NotebookContainer',
  components: { NotebookHeader, NotebookList, NotebookChapterMenu, NotebookContent },
  data(){
    return{
      title: 'Notebook',
      headerTitle: '',
      showContent: true,
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
