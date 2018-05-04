<template>
  <div class="wrap">
    <div ref='heightdiv' class="heightdiv">
      <div v-for="(data, index) in singerList" class="singer-div" :key="index">
        <p class="title">{{getTitle(data.title)}}</p>
        <ul class="singer-ul">
          <li :class="{toleft:index%2==1,toright:index%2==0}" @click="getSingerId(item.id)" class="singer-li" v-for="(item, index) in data.items" :key="index">
            <div class="img-div">
              <img class="singer-img" v-lazy="item.img" alt="">
            </div>
            <p class="singer-name">{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <ul class="fast-list" ref="fastList" @touchstart="getStartFastHeight" @touchmove="getMoveFastHeight">
      <li @touchstart="getStartLi(index, $event)" class="fast-list-li" v-for="(item, index) in fastList" :key="index">
        <span>{{item}}</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Singer from "@/api/singer";
import { getSinger } from "@/api/api";
export default {
  data() {
    return {
      singerList: [],
      hotList: [],
      sortList: [],
      fastList: []
    };
  },
  methods: {
    getSingerList(list) {
      let singerNewList = {
        hot: {
          title: "hot",
          items: []
        }
      };
      list.map((item, index) => {
        if (index < 10) {
          singerNewList.hot.items.push(
            new Singer(item.Fsinger_id, item.Fsinger_mid, item.Fsinger_name)
          );
        }
        const key = item.Findex;
        if (!singerNewList[key]) {
          singerNewList[key] = {
            title: key,
            items: []
          };
        }
        singerNewList[key].items.push(
          new Singer(item.Fsinger_id, item.Fsinger_mid, item.Fsinger_name)
        );
      });
      let hotList = [];
      let NameList = [];
      let otherList = [];
      for (const key in singerNewList) {
        if (singerNewList.hasOwnProperty(key)) {
          if (key == "hot") {
            hotList.push(singerNewList[key]);
          } else if (key.match(/[a-zA-Z]/)) {
            NameList.push(singerNewList[key]);
          } else {
            otherList.push(singerNewList[key]);
          }
        }
      }
      NameList.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hotList.concat(NameList, otherList);
    },
    getStartLi(index, e) {
      this.height = 0;
      for (let i = 1; i <= index; i++) {
        this.height += document.querySelectorAll(".singer-div")[
          i - 1
        ].scrollHeight;
      }
      document.querySelector(".music-body").scrollTop = this.height;
    },
    getStartFastHeight(e) {
      this.fastLiHeight = document.querySelector(".fast-list-li").clientHeight;
      this.fastHeight = this.$refs.fastList.clientHeight;
      this.fastTop = this.$refs.fastList.offsetTop - this.fastHeight / 2;
    },
    getMoveFastHeight(e) {
      this.percent =
        Math.max(e.touches[0].pageY - this.fastTop, 0) &&
        Math.min(e.touches[0].pageY - this.fastTop, this.fastHeight);
      this.nowIndex = Math.floor(this.percent / this.fastLiHeight);
      this.height = 0;
      for (let i = 1; i <= this.nowIndex; i++) {
        this.height += document.querySelectorAll(".singer-div")[
          i - 1
        ].scrollHeight;
      }
      document.querySelector(".music-body").scrollTop = this.height;
    },
    getTitle(title) {
      if (title == "hot") {
        return "热门";
      } else {
        return title;
      }
    },
    getSingerId(id) {
      // console.log(id);
      this.$router.push({
        path: `/singer/${id}`
      });
    }
  },
  created() {
    getSinger()
      .then(res => {
        this.singerList = this.getSingerList(res.data.list);
        this.singerList.map(item => {
          if (item.title == "hot") {
            this.fastList.push("热");
          } else {
            this.fastList.push(item.title);
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style scoped>
.wrap {
  height: 100%;
}
.title {
  line-height: 2;
  text-indent: 2em;
  background-color: rgba(165, 248, 241, 0.623);
}

.singer-ul {
  margin-bottom: 20px;
}
.singer-li {
  display: flex;
  justify-content: center;
  align-items: center;
}
.singer-name {
  flex: 1;
}
.img-div {
  padding: 2vh;
}
.singer-img {
  width: 16vh;
  height: 16vh;
  border-radius: 10%;
  box-shadow: 1px 1px 10px #333333;
}
.fast-list {
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0 20px;
  width: 5%;
  transform: translateY(-50%);
}
.fast-list-li {
  font-size: 13px;
  text-align: center;
}
</style>