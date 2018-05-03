<template>
    <ul >
        <div class="recom-news"><h2>推荐热歌</h2></div>
        <li @click="getDiss(item.content_id)" class="recomLi" v-for="(item, index) in recomList" :key="index">
            <div class="recomImg-div"><img :src="item.cover" class="recomImg" alt=""></div>
            <div class="recomTitle-div">
                <h3>{{item.title}}</h3>
                <p>播放量:{{item.listen_num}}</p>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
import { getRecomDisst } from "@/api/api";
export default {
  data() {
    return {
        dissList:[]
    }
  },
  props: {
      recomList:{
          type:Array
      }
  },
  methods: {
    getDiss(id){
        console.log(2);
                
        getRecomDisst(id).then(res=>{
            this.dissList = res.cdlist[0].songlist
        }).catch(e=>{
            console.log(e);
        })
    },
      
  },
}
</script>

<style scoped>
.recom-news{
    line-height: 8vh;
    text-align: center;
    margin-bottom: 5px;
}
.recomLi{
    padding: 5px;
    height: 90px;
    display: flex;
    /* justify-content: space-around; */
}
ul li{
    border-top:2px solid gray; 
}
.recomImg-div{
    width: 80px;
    height: 80px;
    /* flex: 1; */
}
.recomImg{
    width: 100%;
    height: 100%;
    border-radius: 10%;
    box-shadow:1px 1px 10px #333333;
}
.recomTitle-div{
    padding: 10px;
    display: flex;
    flex: 3;
    text-indent: 1em;
    flex-direction: column;
    justify-content:center;
}
</style>