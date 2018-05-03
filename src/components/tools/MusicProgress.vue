<template>
    <div class="progress">
        <div class="start time">{{start}}</div>
        <div class="wrap" ref="progressBody" 
        @touchstart.prevent='startProgress'
        >
            <div class="progress-body">
                <div class="progress-done" :style="{width:hasdone}">
                    <div class="progress-bar" ref="progressBar" 
                    @touchstart.prevent='barStartProgress'
                    @touchmove.prevent='barMoveProgress'
                    @touchend.prevent='barEndProgress'
                    ></div>
                </div>
            </div>
        </div>
        <div class="end time">{{end}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        hasdone:'0%'
    };
  },
  props: {
      start:{
          type:String,
          default:'00:00'
      },
      end:{
          type:String,
          default:'00:00'
      },
      done:{
          type:Number,
          default:0
      },
  },
  methods: {
    startProgress(e) {
      let progressWidth = this.$refs.progressBody.clientWidth;
      let moveProgress =
        e.touches[0].pageX - this.$refs.progressBody.offsetLeft;
      let percent = moveProgress / progressWidth
      this.hasdone = Math.ceil(percent*100) + "%";
      this.$emit('percent',percent)
    },
    barStartProgress(e){
      
      this.moving = true
      this.progressWidth = this.$refs.progressBody.clientWidth
      this.progressBarWidth = this.$refs.progressBar.clientWidth/2
    },
    barMoveProgress(e){
      this.moveProgress =
        e.touches[0].pageX - this.$refs.progressBody.offsetLeft - this.progressBarWidth;
      this.percent = Math.min(this.moveProgress, this.progressWidth)  / Math.max(this.moveProgress,this.progressWidth)
      this.hasdone = Math.ceil(this.percent*100) + "%";
    },
    barEndProgress(e){
      this.moving = false
      this.$emit('percent',this.percent)
    }
  },
  watch:{
      done(newDone){
          if (!this.moving) {
            this.hasdone = newDone+'%'
          }
      }
  }
};
</script>

<style scoped>
.progress {
  height: 3vh;
  background-color: rgb(255, 255, 255);
  position: relative;
}
.start {
  top: 0;
  left: 0;
}
.end {
  top: 0;
  right: 0;
  text-align: right;
}
.time {
  position: absolute;
  width: 15%;
  /* text-align: center; */
  line-height: 20px;
}
.wrap{
  position: absolute;
  top: 0px;
  left: 15%;
  height: 20px;
  width: 70%;
}
.progress-body {
  position: absolute;
  top: 8px;
  /* left: 15%; */
  display: inline-block;
  height: 4px;
  width: 100%;
  background-color: rgb(9, 167, 241);
}
.progress-done {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  background-color: rgb(39, 212, 255);
}
.progress-bar {
  position: absolute;
  top: -5px;
  left: 100%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: darkturquoise;
}
</style>