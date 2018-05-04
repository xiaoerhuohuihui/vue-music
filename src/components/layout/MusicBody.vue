<template>
    <div class="music-body">
        <div class="tabs">
            <ul>
                <router-link to="/recommend" tag="li">
                    <span>推荐</span>
                </router-link>
                <router-link to="/singer" tag="li">
                    <span>歌手</span>
                </router-link>
                <router-link to="/toplist" tag="li">
                    <span>排行</span>
                </router-link>
                <router-link to="/search" tag="li">
                    <span>搜索</span>
                </router-link>
            </ul>
        </div>
        <keep-alive>
            <transition name='view'>
                <router-view></router-view>
            </transition>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  watch: {
    $route: function() {
        document.querySelector('.music-body').scrollTop = 0
    }
  }
};
</script>

<style scoped>
.music-body {
  position: absolute;
  top: 7.8vh;
  height: 80vh;
  width: 100%;
  overflow: auto;
}
.tabs {
  position: fixed;
  top: 0vh;
  height: 7.8vh;
  width: 100%;
  z-index: 188;
}
ul {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  flex: 1;
  text-align: center;
  box-sizing: border-box;
}
li span {
  display: inline-block;
  padding: 5px;
}
.router-link-active {
  color: rgb(102, 224, 255);
  border-bottom: rgba(52, 234, 247, 0.5) 2px solid;
}
</style>