<template>
  <div class="player">
    <div class="player-img" @click="showPlayList">
      <img :src="getMusicPicUrl" alt="">
    </div>
    <div class="song-info" @click="showPlayList">
      <p>{{getName(getMusicName)}}</p>
      <span v-for="(item, index) in getMusicSinger" :key="index">{{getName(item.name)}}</span>
    </div>
    <div class="icon" @click="isplay">
      <img v-if="getIspause" src="@/assets/pause.png" alt="">
      <img v-else src="@/assets/play.png" alt="">
    </div>
    <audio @timeupdate="setProgress" ref="audio" :src="getMusicUrl" @ended="playnext"></audio>
    <transition name='playlist'>
      <play-list @seek='seek' :lyricNum='lyricNum' @goback='goback' :localLyric='localLyric' v-show="isShowPlayList" :isShowPlayList='isShowPlayList' :currentTime='currentTime'></play-list>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";
import PlayList from "./PlayList";
import { getSongUrl, getLyric } from "@/api/api";
import Lyric from "lyric-parser";
export default {
  data() {
    return {
      isShowPlayList: false,
      currentTime: 0,
      localLyric: [],
      lyricNum: 0,
      playing: false,
      lyric: null
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
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
         if (this.lyric) {
        this.lyric.seek(0);
      }
        this.$store.commit("changeIspause", false);
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
      this.playing = true;
      this.$store.commit("changeMusicDuration", this.$refs.audio.duration);
      this.currentTime = this.$refs.audio.currentTime;
    },
    getName(name) {
      return this.$entities.decode(name);
    },
    getLyricHtml(str) {
      var li = document.createElement("li");
      li.innerHTML = str;
      return li.textContent || li.innerText;
    },
    seek(t) {
      if (this.lyric) {
        this.lyric.seek(t * 1000);
      }
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
      getIspause: "getIspause",
      getLoop: "getLoop",
      getPlayIndex: "getPlayIndex",
      getMyMusicList: "getMyMusicList",
    }),
    ...mapActions({
      changeMusicUrl: "changeMusicUrl"
    })
  },
  components: {
    PlayList
  },
  mounted() {
    if (localStorage.getItem("list") && localStorage.getItem("playMusic")) {
      let list = JSON.parse(localStorage.getItem("list"));
      list.map(item => {
        this.$store.commit("changePlayMusicList", item);
      });
      let playMusic = JSON.parse(localStorage.getItem("playMusic"));
      this.$store.commit("changePlayMusic", playMusic);
    }
    
    if (localStorage.getItem("mylist")) {
        let mylist = JSON.parse(localStorage.getItem("mylist"));
        this.$store.commit("changeMyMusicList", mylist);
      }
    this.setAudioToStore();
  },
  watch: {
    getPlayMusic(newMusic) {
      // this.$store.commit("changeIspause", false);
      this.songmid = newMusic.songmid;
      this.$store.dispatch("changeMusicUrl", this.songmid);
      getLyric(newMusic.songid)
        .then(res => {
          if (this.lyric) {
            this.lyric.stop();
          }
          this.lyric = new Lyric(
            this.getLyricHtml(res.lyric),
            num => {
              this.lyricNum = num.lineNum;
            }
          );
          this.localLyric = this.lyric.lines;
          if (this.playing) {
            this.lyric.play();
          }
        })
        .catch(e => {
          console.log(e);
        });
      this.getIndex(newMusic);
    },
    getIspause(newPlay) {
      if (this.lyric) {
        this.lyric.togglePlay();
      }
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
  padding: 10px 0px 10px 20px;
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