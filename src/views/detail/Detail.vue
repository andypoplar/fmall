<template>
  <div id="detail">
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="DetailNavBar" />
    <scroll class="scrollContent" ref="scroll" @scroll="contentSroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :cgoods="goods" />
      <detail-shop-info :cshop="shop" />
      <detail-goods-info :cdetail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-goods-param :cgoods-param="goodsParam" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :cgoods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- :message==>传过去是个属性  message==>传过去是个字符串 -->
    <toast :message="cartNotice" :show="noticeShow" />
  </div>
</template>

<script>
import DetailNavBar from "../detail/childcomps/DetailNarBar";
import DetailSwiper from "../detail/childcomps/DetailSwiper";
import DetailBaseInfo from "../detail/childcomps/DetailBaseInfo";
import DetailShopInfo from "../detail/childcomps/DetailShopInfo";
import DetailGoodsInfo from "../detail/childcomps/DetailGoodsInfo";
import DetailGoodsParam from "../detail/childcomps/DetailGoodsParam";
import DetailCommentInfo from "../detail/childcomps/DetailCommentInfo";
import DetailBottomBar from "../detail/childcomps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import Toast from "components/common/toast/Toast";

import { debounce } from "common/utils";
import { ImgListenMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";
import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      // 注意：这里不要写成goods:null 子组件要求传一个Object
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      cartNotice: "",
      noticeShow: false
    };
  },
  mixins: [ImgListenMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    Toast
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.id;
    // this.iid = this.$route.query.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部图片的轮播数据
      let data = res.result;
      console.log(data);
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.保存商品的参数信息
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /*
      // 1.值不对  this.$refs.param.$el还没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);

      // 2.值不对，图片加载问题
      this.$nextTick(() => {
        // 根据最新的数据，Dom是渲染出来了
        // 但是图片还是没有加载完的
        // offsetTop一般情况下值不对，都是因为图片的加载问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
        console.log(this.themeTopYs);
      });
      */
    });
    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      console.log(this.recommends);
    });

    // 这里写在这里的话是为了所有数据加载完了才会赋值
    // 4.给getThemeTopY赋值,进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      // 处理没有评论滚动的高度
      this.themeTopYs.push(
        this.$refs.comment.$el.offsetTop || this.$refs.recommends.$el.offsetTop
      );
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      // 最后加入最大值来方便if逻辑
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  methods: {
    ...mapActions(["addToCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    contentSroll(position) {
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      // es6:in打印的index，of是item
      let length = this.themeTopYs.length;
      // 方法一
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        // 注意这里面的i是string类型
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[+i] &&
          positionY <= this.themeTopYs[+i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.DetailNavBar.currentIndex = this.currentIndex;
        }

        // 方法二
        // for( lei i in this.themeTopYs){
        // if (
        //   this.currentIndex !== i &&
        //     ((i < length - 1 &&
        //       positionY >= this.themeTopYs[+i] &&
        //       positionY < this.themeTopYs[+i + 1]) ||
        //   (i == length - 1 && positionY >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.DetailNavBar.currentIndex = this.currentIndex
        // }
      }

      // 3.是否显示回到顶部(混入)
      this.isShowBackTop = -position.y > 1000;
    },

    // 添加到购物车
    addCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里面(1.promise 2.mapActions)
      // this.$store.commit("addToCart",product);
      // 返回值
      // this.$store.dispatch("addToCart", product).then(res => {
      //   console.log(res);
      // });

      // 将actions的方法映射到methods里面
      this.addToCart(product).then(res => {
        // this.noticeShow = true;
        // this.cartNotice = res;

        // setTimeout(() => {
        //   this.noticeShow = false;
        //   this.cartNotice = "";
        // }, 2000);
        this.$toast.show(res,2000)
      });
    }
  },
  updated() {
    // this.themeTopYs = [];
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
  },
  mounted() {},
  // 没有加入缓存，不能用这个
  deactivated() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  /* 视口高度与下面的height是在一起用的 */
  height: 100vh;
}

.scrollContent {
  height: calc(100% - 93px);
}

.detail-navbar {
  position: relative;
  z-index: 1;
  /* background: #fff */
  background: rgba(255, 251, 240, 0.2);
}
</style>