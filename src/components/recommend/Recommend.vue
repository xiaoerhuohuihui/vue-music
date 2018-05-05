<template>
    <div class="recom">
      <Slider :sliderList='sliderList'></Slider>
      <recommend-list :recomList='recomList'></recommend-list>
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
import { getRecomList,getRecommend } from "@/api/api";
import Slider from 'com/tools/Slider'
import RecommendList from 'com/recommend/RecommendList'
export default {
  data() {
    return {
      recomList:[],
      sliderList:[],
    }
  },
  mounted () {
    this._getRecomList()
    this._getRecommend()
  },
  methods: {
    _getRecomList(){
      getRecomList().then(res=>{
        this.recomList = res
      }).catch(err=>{
        console.log(err);
      })
    },
    _getRecommend(){
      getRecommend().then(res=>{
        this.sliderList = res.data.data.slider
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  components: {
    Slider,
    RecommendList,
  },
}
</script>

<style scoped>
.recom{
  width: 100%;
  height: 20vw;
}

</style>