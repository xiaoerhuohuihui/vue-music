<template>
  <div>
    <top-view @getId='getTopListId'></top-view>
      <router-view></router-view> 
      <!-- :songlist='songlist' -->
  </div>
</template>

<script type="text/ecmascript-6">
import TopView from './TopView'
import { getTopMusicList } from "@/api/api";
export default {
  data() {
    return {
      songlist:[],
    };
  },
  methods: {
    getTopListId(item){
      this.$router.push({
      path:`/toplist/${item.id}`})
    }
  },
  components: {
    TopView,
  }
};
</script>

<style scoped>

</style>