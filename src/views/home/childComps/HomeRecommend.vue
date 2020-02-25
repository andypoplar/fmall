<template>
  <div class="recommend">
    <div v-for="(item,index) in crecommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    crecommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    padding: 10px 0 20px;
    text-align: center;
    font-size: 14px;
    border-bottom:8px solid #eee;
    width: 100%;
  }

  .recommend-item{
    flex:1;
  }

  .recommend-item img{
    width: 75px;
    height: 75px;
    margin-bottom: 7px
  }
</style>