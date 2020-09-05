/*
 * @Author: your name
 * @Date: 2020-08-25 15:19:07
 * @LastEditTime: 2020-09-05 07:21:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/shop-detail/shop-detail.js
 */
import { mdProductsDetail, collectAdd, collectDel } from "../../Apis/ApiUrls";
Page({
  data: {
    zan: [
      "../../Assets/Icons/zx_icon_sc.png",
      "../../Assets/Icons/zx_icon_sc_s.png",
    ],
    zanFlage: false,
    goodsId: "",
    detail: {},
    richData: {},
  },
  buyNow() {
    let that = this;
    wx.navigateTo({
      url:
        "../../Pages/orderConfirm/orderConfirm?product_id=" +
        that.data.detail.id,
    });
  },
  onShow() {
    // if (!this.data.goodsId) return;
    // this.getDetail();
  },
  onLoad(options) {
    console.log(options);
    this.setData({
      goodsId: options.goodsid,
    });
    this.getDetail();
  },
  clickZan(e) {
    if (!this.data.zanFlage) {
      collectAdd({
        id: e.currentTarget.dataset.id,
      }).then((res) => {
        this.setData({
          zanFlage: !this.data.zanFlage,
        });
        // this.getDetail();
      });
    } else {
      collectDel({
        id: e.currentTarget.dataset.id,
      }).then((res) => {
        this.setData({
          zanFlage: !this.data.zanFlage,
        });
        // this.getDetail();
      });
    }
  },
  getDetail() {
    mdProductsDetail(this.data.goodsId).then((res) => {
      this.setData({
        zanFlage: res.userCollect,
        detail: res,
        richData: res.descriptions.replace(/\<img/gi, '<img class="rich-img" '),
      });
    });
  },
});
