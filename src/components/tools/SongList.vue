<template>
    <ul class="songinfo" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <transition-group name='songLi'>
        <li @click.stop="playMusic(item)"  class="song "  
        v-for="(item, index) in songlist" :key="index">
            <div class="wrap" :class="{active:item.data.songmid==getPlayMusicSongmid}">
              <div class="num-div">
                {{zeroNum(index)}}
            </div>
            <div class="info-div">
                <p>{{item.data.songname}}</p>
                <span v-for="(name, index) in item.data.singer" :key="index">
                    {{name.name}}
                </span>
            </div>
            </div>
            <div class="bg-img">
              <img :src="geturl(item.data.albummid)" alt="">
            </div>
        </li>
        </transition-group>
        <!-- :style="{backgroundImage:'url(' + geturl(item.data.albummid) +')' }" -->
    </ul>
</template>

<script type="text/ecmascript-6">
import { getalbumimgurl } from "@/api/api";
import { getTempMusicList, mapGetters } from "vuex";
export default {
  data() {
    return {
      isactive:false
    };
  },
  methods: {
    loadMore() {},
    geturl: function(id) {
      return getalbumimgurl(id);
    },
    zeroNum(index) {
      index += 1
      if (index < 10) {
        return "0" + index;
      }
      return index;
    },
    playMusic(item){
      this.$store.dispatch('addMusic',item)
    }
  },
  computed: {
    ...mapGetters({
      getTempMusicList:'getTempMusicList',
      getPlayMusic:'getPlayMusic',
      getPlayMusicSongmid:'getPlayMusicSongmid',
    })
  },
  props: {
    songlist: {
      type: Array,
      default: []
    }
  },
  watch: {
    getPlayMusic(){

    }
  }
};
</script>

<style scoped>
.songinfo {
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
.song {
  height: 15%;
  margin: 5px 0;
  width: 100%;
  font-size: 18px;
  display: flex;
  overflow: hidden;
}
.wrap{
  /* flex: 1; */
  width: 80%;
  padding: 10px 20px;
  display: flex;
  
}
.bg-img{
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active{
  background-color: aqua !important;
}
.num-div {
  align-self: center;
  width:10%;
}
.info-div {
  padding-left: 20px;
  width: 90%;
  overflow: hidden;
}
.info-div p {
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-div span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size:0.8rem;
  color: rgb(129, 128, 121);
}

.bg-img img{
  width: 10vh;
  height: 10vh;
  border-radius: 10%;
  box-shadow:1px 1px 10px #333333;
}
.songLi-enter-active,.songLi-leave-active{
  transition: all .3s ease;
}
.songLi-enter{
  transform: translateY(-100%);
  opacity: 0;
}
.songLi-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>