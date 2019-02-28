<template src="./template.html"></template>

<script>
import { mapGetters, mapActions } from 'vuex';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'RightSidebar',
  components: { svgIcon },
  data(){
    return{
      title: 'RightSidebar',
    }
  },
  computed: {
    ...mapGetters([ 'get_layoutState', 'get_mailNotificationState' ]),
  },
  methods: {
    openNotebook: function() {
      if( !this.get_layoutState.notebook.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','notebook');
      }
    },
    switchMailLayout: function(param) {
      if( param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_OPEN','mail');
      }else if( !param && !this.get_layoutState.mail.disabled ){
        this.$store.dispatch('LAYOUT_CLOSE','mail');
      }
    },
  },
}
</script>
