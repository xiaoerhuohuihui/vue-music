<template>
  <div class="wrap">
    <div ref='heightdiv'>
      <div v-for="(data, index) in singerList" :key="index">
        <p class="title">{{getTitle(data.title)}}</p>
        <ul class="singer-ul">
          <li class="singer-li" v-for="(item, index) in data.items" :key="index">
            <div class="img-div">
              <img class="singer-img" :src="item.img" alt="">
            </div>
            <p class="singer-name">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <ul class="fast-list" ref="fastList" 
    @touchstart="getStartFastHeight"
    @touchmove="getMoveFastHeight"
    >
      <li @touchstart="getStartLi" class="fast-list-li" v-for="(item, index) in fastList" :key="index">
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Singer from "@/api/singer";
import { getSinger } from "@/api/api";
export default {
  data() {
    return {
      singerList: [],
      hotList: [],
      sortList: [],
      fastList: []
    };
  },
  methods: {
    getSingerList(list) {
      let singerNewList = {
        hot: {
          title: "hot",
          items: []
        }
      };
      list.map((item, index) => {
        if (index < 10) {
          singerNewList.hot.items.push(
            new Singer(item.Fsinger_id, item.Fsinger_mid, item.Fsinger_name)
          );
        }
        const key = item.Findex;
        if (!singerNewList[key]) {
          singerNewList[key] = {
            title: key,
            items: []
          };
        }
        singerNewList[key].items.push(
          new Singer(item.Fsinger_id, item.Fsinger_mid, item.Fsinger_name)
        );
      });
      let hotList = [];
      let sortList = [];

      for (const key in singerNewList) {
        if (singerNewList.hasOwnProperty(key)) {
          if (key == "hot") {
            hotList.push(singerNewList[key]);
          } else {
            sortList.push(singerNewList[key]);
          }
        }
      }
      sortList.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hotList.concat(sortList);
    },
    getStartLi(e){
      this.divHeight = this.$refs.heightdiv.clientHeight
      this.fastHeight = this.$refs.fastList.clientHeight
      this.fastTop = this.$refs.fastList.offsetTop - this.fastHeight/2
      this.lastUl = document.querySelectorAll('.singer-ul')[document.querySelectorAll('.singer-ul').length-1]
      this.percent = (e.touches[0].pageY - this.fastTop) / this.fastHeight
      this.scrollheight = parseInt(this.percent*(this.divHeight-this.lastUl.clientHeight))
      document.querySelector('.music-body').scrollTop = this.scrollheight
    },
    getStartFastHeight(e) {
      this.divHeight = this.$refs.heightdiv.clientHeight
      this.fastHeight = this.$refs.fastList.clientHeight
      this.fastTop = this.$refs.fastList.offsetTop - this.fastHeight/2
      this.lastUl = document.querySelectorAll('.singer-ul')[document.querySelectorAll('.singer-ul').length-1]
    },
    getMoveFastHeight(e) {
      this.percent = (e.touches[0].pageY - this.fastTop) / this.fastHeight
      this.scrollheight = parseInt(this.percent*(this.divHeight-this.lastUl.clientHeight))
      document.querySelector('.music-body').scrollTop = this.scrollheight
    },
    getTitle(title){
      if (title == 'hot') {
        return '热门'
      }else{
        return title
      }
    }
  },
  mounted() {
    getSinger()
      .then(res => {
        this.singerList = this.getSingerList(res.data.list);
        //console.log(this.singerList);
        this.singerList.map(item => {
          if (item.title == "hot") {
            this.fastList.push("热");
          } else {
            this.fastList.push(item.title);
          }
        });
        // console.log(this.fastList);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.wrap{
  height: 100%;
}
.title{
  line-height: 2;
  text-indent: 2em;
  /* padding: 5px 0; */
  background-color: rgba(165, 248, 241, 0.623);
}

.singer-ul {
  margin-bottom: 20px;
}
.singer-li {
  /* padding: 2vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 4vh; */
}
.singer-name {
  flex: 1;
  /* text-align: center; */
}
.img-div{
  padding: 2vh;
}
.singer-img {
  width: 16vh;
  height: 16vh;
  border-radius: 10%;
  box-shadow:1px 1px 10px #333333;
}
.fast-list {
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0 20px;
  width: 5%;
  transform: translateY(-50%);
}
.fast-list-li{
  font-size: 13px;
  text-align: center;
}
</style>