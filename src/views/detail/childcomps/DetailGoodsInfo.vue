<template>
  <div v-if="Object.keys(cdetailInfo).length!==0" class="goods-info">
    <div class="detail-desc">{{cdetailInfo.desc}}</div>
    <div v-for="(item,index) in cdetailInfo.detailImage" :key="index">
      <!-- <div>{{item.anchor}}</div> -->
      <div class="goods-key">{{item.key}}</div>
      <img :src="img" alt v-for="(img,i) in item.list" :key="i" class="goods-img" @load="imageLoad" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  props: {
    cdetailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      // 判断所有的图片都加载完了，进行一次回调就可以
      // this.counter += 1;
      // if (this.counter === this.imagesLength) {
      //   this.$emit("imageLoad");
      // }
        this.$emit("imageLoad");
    }
  },
  watch: {
    // 获取图片的个数
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    }
  }
};
</script>

<style scoped>
.goods-img {
  width: 100%;
  padding: 5px;
}

.goods-key {
  padding: 20px 10px;
}

.detail-desc {
  padding: 10px;
}
</style>