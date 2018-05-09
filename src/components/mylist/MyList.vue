<template>
    <div>
        <div class="mylist">
            <song-list :songlist='list'></song-list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import SongList from '../tools/SongList'
export default {
  data() {
    return {
        list:this.getMyMusicList || []
    }
  },
  components: {
    SongList,  
  },
  computed: {
    ...mapGetters({
        getMyMusicList:'getMyMusicList',
        // getPlayMusicList:'getPlayMusicList',
    })  
  },
  mounted () {
     this.list = this.getMyMusicList
  },
  watch: {
      getMyMusicList(nl){
          this.list = nl
      }
  }
}
</script>

<style scoped>
</style>