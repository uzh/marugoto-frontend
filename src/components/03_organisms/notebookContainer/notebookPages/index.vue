<template src="./template.html"></template>

<script>
// eslint-disable-next-line
import { _debounce } from 'lodash';
import SvgIcon from '@/components/01_atoms/svgicon';
import Btn from '@/components/01_atoms/buttons';
import AudioComponent from '@/components/02_molecules/pageComponents/audioComponent';
import VideoComponent from '@/components/02_molecules/pageComponents/videoComponent';
import LinkComponent from '@/components/02_molecules/pageComponents/linkComponent'
import PersonalNote from '@/components/03_organisms/notebookContainer/personalNote';
import VueMarkdown from 'vue-markdown';
import Vue from "vue";

// add target blank to all links inside notebook?
VueMarkdown.props.html.default = false;
VueMarkdown.props.anchorAttributes.default = () => ({ target: '_blank' });
Vue.component('vue-markdown', VueMarkdown);

export default {
  name: 'NotebookPages',
  components: { SvgIcon, Btn, VueMarkdown, AudioComponent, VideoComponent, PersonalNote, LinkComponent },
  props: [ 'currentEntry', 'list', 'direction' ],
  data(){
    return {
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
      transitionTime: 300,
    }
  },
  methods: {
    toggleScroll: function() {
      this.$emit('toggleScroll');
    },
  },
}

</script>
