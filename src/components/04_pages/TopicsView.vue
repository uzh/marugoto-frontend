<template>
  <div>
    <div v-if="get_invitationExpired" class="error-box">
      <div class="error-body">
        <p>Invitation link has expired</p>
        
        <Btn 
          text="OK"
          primary="true"
          @click.native="closeErrorBox" />
      </div>
    </div>
    <div class="main-container">
    <TopicComponent :list="get_topic.list" @openTopic="chooseTopic"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import Btn from '@/components/01_atoms/buttons';
import TopicComponent from '@/components/02_molecules/pageComponents/topic';

export default {
  name: 'topics',
  components: { VueMarkdown, TopicComponent, Btn },
  data() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
    };
  },
  computed: {
    ...mapGetters([ 'get_topic', 'get_invitationExpired' ]),
  },
  created() {
    this.$store.dispatch('UPDATE_TOPIC_LIST');
  },
  methods: {
    closeErrorBox: function() {
      this.$store.dispatch('INVITATION_EXPIRED', false);
    },
    chooseTopic: function(id){
      this.$store.dispatch('CHOOSE_TOPIC', {id: id, contactServer: true})
      .then(() => {
        if( !this.get_invitationExpired ){
          this.$router.push('/storyline');
        }
      });
    },
  },
}

</script>