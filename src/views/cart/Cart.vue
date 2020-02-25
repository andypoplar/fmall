<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 购物车列表 -->
    <cart-list />
    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartBottomBar from "./childcomps/CartBottomBar";
import CartList from "./childcomps/CartList";
import { mapGetters } from "vuex";
export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // getters里的方法可以在这里直接用的做法
    // 将getters映射成局部的计算属性
    // 语法一
    ...mapGetters(["cartLength", "cartList"])

    // 语法二(名字不一样时)
    // ...mapGetters({
    //   length:'cartLength'
    // })
  }
};
</script>

<style scoped>
.nav-bar {
  background: var(--color-tint);
  color: white;
  font-size: 16px;
}

.cart {
  height: 100vh;
}  
</style>