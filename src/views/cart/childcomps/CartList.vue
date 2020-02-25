<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :cart-item="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
/* 有一个问题：刚打开时候，购物车为 0，可滚动高度为0，当你加入购物车时候，并没有刷新scroll*/
/* 鼠标滚轮不可滚动 需要注意结构*/
/* 
  cart-list --- content
 */
.cart-list {
  /* 导航栏top:44,bottom:49,计算导航:40*/
  height: calc(100% - 133px);
  background: rgba(145, 142, 142, 0.1);
}

.content {
  /* 固定高度 */
  height: 100%;
  overflow: hidden;
}
</style>