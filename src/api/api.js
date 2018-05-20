import axios from 'axios'
import {
  jsonp
} from "../api/jsonp";
const BaseUrl = ``
// const BaseUrl = `http://193.112.183.211:8080`  //写上api地址
// const BaseUrl = `http://4d3kmh.natappfree.cc`
//获取推荐
export const getRecommend = () => {
  const url = BaseUrl+`/musicapi/getRecommend`
  const params = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: Date.now(),
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err);
  })
}

//获取歌手
export const getSinger = () => {
  const url = `https://c.y.qq.com/v8/fcg-bin/v8.fcg`
  // const url = `/musicapi/getSinger`
  const params = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100, //每页个数
    pagenum: 1, //页数
    g_tk: 5381,
    jsonpCallback: 'GetSingerListCallback',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  }
  return jsonp(url, params, 'GetSingerListCallback')
    .then(res => {
      return Promise.resolve(res)
    }).catch(err => {
      console.log(err);
    })
}

//获取新推荐
export const getRecomList = () => {
  const url = `https://u.y.qq.com/cgi-bin/musicu.fcg`
  const params = {
    callback: `recom3586467689739101`,
    g_tk: 5381,
    jsonpCallback: `recom3586467689739101`,
    loginUin: 0,
    hostUin: 0,
    format: `jsonp`,
    inCharset: `utf8`,
    outCharset: `utf-8`,
    notice: 0,
    platform: `yqq`,
    needNewCode: 0,
    data: `{"comm":{"ct":24},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"}}`
  }
  return jsonp(url, params, 'recom3586467689739101')
    .then(res => {
      //   console.log(res);
      return Promise.resolve(res.recomPlaylist.data.v_hot)
    }).catch(err => {
      console.log(err);
    })
}
//获取推荐歌单列表内容
export const getRecomDisst = (disstid) => {
  const url = BaseUrl+`/musicapi/getDiss`
  const params = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: disstid,
    format: 'jsonp',
    g_tk: 5381,
    jsonpCallback: `playlistinfoCallback`,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  }
  return axios.get(url, {
    params
  }).then(res => {
    let ret = JSON.parse(res.data.replace(/^playlistinfoCallback\(/, '').replace(/\)$/, ''))
    return Promise.resolve(ret)
  }).catch(err => {
    console.log(err);
  })
}
//获取歌词
export const getLyric = (musicid='213470055') => {
  const url = BaseUrl+`/musicapi/getLyric`
  const params = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    nobase64: 1,
    musicid: musicid,
    songtype: 0,
    _: Date.now(),
    jsonpCallback: 'jsonp1',
  }
  return axios.get(url, {
    params
  }).then(res => {
    let ret = JSON.parse(res.data.replace(/^jsonp1\(/, '').replace(/\)$/, ''))
    return Promise.resolve(ret)
  }).catch(err => {
    console.log(err);
  })
}
//搜索音乐
export const searchMusic = (keywords, p = 1) => {
  const url = BaseUrl+`/musicapi/searchMusic`
  const params = {
    g_tk: 5381,
    uin: 0,
    format: `json`,
    inCharset: `utf-8`,
    outCharset: `utf-8`,
    notice: 0,
    platform: `h5`,
    needNewCode: 1,
    w: keywords,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: `utf-8`,
    sem: 1,
    aggr: 0,
    perpage: 20, //一次搜索显示数量
    n: 20, //一次搜索显示数量
    p: p, //显示第几页
    remoteplace: `txt.mqq.all`,
    _: Date.now(),
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err);
  })
}
export const getSingerInfo = (singerid, n = 15) => {
  const url = BaseUrl+`/musicapi/getSingerInfo`
  const params = {
    singerid: singerid, //歌手ID
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: n, // 歌曲个数
    begin: 0, //页数
    _: Date.now(),
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(err => {
    console.log(err);
  })
}
//获取排行列表内的歌曲
export const getTopMusicList = (topid) => {
  const url = BaseUrl+`/musicapi/getMusicList`
  const params = {
    g_tk: 5381,
    uin: 0,
    format: `json`,
    inCharset: 'utf-8',
    outCharset: `utf-8`,
    notice: 0,
    platform: `h5`,
    needNewCode: 1,
    tpl: 3,
    page: `detail`,
    type: `top`,
    topid: topid, //排行ID
    _: Date.now(),
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err);
  })
}

//获取排行列表
export const getTopList = () => {
  // const url =  ` https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?`
  const url = BaseUrl+`/musicapi/getTopList`
  const params = {
    g_tk: 5381,
    uin: 0,
    format: `json`,
    inCharset: 'utf-8',
    outCharset: `utf-8`,
    notice: 0,
    platform: `h5`,
    needNewCode: 1,
    topid: 3, //排行ID
    _: Date.now(),
  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data.data.topList)
  }).catch(err => {
    alert(err)
    console.log(err);
  })
}

//获取专辑
export const getalbum = (albummid) => {
  const url = BaseUrl+`/musicapi/getalbum`
  const params = {
    albummid: albummid, //'001ZRoqG1ypbfW',  // ?albummid=001ZRoqG1ypbfW  专辑ID
    g_tk: 5381,
    uin: 0,
    format: `json`,
    inCharset: 'utf-8',
    outCharset: `utf-8`,
    notice: 0,
    platform: `h5`,
    needNewCode: 1,
    _: Date.now(),

  }
  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res)
  }).catch(err => {
    console.log(err);
  })
}
//获取专辑图片地址
export const getalbumimgurl = (albummid) => {
  return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummid}.jpg?max_age=2592000`
}
//获取歌曲地址
const getVkeys = (songmid) => {
  let url = BaseUrl+'/musicapi/getVkeys'
  const params = {
    g_tk: 5381,
    jsonpCallback: 'MusicJsonCallback9714604340045265',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    callback: 'MusicJsonCallback9714604340045265',
    uin: 0,
    songmid: songmid,
    filename: 'C400' + songmid + '.m4a', // filename的组成：C400+songmid+‘.m4a’
    guid: 1595061394 //可变，暂时固定
  }
  return axios.get(url, {
    params
  }).then(res => {
    let data = JSON.parse(res.data.replace(/MusicJsonCallback9714604340045265\(/, "").replace(/\)$/, ''))
    let vKey = data.data.items[0].vkey
    // console.log('key='+vKey);
    return Promise.resolve(vKey)
  }).catch(err => {
    console.log(err);
  })

}
export const getSongUrl = (songmid) => {
  let songurl = ''
  return getVkeys(songmid).then(res => {
    let url = `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?vkey=${res}&guid=1595061394&uin=0&fromtag=66`
    // let url = `http://58.16.42.161:9999/dl.stream.qqmusic.qq.com/C400${songmid}.m4a?vkey=${res}&guid=1595061394&uin=0&fromtag=66`
    // songurl =  url
    return Promise.resolve(url)
  })
}

