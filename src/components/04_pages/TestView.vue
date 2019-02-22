<template>
  <div class="test-container">
    <!-- <ExerciseUpload /> -->
    <ExerciseTextArea
      class="mb-40 mt-100"
      @emitInputAreaAnswer="submitAnswer"
      v-if="component.type == 'TextExercise'"
      :exerciseId="component.state.id"
      :placeholder="component.component.placeholderText" />
  </div>
</template>

<script>
import ExerciseUpload from '@/components/02_molecules/pageComponents/exerciseUpload';
import ExerciseTextArea from '../02_molecules/pageComponents/exerciseTextArea'

export default {
  name: 'testView',
  components: { ExerciseUpload, ExerciseTextArea },
  data(){
    return{
      
    }
  },
}

</script>
