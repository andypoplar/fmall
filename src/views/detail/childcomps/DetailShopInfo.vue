<template>
  <div class="shop-info">
    <div class="shop-head">
      <img :src="cshop.logo" alt class="logo" />
      <span>{{cshop.name}}</span>
    </div>
    <div class="shop-body">
      <div class="shop-body-left">
        <div class="info-sells">
          <div class="sells-count">{{cshop.sells}}</div>
          <div class="goods-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{cshop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-body-right">
        <table>
          <tr v-for="(item,index) in cshop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}">
              <span>{{item.isBetter?'高':'低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <button>进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cshop: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.shop-info {
  padding: 25px 15px;
  /* margin-bottom: 150px; */
}

.shop-head {
  line-height: 60px;
  height: 60px;
  /* 元素垂直中心对齐 */
  align-items: center;
  display: flex;
}

.shop-head span {
  margin-left: 10px;
  vertical-align: center;
}

.logo {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid salmon;
}

.shop-body {
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.shop-body-left {
  display: flex;
  justify-content: space-evenly;
  color: #333;
  text-align: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  flex: 1;
}

.sells-count,
.goods-count {
  font-size: 18px;
}

.sells-text,
.goods-text {
  margin-top: 10px;
  font-size: 12px;
}

.shop-body-right {
  font-size: 13px;
  color: #333;
  flex: 1;
}

.shop-body-right table {
  width: 120px;
  margin-left: 30px;
}

.shop-body-right table td {
  padding: 5px 0;
}

.shop-body-right .score {
  color: aquamarine;
}

.shop-body-right .score-better {
  color: salmon;
}

.shop-body-right .better span {
  background: aquamarine;
  color: #fff;
  text-align: center;
}

.shop-body-right .better-more span {
  background: salmon;
}

.info-goods,
.info-sells {
  text-align: center;
}

.shop-bottom{
  padding: 30px 0;
}

.shop-bottom button{
  display: block;
  margin: 0 auto;
  border:none;
  background: salmon;
  color: white;
  border-radius: 15px;
  padding: 6px 52px;
  font-size: 14px;
}
</style>