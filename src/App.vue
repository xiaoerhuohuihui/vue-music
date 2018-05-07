<template>
  <div id="app">
    <!-- <music-header></music-header> -->
    <music-body></music-body>
    <player></player>
  </div>
</template>

<script>
import MusicBody from "com/layout/MusicBody";
import MusicHeader from "com/layout/MusicHeader";
import Player from "com/player/Player";

export default {
  name: "App",
  components: {
    MusicBody,
    MusicHeader,
    Player
  },
  created() {
    // this.$router.push({
    //   path:'/recommend'
    // })
  }
};
</script>

<style>

</style>
