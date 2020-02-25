<template>
  <!-- Object.keys查看对象中所有key -->
  <div v-if="Object.keys(cgoods).length !==0" class="base-info">
    <div class="info1">
      <div class="title">{{cgoods.title}}</div>
      <span class="n-price">{{cgoods.newPrice}}</span>
      <span class="o-price">
        <s>{{cgoods.oldPrice}}</s>
      </span>
      <span class="discount">{{cgoods.discount}}</span>
    </div>
    <div class="info2">
      <span>{{cgoods.columns[0]}}</span>
      <span>{{cgoods.columns[1]}}</span>
      <span>{{cgoods.columns[2]}}</span>
    </div>
    <div class="info3">
      <span>
        <img :src="cgoods.services[cgoods.services.length-2].icon" alt />
        {{cgoods.services[cgoods.services.length-2].name}}
      </span>
      <span>
        <img :src="cgoods.services[cgoods.services.length-1].icon" alt />
        {{cgoods.services[cgoods.services.length-1].name}}
      </span>
      <!-- <span v-for="(item,index) in cgoods.services" :key="index">
        <img :src="item.icon" alt />
        {{item.name}}
      </span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cgoods: {
      type: Object,
      default() {
        return {};
      }
    }
  },
};
</script>

<style scoped>
.base-info {
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
}

.info1 {
  padding: 10px;
}

.title {
  font-size: 17px;
  color: black;
  padding-bottom: 10px;
  padding-top: 5px;
}

.n-price {
  font-size: 22px;
  color: var(--color-high-text);
}

.o-price {
  font-size: 13px;
  padding: 0px 5px;
}

.discount {
  background: aqua;
  color: white;
  border-radius: 10px;
  font-size: 14px;
}

.info2 {
  padding: 20px 10px 10px;
  display: flex;
  font-size: 13px;
  opacity: 0.5;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.info2 span {
  flex: 1;
}

.info2 span:nth-child(1) {
  text-align: left;
}

.info2 span:nth-child(2) {
  text-align: center;
}

.info2 span:nth-child(3) {
  text-align: right;
}

.info3 {
  padding: 15px 10px;
  display: flex;
  font-size: 13px;
}

.info3 span img {
  width: 12px;
  height: 12px;
}

.info3 span{
  flex: 1;
  /* padding: 0 1px; */
}

.info3 span:nth-child(2) {
  text-align: right;
}
</style>