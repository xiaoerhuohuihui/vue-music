<template>
    <div class="search" ref="search">
    <input type="search" class="search-input" v-model="value" placeholder="搜索歌曲、歌手" @keyup.enter="search">
    <song-list :songlist='getSongList' @getMoreMusic='getMoreMusic' :showMore='isShowMore'></song-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { searchMusic } from "@/api/api";
import SongList from "com/tools/SongList";
import { mapGetters } from "vuex";
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
export default {
  data() {
    return {
      value: "",
      result: [],
      p: 1,
      songlist: [],
      isShowMore: true,
      allSongNo:0
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
      let nowList = this.result
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
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  methods: {
    search() {
      this.isShowMore = true
      this.$myInd.open()
      searchMusic(this.value, this.p)
        .then(res => {
          this.result = res.data.data.song.list;
          this.allSongNo = res.data.data.song.totalnum
          this.$myInd.close()
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMoreMusic() {
      this.$myInd.open()
      if (this.result.length <= this.allSongNo) {
        this.p += 1;
        searchMusic(this.value, this.p)
          .then(res => {
            this.result = this.result.concat(res.data.data.song.list)
            this.allSongNo = res.data.data.song.totalnum
            this.$myInd.close()
          })
          .catch(err => {
            console.log(err);
          });
        return;
      }
      this.isShowMore = false;
    },
    
    scroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      console.log(scrollTop);
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
}
.search-input {
  height: 30px;
  width: 100%;
  padding: 5px;
  border: 1px solid rgb(0, 0, 0);
  /* margin: 5px; */
  outline: none;
}
.search-list {
  margin-bottom: 50px;
}
.mint-search-list {
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