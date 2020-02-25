<template>
  <div class="cart-item">
    <div class="item-selector">
      <CheckButton :isChecked="cartItem.checked" @click.native="changeChecked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="cartItem.image" alt />
    </div>
    <div class="item-info">
      <div class="item-title">{{cartItem.title}}</div>
    </div>
    <div class="item-bottom">
      <span class="item-left">{{'￥'+cartItem.price}}</span>
      <span class="item-right">count:{{cartItem.count}}</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbutton/CheckButton";
export default {
  props: {
    cartItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    changeChecked() {
      this.cartItem.checked = !this.cartItem.checked;
    }
  }
};
</script>

<style scoped>
.cart-item {
  width: 94%;
  display: flex;
  padding: 10px 5px;
  position: relative;
  background: white;
  border-radius: 5px;
  margin: 15px auto;
}

.item-img img {
  width: 80px;
  height: 80px;
  padding-left: 5px;
}

.item-title {
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; */
  padding: 2px 6px 5px;
}

.item-info {
  font-size: 14px;
  color: #333;
  padding: 5px;
  position: relative;
  overflow: hidden;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
  align-items: center;
}

.item-bottom {
  position: absolute;
  bottom: 8px;
  left: 125px;
}

.item-left {
  color: salmon;
}

.item-right {
  position: absolute;
  left: 150px;
}
</style>