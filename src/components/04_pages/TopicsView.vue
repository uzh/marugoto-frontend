<template>
  <div class="main-container">
   <TopicComponent :list="get_topic.list" @openTopic="chooseTopic"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import TopicComponent from '@/components/02_molecules/pageComponents/topic';

export default {
  name: 'topics',
  components: { VueMarkdown, TopicComponent },
  data() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
    };
  },
  computed: {
    ...mapGetters([ 'get_topic' ]),
  },
  created() {
    this.$store.dispatch('UPDATE_TOPIC_LIST');
  },
  methods: {
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', {id: id, contactServer: true})
      .then(() => {
        this.$router.push('/storyline');
      });
    },
  },
}

</script>