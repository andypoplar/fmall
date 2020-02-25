<template>
  <div class="detail-swiper">
    <!-- 这里的类名不能是swiper，轮播图里封装时候获取的.swiper获取不知道是哪个 -->
    <swiper class="swipers">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swipers {
  height: 300px;
  overflow: hidden;
}
</style>