import {
  request
} from './request';
export function getDetail(iid) {
  return request({
    url: '/api/wh/detail',
    params: {
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/api/wh/recommend'
  })
}

// 对商品详情页面的数据整合
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 对商家信息数据的整合
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 商品参数数据的整合
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
