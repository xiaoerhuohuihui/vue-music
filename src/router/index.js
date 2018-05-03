import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'com/recommend/Recommend'
import TopList from 'com/toplist/TopList'
import MusicList from 'com/tools/MusicList'
import Singer from 'com/singer/Singer'
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
      component: Recommend
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
      component: Singer
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    
  ]
})
