import Vue from 'vue'
import Router from 'vue-router'
import { Indicator } from 'mint-ui'


const Recommend = resolve => {
  Indicator.open();
    require.ensure(['com/recommend/Recommend'], () => {
      resolve(require('com/recommend/Recommend'))
      Indicator.close()
    })
}
const RecommendMusic = resolve => {
  Indicator.open();
    require.ensure(['com/recommend/RecommendMusic'], () => {
      resolve(require('com/recommend/RecommendMusic'))
      Indicator.close()
    })
}
const TopList = resolve => {
  Indicator.open();
    require.ensure(['com/toplist/TopList'], () => {
      resolve(require('com/toplist/TopList'))
      Indicator.close()
    })
}
// const RecommendMusic = () => import('com/recommend/RecommendMusic')
// const TopList = () => import('com/toplist/TopList')
// const MusicList = () => import('com/tools/MusicList')
const MusicList = resolve => {
  Indicator.open();
    require.ensure(['com/tools/MusicList'], () => {
      resolve(require('com/tools/MusicList'))
      Indicator.close()
    })
}
// const Singer = () => import('com/singer/Singer')
const Singer = resolve => {
  Indicator.open();
    require.ensure(['com/singer/Singer'], () => {
      resolve(require('com/singer/Singer'))
      Indicator.close()
    })
}
// const SingerInfo = () => import('com/singer/SingerInfo')
const SingerInfo = resolve => {
  Indicator.open();
    require.ensure(['com/singer/SingerInfo'], () => {
      resolve(require('com/singer/SingerInfo'))
      Indicator.close()
    })
}
// const Search = () => import('com/search/Search')
const Search = resolve => {
  Indicator.open();
    require.ensure(['com/search/Search'], () => {
      resolve(require('com/search/Search'))
      Indicator.close()
    })
}

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
