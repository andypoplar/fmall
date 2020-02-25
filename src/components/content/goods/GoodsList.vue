<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in cgoods" :key="index" :goods-item="item" />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    cgoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0px 5px 0px;
  margin-top: 10px;
}
</style>