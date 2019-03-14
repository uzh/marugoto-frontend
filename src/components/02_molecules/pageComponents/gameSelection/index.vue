<template src="./template.html"></template>

<script>
import Btn from '@/components/01_atoms/buttons';
import DownloadList from '@/components/01_atoms/lists/downloadLists';

export default {
  name: 'gameSelection',
  components: { Btn, DownloadList },
  data() {
    return {
      classGames: [
        {
          title: 'Plantation lives',
          id: 'g4298ruvwjv9'
        },
      ],
      openGames: [
        {
          title: 'Plantation lives',
          id: 'f30jevr3j39jvr'
        },
        {
          title: 'The Topic deep down in the sea',
          id: '9813ry8427tgf7e'
        },
        {
          title: 'Another Topic',
          id: 'asxmqospqef0wf02j023'
        },
      ],
      finishedGames: [
        {
          title: 'Japanese sailsmen',
          id: '0219y39f7y817efgiehfc'
        },
        {
          title: 'Hunger Games',
          id: '20183hfhf239h2942g'
        },
      ]
    }
  },
  methods: {
    continueGame: function(id) {
      alert(`Game with id: ${id} continued`);
    },
    downloadGame: function(id) {
      alert(`PDF of game with id: ${id} downloaded`);
    }
  }
}
</script>
