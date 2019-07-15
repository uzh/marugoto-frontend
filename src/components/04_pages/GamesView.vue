<template>
  <div class="game-selection-container col-xs-8 col-xs-offset-2">
    <!-- Header -->
    <!-- Title -->
    <div class="header">
      <div class="title">
        <h1>Your games</h1>
      </div>
      <div class="supervise-game">
        <Btn text="Supervise Group Game" ghost="true" iconName="arrow-right" @click.native="goToOverview"/>
      </div>
    </div>
    <!-- Lead text -->
    <p class="lead lead-text">Please have a look at all the topics and choose the one that interests you the most. Choose wisely, you won’t be able to go back after you start with one of the topics!</p>
    <!-- Content -->
    <div class="start-game">
      <Btn text="Start New Game" primary="true" iconName="plus" iconColor="#fff" @click.native="goToTopics" />
    </div>

    <div v-if="get_games.classroomGames && get_games.classroomGames.length > 0" class="class-games">
      <h5>Games within classes</h5>
      <DownloadList
        v-for="(item, index) in get_games.classroomGames"
        action="Continue"
        :startedAt="item.startedAt"
        :key="index"
        :title="item.topic.title" />
    </div>

    <div v-if="get_games.openGames && get_games.openGames.length > 0" class="open-games">
      <h5>Open Games</h5>
      <DownloadList
      v-for="(item, index) in get_games.openGames"
      action="Continue"
      :key="index"
      :id="item.id"
      :startedAt="item.startedAt"
      :title="item.topic.title"
      @emitDownload="downloadZip(item)"
      @emitContinue="continueGame(item.id, item)" />
    </div>

    <div v-if="get_games.finishedGames && get_games.finishedGames.length > 0" class="finished-games">
      <h5>Finished Games</h5>
      <DownloadList
        v-for="(item, index) in get_games.finishedGames"
        action=""
        :startedAt="item.startedAt"
        :title="item.topic.title"
        :key="index"
        @emitDownload="downloadZip(item)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import apiService from '@/apiService'
import Btn from '@/components/01_atoms/buttons';
import DownloadList from '@/components/01_atoms/lists/downloadLists';

export default {
  name: 'games',
  components: { Btn, DownloadList },
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
    this.$store.dispatch('UPDATE_SUPERVISION', false);
  },
  methods: {
    goToTopics: function() {
      this.$router.push('/topics');
    },
    goToOverview: function() {
      this.$store.dispatch('UPDATE_SUPERVISION', true)
      .then(() => {
        this.$router.push('/overview');
      });
    },
    downloadZip: function(item) {
      let gameStateId = item.id.slice( item.id.indexOf('/') + 1, item.id.length);
      
      apiService.get(`${this.resourcesPath}api/game/files/${gameStateId}`,{
        responseType: 'blob'})
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'marugoto-files.zip');
          document.body.appendChild(link);
          link.click();
        })
        .catch(err => {
          throw(err);
        });
    },
    continueGame: function(gameID, item) {
      this.$store.dispatch('CONTINUE_GAME', gameID).then(() => {
        this.$router.push('/storyline');
        item.topic.id;
        // this.$store.dispatch('CHOOSE_TOPIC', {id: item.topic.id, contactServer: false}).then(() => { });
      });
    },
  },
}

</script>