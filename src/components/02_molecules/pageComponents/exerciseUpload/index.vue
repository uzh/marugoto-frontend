<template src="./template.html"></template>

<script>

export default {
  name: 'ExerciseUpload',
  data(){
    return{
      file: '',
    }
  },
  props: [ 'exerciseId' ],
  methods: {
    handleDrop: function(e) {
      e.preventDefault();
      let dt = e.dataTransfer
      let files = dt.files
      this.file = ([...files])[0];
      
      let formData = new FormData();
      formData.append('file', this.file);

      this.$store.dispatch('UPLOAD_FILE_EXERCISE', {
        data: formData,
        id: this.exerciseId,
      });
    },
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
      
      // Submit file
      let formData = new FormData();
      formData.append('file', this.file);

      this.$store.dispatch('UPLOAD_FILE_EXERCISE', {
        data: formData,
        id: this.exerciseId,
      });
    },
  },
}

</script>
