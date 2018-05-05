import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
  getSongUrl,
  getalbumimgurl
} from "@/api/api";

const state = {
  // musicUrl :'http://58.16.42.161:9999/dl.stream.qqmusic.qq.com/C400004Mkw5K1oI9K9.m4a?vkey=7611FF8D209DE2B2F1B6C1C9C3208C9167FF7578222B940BD6426BF91CDAD52114BC737FA941518CEC203E11AA27BBB8E11963916520D162&guid=1595061394&uin=0&fromtag=66',
  musicUrl: '',
  musicPicUrl: 'http://p.qpic.cn/music_cover/Ay2w92PeiaO57pZWMwecv6ZcgIbXzbpgviav55UXfrRibjZzicjyhciah7A/600?n=1',
  musicName: '小灰灰',
  musicSinger: [],
  myMusicList: [],
  playMusicList: [],
  playMusic: {},
  playIndex: 0,
  audio: {},
  musicDuration: 0,
  ispause: false,
  num:0,
  loop:'danqu',
  
}

const getters = {
  getMusicUrl(state) {
    return state.musicUrl
  },
  getPlayIndex(state) {
    return state.playIndex
  },
  getPlayMusicList(state) {
    return state.playMusicList
  },
  getnum(state) {
    return state.num
  },
  getLoop(state) {
    return state.loop
  },
  getIspause(state) {
    return state.ispause
  },
  getMusicPicUrl(state) {
    return state.musicPicUrl
  },
  getMusicName(state) {
    return state.musicName
  },
  getMusicDuration(state) {
    return state.musicDuration
  },
  getMusicSinger(state) {
    return state.musicSinger
  },
  getPlayMusic(state) {
    return state.playMusic
  },
  getAudio(state) {
    return state.audio
  },
  getPlayMusicSongmid(state){
    // if (state.playMusic.hasOwnProperty('data')) {
      return state.playMusic.songmid
    // }
  }
}

const mutations = {

  changeUrl(state, payload) {
    state.musicUrl = payload
  },
  changePlayIndex(state, payload) {
    state.playIndex = payload
  },
  changenum(state, payload) {
    state.num = payload
  },
  changeIspause(state, payload) {
    state.ispause = payload
  },
  changeLoop(state, payload) {
    state.loop = payload
  },
  changeMusicDuration(state, payload) {
    state.musicDuration = payload
  },
  changePlayMusicList(state, payload) {
    //判断普通列表里面是否含有相同歌曲
    let len = state.playMusicList.filter(item => {
      return item.songmid == payload.songmid 
    }).length
    if (len == 0) {
      state.playMusicList.push(payload)
    }
  },
  changePlayMusic(state, payload) {
    state.playMusic = payload
    state.musicPicUrl = getalbumimgurl(payload.albummid)
    state.musicName = payload.songname
    state.musicSinger = payload.singer
  },
  setAudio(state, payload) {
    state.audio = payload
  },
}
const actions = {
  changeMusicUrl({
    commit
  }, payload) {
    getSongUrl(payload).then(res => {
      commit('changeUrl', res)
    })
  },
  addMusic({
    state,
    commit
  }, payload) {
    commit('changePlayMusicList', payload)
    commit('changePlayMusic', payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})
