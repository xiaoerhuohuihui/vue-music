<template>
  <ul class="songinfo" ref="scrollUl">
    <!-- <transition-group name='songLi'> -->
    <li ref="scrollLi" 
    :class="{toleft:index%2==1,toright:index%2==0}" 
    class="song " v-for="(item, index) in getlist" :key="index">
      <div class="wrap" 
      @click.stop="playMusic(item.song)" 
      :class="{active:item.song.songmid==getPlayMusicSongmid}">
        <div class="num-div">
          {{zeroNum(index)}}
        </div>
        <div class="info-div">
          <p>{{getName(item.song.songname)}}</p>
          <span v-for="(name, index) in item.song.singer" :key="index">
            {{getName(name.name)}}
          </span>
        </div>
      </div>
      <div class="like" @click="changeLike(item,index)">
            <img v-if="!item.islike" src="../../assets/like.png" alt="">
            <img v-else src="../../assets/like2.png" alt="">
        </div>
      <div class="bg-img">
        <img v-lazy="geturl(item.song.albummid) " alt="">
      </div>
    </li>
    <p class="more" @click="getMore" v-if="(getlist.length > 0) && showMore">点击加载更多</p>
    <!-- </transition-group> -->
  </ul>

</template>

<script type="text/ecmascript-6">
import { getalbumimgurl } from "@/api/api";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isactive: false,
      mylist:[]
    };
  },
  props: {
    songlist: {
      type: Array,
      default: []
    },
    isShowPlayList: {
      type: Boolean,
      default: false
    },
    showMore:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    geturl(id) {
      return getalbumimgurl(id);
    },
    zeroNum(index) {
      index += 1;
      if (index < 10) {
        return "0" + index;
      }
      return index;
    },
    playMusic(item) {
      this.$store.dispatch("addMusic", item);
      this.$store.commit("changeIspause", false);
      this.getAudio.autoplay = "autoplay"
    },
    getMore(){
      if (typeof this.showMore == 'boolean') {
        this.$emit('getMoreMusic')
      }
    },
    getName(name){
      return this.$entities.decode(name)
    },
    changeLike(item,myindex){
        let m = []
        let myii = this.getMyMusicList
        this.getlist.map((item, index)=>{
            if (myindex == index) {
                item.islike = !item.islike
                if (item.islike) {
                    myii.push(item)
                    this.$store.commit('changeMyMusicList', myii)
                }else{
                    this.$messagebox.confirm('确定取消喜欢?').then(action => {
                      let jj = null
                    myii.map((myitem, si)=>{
                        if (myitem.song.songmid == item.song.songmid) {
                          jj = si
                        }
                    })
                    let r = myii.splice(jj, 1)
                    this.$store.commit('changeMyMusicList', myii)
                    }).catch(e=>{
                      item.islike = !item.islike
                      return
                    })
                    
                }
            }
            m.push(item)
        })
        this.mylist = m
        
        // console.log(this.getMyMusicList);
        
    } 
  },
  computed: {
    ...mapGetters({
      getPlayMusicSongmid: "getPlayMusicSongmid",
      getPlayIndex: "getPlayIndex",
      getPlayMusic: "getPlayMusic",
      getPlayMusicList: "getPlayMusicList",
      getAudio: "getAudio",
      getMyMusicList:'getMyMusicList',
    }),
    getlist(){
        if (this.mylist.length == 0) {
            return this.songlist
        }else{
            return this.mylist 
        }
    },
  },
  watch: {
    isShowPlayList(newIsShow) {
      if (newIsShow) {
        let nextScroll =
          this.getPlayIndex * document.documentElement.clientHeight / 10;
        this.$refs.scrollUl.scrollTop = nextScroll;
      }
    },
    mylist(ne){
        this.mylist = ne
    },
    songlist(ns){
        this.mylist = ns
    }
  }
};
</script>

<style scoped>
.songinfo {
  overflow: auto;
  height: 100%;
  width: 100%;
}
.song {
  height: 10vh;
  margin: 5px 0;
  width: 100%;
  font-size: 18px;
  display: flex;
  overflow: hidden;
}
.wrap {
  flex: 7.5;
  /* width: 75%; */
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.bg-img {
  /* width: 20%; */
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  background-color: rgba(52, 234, 247, 0.5) !important;
}
.num-div {
  align-self: center;
  /* width: 10%; */
  flex: 1;
}
.info-div {
  padding-left: 20px;
  /* width: 85%; */
  flex: 8.5;
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
  font-size: 0.8rem;
  color: rgb(129, 128, 121);
}
.like{
  width: 4vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3vh;
  
}
.like img{
  width: 4vh;
  height: 4vh;
}
.bg-img img {
  width: 10vh;
  height: 10vh;
  border-radius: 10%;
  box-shadow: 1px 1px 10px #333333;
}
.more{
  padding: 10px;
  text-align: center;
}

.songLi-enter-active,
.songLi-leave-active {
  transition: all 0.3s ease;
}
.songLi-enter {
  transform: translateY(-100%);
  opacity: 0;
}
.songLi-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

</style>