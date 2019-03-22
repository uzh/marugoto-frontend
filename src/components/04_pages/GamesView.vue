<template>
  <div class="game-selection-container col-xs-8 col-xs-offset-2">
    <!-- Header -->
    <!-- Title -->
    <div class="header">
      <div class="title">
        <h1>Your games</h1>
      </div>
      <div class="supervise-game">
        <Btn text="Supervise Group Game" ghost="true" iconName="arrow-right" />
      </div>
    </div>
    <!-- Lead text -->
    <div class="lead lead-text">Please have a look at all the topics and choose the one that interests you the most. Choose wisely, you won’t be able to go back after you start with one of the topics!</div>
    <!-- Content -->
    <div class="start-game">
      <Btn text="Start New Game" primary="true" iconName="plus" @click.native="goToTopics" />
    </div>
    <div class="class-games">
      <h5>Games within classes</h5>
      <DownloadList
        v-for="(item, index) in get_games.classroomGames"
        :key="index"
        :title="item.topic.title" />
      <!-- <vue-markdown :source="item.topic.title" /> -->
    </div>
    <div class="open-games">
      <h5>Open Games</h5>
      <DownloadList
      v-for="(item, index) in get_games.openGames"
      :key="index"
      :id="item.id"
      :title="item.topic.title"
      @emitContinue="continueGame(item.id)" />
      <!-- <vue-markdown :source="item.topic.title" /> -->
    </div>
    <div class="finished-games">
      <h5>Finished Games</h5>
      <DownloadList
        v-for="(item, index) in get_games.finishedGames"
        :key="index"
        :title="item.topic.title" />
        <!-- <vue-markdown :source="item.topic.title" /> -->
    </div>
    <div class="delete-account">
      <Btn  text="Delete Account" ghost="true" iconName="cancel" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
import Btn from '@/components/01_atoms/buttons';
import DownloadList from '@/components/01_atoms/lists/downloadLists';

export default {
  name: 'games',
  components: { VueMarkdown, Btn, DownloadList },
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
      let payload = gameID.split('/')[1];
      this.$store.dispatch('CONTINUE_GAME', payload);
    },
  },
}

</script>