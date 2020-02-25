<template>
  <div v-if="Object.keys(cgoodsParam).length !==0" class="goods-param">
    <table class="sizes">
      <tr v-for="(item,index) in cgoodsParam.sizes[0]" :key="index">
        <td v-for="(i,n) in item" :key="n">{{i}}</td>
      </tr>
    </table>
    <table class="infos">
      <tr v-for="(item,index) in cgoodsParam.infos" :key="index">
        <td>{{item.key}}</td>
        <td>{{item.value}}</td>
      </tr>
    </table>
    <div class="image-bottom" v-if="cgoodsParam.image.length!==0">
      <img :src="cgoodsParam.image" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cgoodsParam: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.goods-param {
  padding: 10px 20px;
  font-size: 14px;
  background: #fff;
  border-bottom: 5px solid rgba(0, 0, 0, 0.1)
}

.infos tr,
.sizes tr {
  display: flex;
  width: 50vh;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.infos td,
.sizes td {
  flex: 1;
  font-size: 14px;
  /* text-align: center */
}

.sizes tr td:nth-child(1),
.infos tr td:nth-child(1) {
  color: salmon;
}
</style>