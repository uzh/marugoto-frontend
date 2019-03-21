<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'RightSidebar',
  components: { svgIcon },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mailNotificationState' ]),
  },
  methods: {
    switchMailLayout: function(param) {
      if( param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','mail');
      }else if( !param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_CLOSE','mail');
      }
    },
    switchNotebookLayout: function(param) {
      if( param && !this.get_layoutState.notebook.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','notebook');
        this.emitChange('openNotebook');
      }else if( !param && !this.get_layoutState.notebook.disabled ){
        this.$store.dispatch('LAYOUT_CLOSE','notebook');
        this.emitChange('closeNotebook');
      }
    },
    emitChange: function(val) {
      this.$emit('emitContainerOpen', val);
    }
  },
}
</script>
