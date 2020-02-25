<template>
  <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
    <div class="info-header">
      <div class="info-title">
        <span>用户评价</span>
        <span>更多</span>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <!-- 服务器返回时间是个时间戳 -->
        <!-- 1.先将时间戳转为Date对象(时间戳是秒，Date要求传毫秒,需要时间戳*1000) -->
        <!-- 2. 再进行格式化，转成字符串-->
        <span class="date">{{commentInfo.created | getFullTime}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
    </div>
    <div class="info-imgs">
      <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt />
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    getFullTime(value) {
      // 1.将时间戳转为Date对象
      const date = new Date(value * 1000);

      // 2.data进行格式化
      return formatDate(date,"yyyy-MM-dd hh:mm:ss")
    }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 10px 15px;
  background: #fff;
}

.info-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: 0 15px;
}

.info-title span:nth-child(2) {
  color: salmon;
  float: right;
}

.info-user {
  padding: 20px 0;
  display: flex;
  align-items: center;
}

.info-user img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
}

.info-user span {
  margin-left: 15px;
}

.info-other {
  font-size: 14px;
  color: lightgrey;
  padding: 10px 0;
}

.info-imgs img {
  width: 100%;
}

.date{
  padding-right: 10px;
}
</style>