<template>
  <div class="toast" v-show="isshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      message: "",
      isshow: false
    };
  },
  methods: {
    // 如果不传时间，默认值2000
    show(message='default', duration=2000) {
      this.isshow = true;
      this.message = message;

      setTimeout(() => {
        this.isshow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  /* 水平垂直居中 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000
}

.toast div {
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 12px;
  color: white;
  border-radius: 5px;
}
</style>