<template>
  <div class="music-list">
    <mt-header class="music-list-header" :title="title">
      <router-link to="/toplist" slot="left" class="back">
        <mt-button icon="back">
          <span>返回</span>
        </mt-button>
      </router-link>
    </mt-header>
    <div class="music-list-body">
      <!-- <div class="music-img">
        <img :src="backgroundImg" class="backgroundImg" alt="">
      </div> -->
      <song-list :songlist='list'></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getalbumimgurl, getTopMusicList } from "@/api/api";
import SongList from "../tools/SongList";
export default {
  data() {
    return {
      backgroundImg: "",
      list:[],
      title:''
    };
  },
  methods: {},
  created() {
    getTopMusicList(this.$route.params.id)
      .then(res => {
        this.list = res.data.songlist;
        this.title = res.data.topinfo.ListName
      })
      .catch(e => {
        console.log(e);
      });
    // if (this.songlist.length <= 0) {
      
    // }
    
    
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
  /* bottom: 0;
  right: 0; */
  width: 100%;
  height: 88%;
  z-index: 11;
  background-color: rgb(255, 255, 255);
}
.music-list-header {
  position: absolute;
  z-index: 99;
  height: 10vh;
  width: 100%;
  font-size: 20px;
  line-height: 10vh;
  color: rgb(3, 3, 3);
  background-color: rgba(8, 173, 238, 0.712);
}
.back {
  width: 20vw;
  height: 100%;
  display: block;
}
.music-list-header span {
  font-size: 16px;
}
.music-list-body{
  width: 100%;
  position: absolute;
  top: 10vh;
  height: 78vh;
}
.music-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 45vh;
}
.backgroundImg {
  width: 100%;
  height: 100%;
}
</style>