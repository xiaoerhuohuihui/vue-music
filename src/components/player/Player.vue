<template>
    <div class="player">
        <div class="player-img" @click="showPlayList">
            <img :src="getMusicPicUrl" alt="">
        </div>
        <div class="song-info">
            <p>{{getName(getMusicName)}}</p>
            <span v-for="(item, index) in getMusicSinger" :key="index">{{getName(item.name)}}</span>
        </div>
        <div class="icon" @click="isplay">
            <img v-if="getIspause" src="@/assets/pause.png" alt="">
            <img v-else src="@/assets/play.png" alt="">
        </div>
        <audio @canplay="setAudioToStore" @timeupdate="setProgress" loop ref="audio" :src="getMusicUrl" @ended="playnext" autoplay></audio>
        <transition name='playlist'>
            <play-list :lyricNum='lyricNum' @goback='goback' :localLyric='localLyric' v-show="isShowPlayList" :isShowPlayList='isShowPlayList' :currentTime='currentTime'></play-list>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";
import PlayList from "./PlayList";
import { getSongUrl,getLyric } from "@/api/api";
import Lyric from 'lyric-parser'
export default {
  data() {
    return {
      isShowPlayList: false,
      currentTime: 0,
      localLyric:[],
      lyricNum:0
    };
  },
  methods: {
    isplay() {
      let a = this.$refs.audio;
      if (a.paused) {
        a.play();
        this.$store.commit("changeIspause", false);
      } else {
        a.pause();
        this.$store.commit("changeIspause", true);
      }
    },
    playnext() {
      if (this.getLoop == "danqu") {
        return;
      } else if (this.getLoop == "liebiao") {
        let nextIndex = (this.getPlayIndex + 1) % this.getPlayMusicList.length;
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      } else if (this.getLoop == "suiji") {
        let nextIndex = parseInt(
          Math.random() * (this.getPlayMusicList.length - 1)
        );
        this.$store.commit("changePlayMusic", this.getPlayMusicList[nextIndex]);
      }
    },
    showPlayList() {
      this.isShowPlayList = true;
    },
    goback() {
      this.isShowPlayList = false;
    },
    setAudioToStore() {
      //   console.log(this.$refs.audio.duration);
      this.$store.commit("setAudio", this.$refs.audio);
    },
    getIndex(newMusic) {
      let tempIndex = null;
      this.getPlayMusicList.map((item, index) => {
        if (item.songmid == newMusic.songmid) {
          tempIndex = index;
        }
      });
      this.$store.commit("changePlayIndex", tempIndex);
    },
    setProgress() {
      this.$store.commit("changeMusicDuration", this.$refs.audio.duration);
      this.currentTime = this.$refs.audio.currentTime;
    },
    getName(name){
      return this.$entities.decode(name)
    },
    getLyricHtml(str){
      var li = document.createElement('li')
       li.innerHTML = str
       return li.textContent || li.innerText
    },
    handleLyric(num, txt){
      this.lyricNum = num.lineNum
      // console.log(this.lyricNum);
      
    }
  },
  computed: {
    ...mapGetters({
      getMusicUrl: "getMusicUrl",
      getPlayMusicList: "getPlayMusicList",
      getPlayMusic: "getPlayMusic",
      getMusicPicUrl: "getMusicPicUrl",
      getMusicName: "getMusicName",
      getMusicSinger: "getMusicSinger",
      getCurrentTime: "getCurrentTime",
      getIspause: "getIspause",
      getLoop: "getLoop",
      getPlayIndex: "getPlayIndex"
    }),
    ...mapActions({
      changeMusicUrl: "changeMusicUrl"
    })
  },
  components: {
    PlayList
  },
  watch: {
    getPlayMusic(newMusic) {
      this.$store.commit("changeIspause", false);
      this.songmid = newMusic.songmid;
      this.$store.dispatch("changeMusicUrl", this.songmid);
      if (this.lyric) {
        this.lyric.stop()
      }
      getLyric(newMusic.songid).then(res=>{
        this.lyric = new Lyric(this.getLyricHtml(res.lyric), this.handleLyric)
        this.localLyric = this.lyric.lines
        this.lyric.play()
      }).catch(e=>{
        console.log(e);
      })
      this.getIndex(newMusic);
    },
    getIspause(newPlay){
      this.lyric.togglePlay()
    },
    getLoop(newLoop) {
      if (newLoop == "danqu") {
        this.$refs.audio.loop = true;
      } else {
        this.$refs.audio.loop = false;
      }
      console.log(this.$refs.audio.loop);
    },
    
  }
};
</script>

<style scoped>
.player {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 12vh;
  display: flex;
  z-index: 9999;
  justify-content: space-between;
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(rgba(184, 184, 184, 0.548)),
    to(#defbff),
    color-stop(0.9, #ffffff)
  );
}
.player-img {
  width: 12vh;
  height: 12vh;
  padding: 5px;
}
.player-img img {
  width: 100%;
  height: 100%;
  border-radius: 10%;
  box-shadow: 1px 1px 10px #333333;
}
.song-info {
  flex: 1;
  padding: 10px 20px;
}
.song-info span {
  /* margin-right: 5px; */
  padding-right: 5px;
}
.song-info span + span {
  padding: 0 5px;
  border-left: 1px solid rgb(116, 121, 122);
}
.icon {
  width: 12vh;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon img {
  width: 70%;
  height: 70%;
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