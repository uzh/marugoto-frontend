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
          title: 'Plantation lives'
        },
      ],
      openGames: [
        {
          title: 'Plantation lives'
        },
        {
          title: 'The Topic deep down in the sea'
        },
        {
          title: 'Another Topic'
        },
      ],
      finishedGames: [
        {
          title: 'Japanese sailsmen'
        },
        {
          title: 'Hunger Games'
        },
      ]
    }
  }
}
</script>
