import Vue from 'vue'
import Router from 'vue-router'
import { MyIndicator } from "com/tools/MyIndicator";


const Recommend = resolve => {
  MyIndicator.open();
    require.ensure(['com/recommend/Recommend'], () => {
      resolve(require('com/recommend/Recommend'))
      MyIndicator.close()
    })
}
const RecommendMusic = resolve => {
  MyIndicator.open();
    require.ensure(['com/recommend/RecommendMusic'], () => {
      resolve(require('com/recommend/RecommendMusic'))
      MyIndicator.close()
    })
}
const TopList = resolve => {
  MyIndicator.open();
    require.ensure(['com/toplist/TopList'], () => {
      resolve(require('com/toplist/TopList'))
      MyIndicator.close()
    })
}
// const RecommendMusic = () => import('com/recommend/RecommendMusic')
// const TopList = () => import('com/toplist/TopList')
// const MusicList = () => import('com/tools/MusicList')
const MusicList = resolve => {
  MyIndicator.open();
    require.ensure(['com/tools/MusicList'], () => {
      resolve(require('com/tools/MusicList'))
      MyIndicator.close()
    })
}
// const Singer = () => import('com/singer/Singer')
const Singer = resolve => {
  MyIndicator.open();
    require.ensure(['com/singer/Singer'], () => {
      resolve(require('com/singer/Singer'))
      MyIndicator.close()
    })
}
// const SingerInfo = () => import('com/singer/SingerInfo')
const SingerInfo = resolve => {
  MyIndicator.open();
    require.ensure(['com/singer/SingerInfo'], () => {
      resolve(require('com/singer/SingerInfo'))
      MyIndicator.close()
    })
}
// const Search = () => import('com/search/Search')
const Search = resolve => {
  MyIndicator.open();
    require.ensure(['com/search/Search'], () => {
      resolve(require('com/search/Search'))
      MyIndicator.close()
    })
}
const MyList = resolve => {
  MyIndicator.open();
    require.ensure(['com/mylist/MyList'], () => {
      resolve(require('com/mylist/MyList'))
      MyIndicator.close()
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
    {
      path: '/mylist',
      name: 'MyList',
      component: MyList
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
