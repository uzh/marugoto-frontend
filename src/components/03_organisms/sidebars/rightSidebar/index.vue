<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex';
import SvgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'RightSidebar',
  components: { SvgIcon },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mailNotificationState' ]),
  },
  mounted: function() {
    if( this.get_layoutState.mail.opened ){
      this.$refs.mailBtnOpen.classList = 'mail-sidebar-icon out';
      this.$refs.mailBtnClose.classList = 'mail-sidebar-icon in';
    }else{
      this.$refs.mailBtnOpen.classList = 'mail-sidebar-icon in';
      this.$refs.mailBtnClose.classList = 'mail-sidebar-icon out';
    }
  },
  methods: {
    switchMailLayout: function(param) {
      if( param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','mail');
      }else if( !param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_CLOSE','mail');
      }
    },
    switchNotebookLayout: function() {
      if( !this.get_layoutState.notebook.opened && !this.get_layoutState.notebook.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','notebook');
      }else if( this.get_layoutState.notebook.opened && !this.get_layoutState.notebook.disabled ){
        this.$store.dispatch('LAYOUT_CLOSE','notebook');
      }
    },
  },
  watch: {
    "get_layoutState.mail.opened": function(newVal) {
      let self = this;
      if( newVal ){
        // Mail opened
        self.$refs.mailBtnOpen.classList = 'mail-sidebar-icon out';
        setTimeout(function(){
          self.$refs.mailBtnClose.classList = 'mail-sidebar-icon in';
        }, 100);
      }else{
        // Mail closed
        self.$refs.mailBtnClose.classList = 'mail-sidebar-icon out';
        setTimeout(function(){
          self.$refs.mailBtnOpen.classList = 'mail-sidebar-icon in';
        }, 100);
      }
    },
  },
}
</script>
