<template src="./template.html"></template>

<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line
import { _debounce } from 'lodash';
import svgIcon from '@/components/01_atoms/svgicon';

export default {
  name: 'ExerciseTextArea',
  components: { svgIcon },
  props: [ 'exerciseId', 'placeholder' ],
  data(){
    return {
      answer: '',
      isAutosaved: false,
    }
  },
  computed:{
    ...mapGetters(['get_exerciseText']),
  },
  mounted: function(){
    this.answer = this.get_exerciseText;
  },
  methods: {
    submitAnswer: function(){
      this.$emit('emitInputAreaAnswer', this.answer, this.exerciseId);
      this.$store.dispatch('SAVE_TEXT_FOR_EXERCISE', this.answer);
    },
    checkTyping: function() {
      this.isAutosaved = false;
      this.autoGrow(this.$refs.textarea);
      this.typingFinished();
    },
    // eslint-disable-next-line
    typingFinished: _.debounce(function() {
      this.isAutosaved = true;
      this.submitAnswer();
    }, 500),
    autoGrow: function(element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  },
  watch: {
    exerciseId: function(newVal, oldVal) {
      if( newVal != oldVal ){
        this.answer = '';
      }
    },
  },
}
</script>
