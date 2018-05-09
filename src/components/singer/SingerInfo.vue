<template>
  <div class="singer-info">
    <mt-header class="singer-info-header" :title="title">
      <router-link to="/singer" slot="left" class="back">
        <mt-button icon="back">
          <span>返回</span>
        </mt-button>
      </router-link>
    </mt-header>
    <div class="singer-info-body">
      <div class="singer-img">
        <img :src="singerImg" alt="">
        <p class="singer-info-p" @click="getAllInfo">{{singerinfo}}</p>
      </div>
      <div class="all-info-wrap" @click.self="closeToast" v-if="showInfo"></div>
      <song-list class="songlist" @getMoreMusic='getMoreMusic' :showMore='isShowMore' 
      :songlist='getSongList'></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerInfo } from "@/api/api";
import SongList from "../tools/SongList";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      list: [],
      title: "",
      singerinfo: "",
      singerImg: "",
      showInfo: false,
      allLoaded: false,
      n:15,
      allSongNo:0,
      isShowMore:true,
    };
  },
  components: {
    SongList
  },
  computed: {
   ...mapGetters({
      getMyMusicList:'getMyMusicList'
    }),
    getSongList(){
      let myList = []
      let nowList = this.list
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
  },
  methods: {
    getSingerList(list) {
      let newList = [];
      list.map(item => {
        newList.push(item.musicData);
      });
      return newList;
    },
    getSingerImg(mid) {
      return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`;
    },
    getAllInfo() {
      this.myToast = this.$toast({
        message: this.singerinfo,
        className: "all-info",
        duration: -1
      });
      this.showInfo = true;
    },
    closeToast() {
      this.showInfo = false;
      this.myToast.close();
    },
    _getSingerInfo(id,n){
      getSingerInfo(id, n)
      .then(res => {
        this.list = this.getSingerList(res.data.list);
        this.singerImg = this.getSingerImg(res.data.singer_mid);
        this.title = res.data.singer_name;
        this.singerinfo = res.data.SingerDesc;
        this.allSongNo = res.data.total
        this.$myInd.close()
      })
      .catch(e => {
        console.log(e);
      });
    },
    getMoreMusic(){
      if (this.n <= this.allSongNo) {
        this.n += 15
        this._getSingerInfo(this.$route.params.id, this.n)
        return
      }
      this.isShowMore = false
    },
  },
  created() {
    this.$myInd.open()
    this._getSingerInfo(this.$route.params.id, this.n)
  }
};
</script>

<style scoped>
.singer-info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 88%;
  z-index: 199;
  background-color: rgb(255, 255, 255);
}
.singer-info-header {
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
.singer-info-header span {
  font-size: 16px;
}
.singer-img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.singer-img img {
  padding: 10px;
  width: 25vh;
  height: 25vh;
  border-radius: 15%;
}
.singer-info-p {
  /* margin: 10px; */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: wrap;
  text-indent: 1em;
  height: 25vh;
  /* font-size: 4vh; */
  line-height: 6vh;
  /* padding: 5px; */
  /* display: -webkit-box; */
  /* 将对象作为弹性伸缩盒子模型显示。 */
  /* -webkit-box-orient: vertical; */
  /* 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  /* -webkit-line-clamp: 4; */
  /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。 */
}
.all-info-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(12, 12, 12, 0.212);
}

.singer-info-body {
  width: 100%;
  position: absolute;
  top: 10vh;
  height: 53vh;
}
</style>