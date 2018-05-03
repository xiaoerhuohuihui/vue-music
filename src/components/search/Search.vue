<template>
  <div class="search" ref="search" >
    <div class="search-input">
      <mt-search class="search-input" placeholder="请输入内容" type='search' v-model="value" @keyup.enter.native="search">
      </mt-search>
    </div>
    <ul class="search-list" >
      <li @scroll="scroll" class="song" v-for="(item, index) in result" :key="index">
            <div class="info-div">
                <p>{{item.songname}}</p>
                <span v-for="(name, index) in item.singer" :key="index">
                    {{name.name}}
                </span>
            </div>
      </li>
    </ul>
    <p class="next" v-if="result.length > 0" @click="loadMore">
      下一页
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
import { searchMusic } from "@/api/api";
export default {
  data() {
    return {
      value: "",
      result: [],
      p: 1,
      songlist: []
    };
  },
  mounted() {
      window.addEventListener('scroll', this.scroll);
    },
  methods: {
    search() {
      searchMusic(this.value, this.p)
        .then(res => {
          this.result = res.data.data.song.list;
          // console.log(this.result);
        })
        .catch(err => {
          console.log(err);
        });
    },
    loadMore() {
      this.p++;
      searchMusic(this.value, this.p)
        .then(res => {
          this.result = res.data.data.song.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    scroll(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  console.log(scrollTop)
      
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
}
.search-input {
  height: 10vh;
  padding: 5px;
}
.search-list{
  margin-bottom: 50px;
}
.mint-search-list{
  padding: 0;
  margin-top: 44px;
}
.song {
  height: 10vh;
  border: 1px solid aqua;
  padding: 10px 20px;
  font-size: 18px;
  display: flex;
  overflow: hidden;
}
.info-div {
  padding-left: 20px;
}
.info-div p {
    font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
}
.info-div span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  color: rgb(129, 128, 121);
}


.next {
  text-align: center;
  line-height: 1.5;
  margin-top: -50px;
}
</style>