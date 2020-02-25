<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :ctitles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 字组件以驼峰命名，传入时需要以 - 分隔 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingup="loadMore"
    >
      <home-swiper :cbanners="banners" @swiperImageLoad="swiperImgageLoad" />
      <home-recommend :crecommends="recommends" />
      <home-feature />
      <!-- :class="{fixed:isTabFixed}"吸顶来动态绑定class类是没有办法的 -->
      <tab-control :ctitles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :cgoods="showGoods" />
    </scroll>
    <!-- 
      组件是没有办法监听点击的
      native:监听组件原生事件
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 子组件
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";
// 公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backtop/BackTop";
// 方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { ImgListenMixin,backTopMixin } from "common/mixin";
export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    HomeSwiper,
    HomeRecommend,
    HomeFeature
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "最新", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins:[ImgListenMixin,backTopMixin],
  mounted() {
    // 1.监听goodsItem中图片加载完成(已由混入解决)
    // const refresh = debounce(this.$refs.scroll.refresh, 200);
    // this.$bus.$on("itemImageLoad", () => {
    //   // this.$refs.scroll.refresh();
    //   refresh();
    // });

    // 2.对监听的事件进行保存
    // this.itemImgListener = () => {
      // refresh(20, 30, "abc");
      // refresh();
    // };

    // 2.获取tabControl的offset
    // 组件是没有offsetTop属性的
    // 所有的组件都有一个属性$el:用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // scroll 默认只能加载一次
        // 第一次加载更多完成之后，为了后面的加载更多的完成
        this.$refs.scroll.finishPullUp();
      });
    },
    /**
     * 事件监听相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 回到顶部
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },

    // 控制backTop的显示与隐藏
    contentScroll(position) {
      // 1.判断backTop是否显示(混入)
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    // 上拉加载更多请求数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    // swiper图片加载完成监听
    swiperImgageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
  activated() {
    // 进来时刷新scroll

    // 进来时调整到离开时位置
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();

    // 解决 1
    // refresh放在scrollto的上面

    // 解决 2
    // scrollTo的源码的第三个参数问题
  },

  deactivated() {
    // 1.保存离开位置
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    // 2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh:viewport height */
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /**在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

/* 也可以使用绝对定位，上面的padding-top要打开 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>