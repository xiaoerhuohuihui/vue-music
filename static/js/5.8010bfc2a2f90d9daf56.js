webpackJsonp([5],{mjmx:function(t,s){},"pVQ/":function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("P9l9"),e=i("zIBK"),n=(i("NYxO"),{data:function(){return{list:[],title:""}},created:function(){var t=this;Object(a.i)(this.$route.params.id).then(function(s){s.data.songlist.map(function(s){t.list.push(s.data)}),t.title=s.data.topinfo.ListName}).catch(function(t){console.log(t)})},components:{SongList:e.a}}),l={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"music-list"},[s("mt-header",{staticClass:"music-list-header",attrs:{title:this.title}},[s("router-link",{staticClass:"back",attrs:{slot:"left",to:"/toplist"},slot:"left"},[s("mt-button",{attrs:{icon:"back"}},[s("span",[this._v("返回")])])],1)],1),this._v(" "),s("div",{staticClass:"music-list-body"},[s("song-list",{attrs:{songlist:this.list}})],1)],1)},staticRenderFns:[]};var o=i("VU/8")(n,l,!1,function(t){i("mjmx")},"data-v-64e00911",null);s.default=o.exports}});
//# sourceMappingURL=5.8010bfc2a2f90d9daf56.js.map