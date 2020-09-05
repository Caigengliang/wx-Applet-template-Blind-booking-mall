/*
 * @Author: caigengliang
 * @Date: 2020-07-13 17:02:33
 * @LastEditTime: 2020-09-02 14:09:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-27 15:51:01
 * @LastEditors: yezi
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Apis/ApiUrls.js
 */
const domains = require("./Domain.js");
// const httpRequest = require("/Utils/HttpHelper.js");
import httpRequest from "../Utils/HttpHelper.js";

console.log("小程序当前域名：", domains);

const urls = {
  userLogin: { url: "wechat/mp_auth", method: "POST" }, // 用户登录
  verify: { url: "register/verify", method: "POST" }, // 用户登录
  verify_code: { url: "verify_code", method: "get" }, // 用户登录
  binding: { url: "binding", method: "POST" }, // 用户登录
  bannerList: { url: "info/list/0", method: "get" }, // 首页默认数据
  articleList: { url: "info/collect/list", method: "get" }, // 资讯收藏列表
  goodsList: { url: "collect/user", method: "get" }, // 商品关注列表
  aboutUs: { url: "about/us", method: "get" }, // 关于我们
  problem: { url: "common/problem", method: "get" }, // 常见问题
  orderList: { url: "order/list", method: "get" }, // 订单列表
  orderRight: { url: "order/right", method: "get" }, // 订单权益
  orderDetail: { url: "order/detail/", method: "get" }, // 订单详情
  zixuninfo: { url: "info/details/", method: "get" }, //资讯详情
  zixunzan: { url: "info/collect/add", method: "POST" }, //资讯收藏点赞
  quxiaozixunzan: { url: "/info/collect/del", method: "POST" }, //资讯取消收藏点赞
  mdProducts: { url: "md/products", method: "POST" }, // 盲订--数据
  mdProductsDetail: { url: "md/product/detail/", method: "get" }, // 盲订--商品详情
  collectAdd: { url: "collect/add", method: "POST" }, // 添加关注商品
  collectDel: { url: "collect/del", method: "POST" }, // 取消关注商品
  productDetail: { url: "/md/product/detail/", method: "get" }, // 商品详情
  mdDetail: { url: "/md/detail/", method: "get" }, // 订单详情
  oderconfirm: { url: "/md/order/confirm", method: "POST" }, // 提交订单
  ordercreate: { url: "/md/order/create/", method: "POST" }, // 提交订单
  search: { url: "/info/search/0", method: "POST" }, // 搜索
  user: { url: "/user", method: "get" }, // 个人中心
};

const request = {};

const getUrls = () => {
  for (const key in urls) {
    urls[key].url = domains.apiDomain + "/api/" + urls[key].url;
  }
  return urls;
};

const getApi = () => {
  for (const key in urls) {
    let req = httpRequest.get;
    if (urls[key].method === "POST") {
      req = httpRequest.post;
    }
    request[key] = (params, paramsPost = null) => {
      if (params instanceof Object || params === undefined || params == null) {
        return req(urls[key].url, params);
      } else {
        return req(urls[key].url + params, paramsPost);
      }
    };
  }
  return request;
};

const modulea = {
  urls: getUrls(),
  domains,
};
const moduleb = getApi();

module.exports = Object.assign(modulea, moduleb);
