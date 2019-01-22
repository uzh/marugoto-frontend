<template>
  <div class="test-container">
    <TitleComponent title="Elements" />
    <TextComponent
      width="7"
      lead="true"
      text="Spreckelsville was founded in 1878 as a company town by German-American Spreckelsville was founded in 1878 as a company town by German-American" />
    <ImageComponent
      width="4"
      source="https://picsum.photos/200/300"
      imageText="'Japanese Laborers on Spreckelsville Plantation', oil on canvas" />
    <TextComponent
      width="4"
      text="He arrived Maui in 1876 after the passage of the Reciprocity Treaty of 1876 He arrived Maui in 1876 after the passage of the Reciprocity Treaty of 1876 He arrived Maui in 1876 after the passage of the Reciprocity Treaty of 1876 He arrived Maui in 1876 after the passage of the Reciprocity Treaty of 1876"/>
    <ExerciseUpload />
    <ButtonComponent />
  </div>
</template>

<script>

import TitleComponent from '@/components/02_molecules/pageComponents/title';
import TextComponent from '@/components/02_molecules/pageComponents/text';
import ImageComponent from '@/components/02_molecules/pageComponents/image';
import ExerciseUpload from '@/components/02_molecules/pageComponents/exerciseUpload';
import ButtonComponent from '@/components/02_molecules/pageComponents/button';

export default {
  name: 'testView',
  components: { TitleComponent, TextComponent, ImageComponent, ExerciseUpload, ButtonComponent },
  data(){
    return{
      
    }
  },
}

</script>
