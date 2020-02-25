<template>
  <div class="wrapper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 这里尽量用这种方式(this.$refs.name),因为用query的话，类名可能在后面重复，不知道拿到的是哪个
    // 创建scroll对象
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 监听滚动位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });

    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingup");
    });
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time) {
      // 问题1可能存在
      // 在scroll没初始化完成后，图片先加载，相当于null.refresh
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 上拉再次完成
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 重新计算高度
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("------");
    },

    // 当前滚动y值
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>