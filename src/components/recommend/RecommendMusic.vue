<template>
  <div class="music-list">
    <mt-header class="music-list-header" :title="title">
      <router-link to="/recommend" slot="left" class="back">
        <mt-button icon="back">
          <span>返回</span>
        </mt-button>
      </router-link>
    </mt-header>
    <div class="music-list-body">
        <song-list :songlist='list'></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getalbumimgurl, getRecomDisst } from "@/api/api";
import SongList from "../tools/SongList";
export default {
  data() {
    return {
      list: [],
      title: ""
    }
  },
  created() {
    getRecomDisst(this.$route.params.id)
      .then(res => {
          this.list = res.cdlist[0].songlist
      })
      .catch(e => {
        console.log(e);
      });
  },
  components: {
    SongList
  }
};
</script>

<style scoped>
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 88%;
  z-index: 199;
  background-color: rgb(255, 255, 255);
}
.music-list-header {
  position: absolute;
  z-index: 199;
  height: 10vh;
  width: 100%;
  font-size: 20px;
  line-height: 10vh;
  color: rgb(3, 3, 3);
  background-color: rgba(52, 234, 247, 0.5);
}
.back {
  width: 20vw;
  height: 100%;
  display: block;
}
.music-list-header span {
  font-size: 16px;
}
.music-list-body {
  width: 100%;
  position: absolute;
  top: 10vh;
  height: 78vh;
  overflow: scroll;
}
</style>