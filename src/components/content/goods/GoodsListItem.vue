<template>
  <div class="goods-item" @click="itemClick">
    <!-- 图片懒加载 v-lazy="地址" -->
    <img v-lazy="showImage" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      // 事件总线
      this.$bus.$emit("itemImageLoad");

      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeImageLoad");
      // }else if(this.$route.path.indexOf("/detail")){
      //   this.$bus.$emit("detailImageLoad");
      // }
    },
    itemClick() {
      this.$router.push("/detail/" + this.address);
      // this.$router.push({
      //   path:'/detail/',
      //   query:{
      //     iid:this.goodsItem.iid
      //   }
      // })
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
    address(){
      return this.goodsItem.iid || this.goodsItem.item_id;
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 20px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  height: 90%;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 7px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 25px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -17px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/goods/collect.svg") 0 0/14px 14px;
}
</style>