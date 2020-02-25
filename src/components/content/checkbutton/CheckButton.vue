<template>
  <div class="check-button" :class="{checked:isChecked}">
    <img src="~assets/img/detail/cart.png" alt="">
  </div>
</template>

<script>
export default {
  props:{
    isChecked:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style scoped>
  .check-button img{
    width: 19px;
    height: 22px;
  }

  .check-button{
    background: white;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    border:2px solid lightgrey
  }

  .checked{
    border:2px solid slateblue;
    background: salmon
  }
</style>