<template>
    <div class="play-list">
        <div class="wrap">
        </div>

        <div class="song-list" @click.stop="chang">
                <song-list :songlist='getTempMusicList'></song-list>
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
import { mapGetters } from "vuex";
import MusicProgress from "../tools/MusicProgress";
export default {
  data() {
    return {
      progress: 0,
      loopList: ["danqu", "liebiao", "suiji"]
    };
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    playIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    change() {},
    chang() {},
    prev() {
      if (this.getLoop == "liebiao" || this.getLoop == "danqu") {
        let nextIndex = 0;
        if (this.playIndex == 0) {
          nextIndex = this.getTempMusicList.length - 1;
        } else {
          nextIndex = (this.playIndex - 1) % this.getTempMusicList.length;
        }
        console.log(nextIndex);

        console.log(this.getTempMusicList[nextIndex]);
        this.$store.commit("changePlayMusic", this.getTempMusicList[nextIndex]);
      } else if (this.getLoop == "suiji") {
        let nextIndex = parseInt(
          Math.random() * (this.getTempMusicList.length - 1)
        );
        this.$store.commit("changePlayMusic", this.getTempMusicList[nextIndex]);
      }
    },
    next() {
      if (this.getLoop == "liebiao" || this.getLoop == "danqu") {
        let nextIndex = (this.playIndex + 1) % this.getTempMusicList.length;
        console.log(this.getTempMusicList[nextIndex]);
        this.$store.commit("changePlayMusic", this.getTempMusicList[nextIndex]);
      } else if (this.getLoop == "suiji") {
        let nextIndex = parseInt(
          Math.random() * (this.getTempMusicList.length - 1)
        );
        this.$store.commit("changePlayMusic", this.getTempMusicList[nextIndex]);
        console.log(nextIndex);
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
    getProgress() {
      this.progress = this.currentTime / this.getAudio.duration * 100;
    },
    getPercent(percent) {
      this.getAudio.currentTime = this.getAudio.duration * percent;
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
    }
  },
  computed: {
    ...mapGetters({
      getTempMusicList: "getTempMusicList",
      getAudio: "getAudio",
      getMusicDuration: "getMusicDuration",
      getIspause: "getIspause",
      getnum: "getnum",
      getLoop: "getLoop"
    }),
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
    MusicProgress
  },
  watch: {
    currentTime() {
      this.progress = this.currentTime / this.getAudio.duration * 100;
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
  z-index: 9999;
  /* background: deepskyblue; */
}
.wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.123);
}
.song-list {
  position: absolute;
  bottom: 15vh;
  left: 0;
  width: 100%;
  height: 55vh;
  background: rgb(255, 255, 255);
  overflow: hidden;
}
.control {
  position: absolute;
  top: 85vh;
  left: 0;
  width: 100%;
  height: 15vh;
  background: rgb(255, 255, 255);
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
  /* background-color: blueviolet; */
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