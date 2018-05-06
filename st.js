var express = require('express');
var app = express();
const axios = require('axios')
app.set('port', process.env.PORT || 8080);

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.get('/musicapi/getRecommend',(req,res)=>{
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getDiss',(req,res)=>{
    let url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url,{
      params:req.query,
      headers: 
      { referer: 'https://y.qq.com/' } 
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  
  app.get('/musicapi/searchMusic',(req,res)=>{
    let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getMusicList',(req,res)=>{
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getTopList',(req,res)=>{
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getAlbum',(req,res)=>{
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getSingerInfo',(req,res)=>{
    let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getVkeys',(req,res)=>{
    let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    axios.get(url,{
      params:req.query
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  }),
  app.get('/musicapi/getLyric',(req,res)=>{
    let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg'
    axios.get(url,{
      params:req.query,
      headers: 
      { referer: 'https://y.qq.com/' } 
    }).then(response=>{
      res.json(response.data)
    }).catch(e=>{
      console.log(e)
    })
  })
app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:'+app.get('port'));
});