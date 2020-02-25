<template>
  <tab-bar>
      <tab-bar-item link="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/category">
        <img slot="item-icon" src="~assets/img/tabbar/classify.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/classify-active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item link="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/shopping.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopping-active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile-active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar.vue';
import TabBarItem from 'components/common/tabbar/TabBarItem.vue';
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>