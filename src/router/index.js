import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'com/recommend/Recommend'
import RecommendMusic from 'com/recommend/RecommendMusic'
import TopList from 'com/toplist/TopList'
import MusicList from 'com/tools/MusicList'
import Singer from 'com/singer/Singer'
import SingerInfo from 'com/singer/SingerInfo'
import Search from 'com/search/Search'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend,
      children: [{
        path: '/recommend/:id',
        name: 'RecommendMusic',
        component: RecommendMusic
      },]
    },
    {
      path: '/toplist',
      name: 'TopList',
      component: TopList,
      children: [{
        path: '/toplist/:id',
        name: 'MusicList',
        component: MusicList
      },]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[{
        path:'/singer/:id',
        name:'SingerInfo',
        component:SingerInfo
      }]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})
