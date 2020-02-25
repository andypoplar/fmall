<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in ctitles"
      :key="index"
      class="tab-control-item"
      :class="{active:index===currentIndex}"
      @click="tabClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ctitles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods:{
    tabClick(index){
      this.currentIndex = index;
      this.$emit('tabClick',index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: aliceblue;
  width:100%;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span{
  /* 左右两边的padding可以把下面线变长一点 */
  padding: 2px 3px 6px;
}

.active {
  color: var(--color-high-text);
}

.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>