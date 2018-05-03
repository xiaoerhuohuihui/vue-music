<template>
    <div class="swiper-container">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" 
            v-for="(item, index) in sliderList" :key="index">
                <a :href="item.linkUrl">
                    <img class="swiper-slide-img" 
                     :src="item.picUrl" 
                     :alt="item.id">
                </a>
            </li>
        </ul>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
    };
  },
  props: {
      sliderList:{
          type:Array
      },
      
  },
  updated() {
    this.SwiperInit();
  },
  methods: {
    SwiperInit() {
      let swiper = new this.$swiper(".swiper-container", {
        autoplay: true ,//可选选项，自动滑动
        loop: true,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        updateOnImagesReady : true,
        pagination :{
            el:'.swiper-pagination',
            clickable :true,
            type : 'bullets',
        } 
      });
    },
  }
};
</script>

<style scoped>
.swiper-wrapper {
  /* width: 100%;
  height: 300px; */
}
.swiper-slide-img{
    width: 100%;
    height: 100%;
}

</style>