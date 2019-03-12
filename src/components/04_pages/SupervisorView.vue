<template>
  <div class="main-container">
    <GameSelection v-if="gameState" />
    <div v-if="!gameState" class="supervisor-container">
      <h1>Supervisor overview</h1>
    </div>
  </div>
</template>

<script>

export default {
  name: 'supervisor',
  data() {
    return {
      gameState: true,
    };
  },
}

</script>
