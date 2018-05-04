<template>
    <ul>
        <li :class="{toleft:index%2==1,toright:index%2==0}"  @click="getTopId(item)" class="topList-li" v-for="(item, index) in topList" :key="index">
            <div class="topListImg"><img :src="item.picUrl" :alt="item.topTitle"></div>
            <div class="topList-songList">
                <div class="info">
                    <!-- <h3>{{item.topTitle}}</h3> -->
                    <p class="singername" v-for="(song, index) in item.songList" :key="index">
                        {{index+1}} {{song.singername}}--{{song.songname}}
                    </p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
import { getTopList } from "@/api/api";
export default {
  data() {
    return {
        topList: [],
    };
  },
  methods: {
    getTopId(item){
      this.$emit('getId',item)
    }
  },
  created() {
    getTopList().then(res => {
      this.topList = res;
    });
  }
};
</script>

<style scoped>
.topList-li {
  display: flex;
  height: 120px;
  padding: 10px;
}
.topListImg {
  width: 100px;
  height: 100px;
}
.topListImg img {
  width: 100%;
  height: 100%;
  border-radius: 10%;
  box-shadow:1px 1px 10px #333333;
}
.topList-songList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  overflow:hidden;
}
.info {
  padding: 10px;
}
.singername,.info h3 {
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
