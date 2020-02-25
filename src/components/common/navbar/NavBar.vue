<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div> 
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
/* 在style中使用了scoped，则style标签里的css仅作用于当前页面。
css对子组件不生效，可以在子组件的style标签里也使用scoped，
这样可以使一个页面对应自己的css，避免影响到其他页面。 */
  .nav-bar{
    display: flex;
    line-height: 44px;
    height: 44px;
    text-align: center;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);
  }

  .left,
  .right{
    width: 60px;
  }

  .center{
    /* 将剩余部分完全占据 */
    flex: 1;
  }
</style>

