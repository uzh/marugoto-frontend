<template>
  <div class="game-selection-container col-xs-8 col-xs-offset-2">
    <!-- Header -->
    <!-- Title -->
    <div class="header">
      <div class="title">
        <h1>Your games</h1>
      </div>
      <span class="pull-right">
        <!--The first button here will pull-right furthest, so these appear out of order!-->
        <Btn text="Sign out" class="pull-right sign-out" ghost="true" iconName="logout" @click.native="logout"/>
        <Btn text="Supervise group game" class="pull-right supervise-game" ghost="true" iconName="arrow-right" @click.native="goToOverview"/>
      </span>
    </div>
    <!-- Lead text -->
    <p>This is your <i>Lives in Transit</i>&nbsp;<i>Home</i> page. You can start your game(s) from here and you can return here at any point by clicking on the <i>Home</i> icon during gameplay. If you close a game, or accidentally hit the <i>Back</i> button on your browser during play, you will be returned here. But don't worry&mdash;your progress is automatically saved, so you can simply click on <i>Continue</i> to return to where you left off.</p>
    <br/>
    <p>
    Remember that you can always return here to start a new game, even if you have another in progress. At any time, you're also able to return here and download your current game state data as a zip archive. You can then use this data to explore your selected pathway through the game.
    </p>
    <p>If you are a teacher and want to generate a class game for your students (currently only available for Plantation Lives), please click on  "Supervise group game" above. There, you can set a class name, and a date-range for your students to play, and then you will be able to generate a link for you to email to your class. As soon as your students start playing, you will be able to see their player-names and email addresses listed under the class name you have chosen. You can either download an individual student's Notebook or the Notebooks from the whole class.</p>
    <br/>
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
    logout(){
      this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'));
    },
    goToOverview: function() {
      this.$store.dispatch('UPDATE_SUPERVISION', true)
      .then(() => {
        this.$router.push('/overview');
      });
    },
    downloadZip: function(item) {
      let gameStateId = item.id.slice( item.id.indexOf('/') + 1, item.id.length);
      const config = {
        headers: { 'Accept': 'application/zip, application/octet-stream' },
        responseType: 'blob'
      };
      apiService.get(`${this.basePath}api/game/files/${gameStateId}`, config)
        .then(resp => {
          const url = window.URL.createObjectURL(new Blob([resp.data]));
          const link = document.createElement('a');

          const contentDisposition = resp.headers['content-disposition'];

          let fileName = 'marugoto-notebook.zip';
          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename=(.+)/);
            if (fileNameMatch.length === 2)
              fileName = fileNameMatch[1];
          }
          link.href = url;
          link.setAttribute('download', fileName);
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
