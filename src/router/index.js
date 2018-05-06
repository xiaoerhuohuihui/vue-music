import Vue from 'vue'
import Router from 'vue-router'
const Recommend = () => import('com/recommend/Recommend')
const RecommendMusic = () => import('com/recommend/RecommendMusic')
const TopList = () => import('com/toplist/TopList')
const MusicList = () => import('com/tools/MusicList')
const Singer = () => import('com/singer/Singer')
const SingerInfo = () => import('com/singer/SingerInfo')
const Search = () => import('com/search/Search')

Vue.use(Router)

export default new Router({
  // mode:'history',
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
