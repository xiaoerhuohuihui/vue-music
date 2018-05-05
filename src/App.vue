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
  },
  created () {
    // this.$router.push({
    //   path:'/recommend'
    // })
    
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
.all-info{
  width: 100%;
  height: 50vh;
  overflow: auto;
  color: black;
  background-color: rgb(238, 253, 251);
}
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.toleft{
  /* transition: all .3s linear; */
  animation: Toleft .5s linear ;
}
.toright{
  /* transition: all .3s linear; */
  animation: Toright .5s linear ;
}
@keyframes Toleft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: 0;
  }
}
@keyframes Toright {
  from {
    transform: translateX(100%);
  }
  to {
    transform: 0;
  }
}
</style>
