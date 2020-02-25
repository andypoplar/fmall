// debounce混入
import {
  debounce
} from './utils';
export const ImgListenMixin = {
  // components,methods,都可以混入
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    // console.log("我是混入的内容");
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}

// 回到顶部的混入
import BackTop from 'components/content/backtop/BackTop.vue';
export const backTopMixin = {
  data(){
    return{
      isShowBackTop: false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }
}
