<template>
  <div class="play-list">
    <div class="wrap">
    </div>
    <div class="goback" @click="goback">
      <span class="goback-i">&lt;</span>
    </div>
    <div v-show="!showLyric" @click.stop="toggoleLyric" class="bg-album">
      <img class="bg-album-img" :src="getMusicPicUrl" alt="">
    </div>
    <div v-show="showLyric" class="lyric"  @click.stop="toggoleLyric" >
      <div class="lryic-wrap">
        <p class="lyric-line" :class="{'play-lyric': lyricNum === index}" 
      v-for="(lry, index) in localLyric" :key="index">{{lry.txt}}</p>
      </div>
      <p class="no-lyric" v-if="!localLyric.length">没有歌词</p>
    </div>
    <div class="song-list" ref="songListDiv" @click.stop="chang">
      <song-list :isShowPlayList='isShowPlayList' :songlist='getSongList'></song-list>
    </div>

    <div class="control" @click.stop="change">
      <music-progress @percent='getPercent' :done='progress' :start='getTime' :end='getDuration'></music-progress>
      <div class="control-music">
        <div class="control-loop" @click="changeLoop">
          <img v-if="loopList[getnum]=='danqu'" class="loop" src="@/assets/danqu.png" alt="">
          <img v-else-if="loopList[getnum]=='liebiao'" class="loop" src="@/assets/liebiao.png" alt="">
          <img v-else-if="loopList[getnum]=='suiji'" class="loop" src="@/assets/suiji.png" alt="">
        </div>
        <div class="control-body">
          <div class="control-prev" @click="prev">
            <img src="@/assets/prev.png" alt="">
          </div>
          <div class="control-play" @click="isplay">
            <img v-if="getIspause" src="@/assets/pause.png" alt="">
            <img v-else src="@/assets/play.png" alt="">
          </div>
          <div class="control-next" @click="next">
            <img src="@/assets/next.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SongList from "../tools/SongList";
import MySongList from './MySongList'
import { mapGetters } from "vuex";
import MusicProgress from "../tools/MusicProgress";
export default {
  data() {
    return {
      progress: 0,
      loopList: ["danqu", "liebiao", "suiji"],
      showLyric:false
    };
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    isShowPlayList:{
      type:Boolean,
      default:false
    },
    localLyric:{
      type:Array,
      default:[]
    },
    lyricNum:{
      type:Number,
      default:0
    }
  },
  methods: {
    change() {},
    chang() {},
    goback(){
      this.$emit('goback')
    },
    prev() {
      if (this.getLoop == "liebiao" || this.getLoop == "danqu") {
        let nextIndex = 0;
        if (this.getPlayIndex == 0) {
          nextIndex = this.getPlayMusicList.length - 1;
        } else {
          nextIndex = (this.getPlayIndex - 1) % this.getPlayMusicList.length;
        }
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      } else if (this.getLoop == "suiji") {
        let nextIndex = parseInt(
          Math.random() * (this.getPlayMusicList.length - 1)
        );
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      }
    },
    next() {
      if (this.getLoop == "liebiao" || this.getLoop == "danqu") {
        let nextIndex = (this.getPlayIndex + 1) % this.getPlayMusicList.length;
        // console.log(this.getPlayMusicList[nextIndex]);
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      } else if (this.getLoop == "suiji") {
        let nextIndex = parseInt(
          Math.random() * (this.getPlayMusicList.length - 1)
        );
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      }
    },
    changeLoop() {
      let num = this.getnum + 1;
      this.$store.commit("changenum", num % 3);
      this.$store.commit("changeLoop", this.loopList[this.getnum]);
    },
    translateTime(s) {
      let min = parseInt(Math.floor(s / 60) % 60);
      let sec = parseInt(s % 60);
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    toggoleLyric(){
      this.showLyric = !this.showLyric
    },
    getProgress() {
      this.progress = this.currentTime / this.getAudio.duration * 100;
    },
    getPercent(percent) {
      this.$emit('seek', this.getAudio.duration * percent)
      this.getAudio.currentTime = this.getAudio.duration * percent
    },
    isplay() {
      let a = this.getAudio;
      if (a.paused) {
        a.play();
        this.$store.commit("changeIspause", false);
      } else {
        a.pause();
        this.$store.commit("changeIspause", true);
      }
    },
    scrollLyric(index){
      this.height = 0;
      for (let i = 4; i <= index; i++) {
        this.height += document.querySelectorAll(".lyric-line")[
          i - 1
        ].scrollHeight;
      }
      document.querySelector('.lyric').scrollTop = this.height
    }
  },
  computed: {
    ...mapGetters({
      getPlayMusicList: "getPlayMusicList",
      getAudio: "getAudio",
      getMusicDuration: "getMusicDuration",
      getIspause: "getIspause",
      getnum: "getnum",
      getLoop: "getLoop",
      getMusicPicUrl: "getMusicPicUrl",
      getPlayIndex: "getPlayIndex",
      getMyMusicList: "getMyMusicList",
    }),
    getSongList(){
      let myList = []
      let nowList = this.getPlayMusicList
      nowList.map(item=>{
       let f = this.getMyMusicList.filter(my=>{
          return my.song.songmid == item.songmid
        })[0]
        if (f) {
          myList.push({
              song:item,
              islike:true
            })
        }else{
          myList.push({
              song:item,
              islike:false
            })
        }
      })
      return myList
    },
    getDuration() {
      if (!isNaN(this.getMusicDuration)) {
        return this.translateTime(this.getMusicDuration);
      }
    },
    getTime() {
      return this.translateTime(this.currentTime);
    }
  },
  components: {
    SongList,
    MusicProgress,
    MySongList,
  },
  watch: {
    currentTime() {
      this.progress = this.currentTime / this.getAudio.duration * 100;
    },
    lyricNum(newNum){
      this.scrollLyric(newNum)
    }
  }
};
</script>

<style scoped>
.play-list {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 11;
}
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.goback{
  position: absolute;
  top: 0;
  width: 15%;
  margin: 0 auto;
  line-height: 10vh;
  height: 10vh;
  text-align: center;
  z-index: 999;
}
.goback-i{
  display: inline-block;
  transform:scale(2,1) rotate(270deg)
}
.bg-album{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  z-index: 66;
  background-color: rgb(155, 244, 247);
  display: flex;
  justify-content: center;
  align-items: center;
}
.lyric{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  z-index: 66;
  background-color: rgb(155, 244, 247);
  text-align: center;
  overflow: scroll;
}
.lryic-wrap{
  width: 70%;
  margin: 0 auto;
  text-align: center;
  line-height: 2;
  /* height: 40vh; */
}
.no-lyric{
  transform: translateY(550%)
}
.play-lyric{
  color: rgb(26, 188, 238);
}
.bg-album-img{
  width: 40vh;
  height: 40vh;
  border-radius: 50%;
  animation: rotateImg 12s linear infinite;
}
@keyframes rotateImg {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.song-list {
  position: absolute;
  top: 40vh;
  left: 0;
  width: 100%;
  height: 45vh;
  background: rgb(215, 255, 248);
  overflow: hidden;
}
.control {
  position: absolute;
  top: 85vh;
  left: 0;
  width: 100%;
  height: 15vh;
  /* background: rgb(255, 255, 255); */
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(rgba(184, 184, 184, 1)),
    to(#fdfdfd),
    color-stop(0.9, #ffffff)
  );
}
.control-music {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 12vh;
}
.control-loop {
  width: 15vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loop {
  width: 4vh;
  height: 4vh;
}
.control-body {
  flex: 1;
  display: flex;
  height: 100%;
}
.control-prev,
.control-play,
.control-next {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-body img {
  width: 8vh;
  height: 8vh;
}
.playlist-enter-active,
.playlist-leave-active {
  transition: all 0.6s ease;
}
.playlist-enter {
  transform: translateY(100%);
  opacity: 0;
}
.playlist-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>