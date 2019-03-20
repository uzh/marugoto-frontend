<template>
  <div class="main-container">
   Games view
   <button @click="goToTopics">Start new game</button>

   <h1>Games within classes</h1>
   <ul>
     <li v-for="(item, index) in get_games.classroomGames" :key="index">
       <vue-markdown :source="item.topic.title" />
     </li>
   </ul>

   <h1>Open games</h1>
   <ul>
     <li v-for="(item, index) in get_games.openGames" :key="index">
       <vue-markdown :source="item.topic.title" />
       <button @click="continueGame(item.id)">Continue</button>
     </li>
   </ul>

   <h1>Finished games</h1>
   <ul>
     <li v-for="(item, index) in get_games.finishedGames" :key="index">
       <vue-markdown :source="item.topic.title" />
     </li>
   </ul>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'games',
  components: { VueMarkdown },
  data() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      resourcesPath: process.env.VUE_APP_RESOURCES_PATH,
    };
  },
  computed: {
    ...mapGetters([ 'get_games' ]),
  },
  created() {
    this.$store.dispatch('UPDATE_GAMES');
  },
  methods: {
    goToTopics: function() {
      this.$router.push('/topics');
    },
    continueGame: function(gameID) {
      this.$store.dispatch('CONTINUE_GAME', gameID);
    },
  },
}

</script>