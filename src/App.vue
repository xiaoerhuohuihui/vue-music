<template>
  <div id="app">
    <!-- <music-header></music-header> -->
    <music-body></music-body>
    <player></player>
  </div>
</template>

<script>
import MusicBody from 'com/layout/MusicBody'
import MusicHeader from 'com/layout/MusicHeader'
import Player from 'com/player/Player'
export default {
  name: "App",
  components: {
    MusicBody,
    MusicHeader,
    Player,
  }
};
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: '微软雅黑'
}
ul,ol,li{
  list-style: none;
}
body{
  width: 100%;
}
#app {
  position: relative;
}
.view-enter-active,.view-leave-active {
  transition: all .6s ease;
}
.view-enter{
  transform: translateX(100%);
  opacity: 0;
}
.view-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
