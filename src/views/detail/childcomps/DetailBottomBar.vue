<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    addToCart(){
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
/* .bottom-bar{
  height: 49px;
  background: white;
  bottom: -1px;
  position: relative;
  
  display: flex;
  text-align: center
} */

.bottom-bar{
  height: 49px;
  background: white;
  bottom: 0px;
  position: fixed;
  width: 100%;
  display: flex;
  text-align: center
}

.bar-item{
  display: flex;
  flex: 1
}

.bar-item >div{
  flex: 1
}

.bar-item .text{
  font-size: 13px;
}

.bar-item .icon{
  display: block;
  width: 22px;
  height: 22px;
  margin: 4px auto 3px;
  background: url("~assets/img/detail/service.png") 0 0/100%;
}

/* .bar-left .service{
  background-position: 0px;
}

.bar-left .shop{
  background-position: 0 -98px;
} */

.bar-right{
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart{
  background-color: blanchedalmond;
  color: #333;
  line-height: 49px;
}

.bar-right .buy{
  background-color: salmon;
  color: #fff;
  line-height: 49px;
}


</style>