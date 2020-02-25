import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types';

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      // context:上下文
      // payload:新添加的商品
      // 方法一
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }

      // 方法二
      // 查找数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => {
        return item.iid === payload.iid
      })

      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量加1')
      } else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload);
        resolve('加入购物车成功')
      }
    })
    // console.log(this.state.cartList);
  }
}
