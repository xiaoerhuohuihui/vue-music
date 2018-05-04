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
        <p class="singer-info-p">{{singerinfo}}</p>
        <!-- 点击显示详细信息 -->
      </div>
      <song-list :songlist='list'></song-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getSingerInfo } from "@/api/api";
import SongList from "../tools/SongList";
export default {
  data() {
    return {
      list:[],
      title:'',
      singerinfo:'',
      singerImg:''
    }
  },
  components: {
    SongList,
  },
  methods: {
    getSingerList(list){
      let newList = []
      list.map(item=>{
        newList.push(item.musicData)
      })
      return newList
    },
    getSingerImg(mid){
      return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg?max_age=2592000`
    },
  },
  created () {
    getSingerInfo(this.$route.params.id)
      .then(res => {
        this.list = this.getSingerList(res.data.list)
        this.singerImg = this.getSingerImg(res.data.singer_mid)
        this.title = res.data.singer_name
        this.singerinfo = res.data.SingerDesc
      })
      .catch(e => {
        console.log(e);
      });
  }
}
</script>

<style scoped>
.singer-info{
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
.singer-img{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 10px; */
}
.singer-img img{
  padding: 10px;
  width: 25vh;
  height: 25vh;
  border-radius: 15%;
  
}
.singer-info-p{
  margin: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: wrap;
  display:-webkit-box; 
  /* 将对象作为弹性伸缩盒子模型显示。 */
  -webkit-box-orient:vertical;
  /* 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
  -webkit-line-clamp:4; 
  /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。 */
}
.toast-singerinfo{
  width: 100%;
  height: 50vh;
}
.singer-info-body{
  width: 100%;
  position: absolute;
  top: 10vh;
  height: 53vh;
}
</style>