<template>
    <ul class="my-list" >
        <li class="song" v-for="(item, index) in getlist" :key="index">
            <div class="song-div">
                {{item.song.songname}}
            </div>=======
            <div class="like" @click="changeLike(item,index)">
                <img v-if="!item.islike" src="../../assets/like.png" alt="">
                <img v-else src="../../assets/like2.png" alt="">
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        mylist:[]
    };
  },
  props: {
    songlist: {
      type: Array,
      default: []
    }
  },
  computed: {
    getlist(){
        if (this.mylist.length == 0) {
            return this.songlist
        }else{
            return this.mylist 
        }
    },
    ...mapGetters({
        getMyMusicList:'getMyMusicList',
    }) 
  },
  methods: {
    changeLike(item,myindex){
        let m = []
        let myii = this.getMyMusicList
        this.songlist.map((item, index)=>{
            if (myindex == index) {
                item.islike = !item.islike
                if (item.islike) {
                    myii.push(item)
                    this.$store.commit('changeMyMusicList', myii)
                }else{
                    let jj = myii.indexOf(item)
                    myii.splice(jj, 1)
                }
            }
            m.push(item)
        })
        this.mylist = m
        
        console.log(this.getMyMusicList);
        
    }  
  },
  watch:{
      mylist(ne){
          this.mylist = ne
      }
  }
};
</script>

<style scoped>
.my-list {
  overflow: auto;
  height: 100%;
  width: 100%;
}
.song{
    display: flex;
}
.like{
  width: 4vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2vh;
  
}
.like img{
  width: 4vh;
  height: 4vh;
}
</style>