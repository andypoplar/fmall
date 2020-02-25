<template>
  <swiper>
    <swiper-item v-for="(item,index) in cbanners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 监听图片加载完成
    imageLoad() {
      // 设置isLoad变量为了不让HomeSwiper多次发出事件(进行状态管理)
      // 注意：这里不进行多次调用和debounce的区别
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>