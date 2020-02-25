<template>
  <div class="cart-bottom">
    <div class="check-content" @click="allSelect">
      <check-button class="check-button" :isChecked="isSelectAll" />
      <span class="all-check">全选</span>
      <span>合计:{{totalPrice}}</span>
    </div>
    <div class="computed" @click="calcClick">
      去计算
      <span>({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
export default {
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    // 全部选中
    isSelectAll() {
      // 方法一 使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length);

      // 方法二 使用find
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.checked);

      // 方法三 普通
      // for(let item of this.$store.state.cartList){
      //   // 如果checked为false
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
    }
  },
  methods: {
    allSelect() {
      if (this.isSelectAll) {
        this.$store.state.cartList.map(item => {
          item.checked = false;
        });
      } else {
        this.$store.state.cartList.map(item => {
          item.checked = true;
        });
      }

      // 这种简化有问题
      // this.$store.state.cartList.forEach(item => {
      //   item.checked = !this.isSelectAll;
      // });
    },
    calcClick() {
      // 判断是否有商品被选中
      if (this.totalPrice === '￥0.00') {
        this.$toast.show("请选择商品", 2000);
      }else{
        this.$toast.show("收款妹妹马上就来",2000);
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom {
  background: lavenderblush;
  height: 40px;
  position: relative;
  font-size: 15px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  height: 40px;
}

.check-button {
  width: 25px;
  height: 25px;
  margin: 0 5px 0px 10px;
}

.all-check {
  margin-right: 10px;
}

.computed {
  width: 100px;
  height: 40px;
  line-height: 40px;
  background: salmon;
  text-align: center;
  color: white;
  position: absolute;
  right: 0;
}
</style>