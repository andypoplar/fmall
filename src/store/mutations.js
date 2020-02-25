import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types';

export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) { // 数量+1
    payload.count += 1;
  },
  [ADD_TO_CART](state, payload) { // 添加到购物车
    // 加入购物车时候，默认为选中
    payload.checked = true;
    state.cartList.push(payload)
  }
}
