/*
 * @Author: your name
 * @Date: 2020-08-24 09:01:35
 * @LastEditTime: 2020-09-04 15:58:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/shop/shop.js
 */
import { mdProducts } from "../../Apis/ApiUrls";
import tool from "../../Utils/Tools";
Page({
  data: {
    product_id: 0,
    page: 1,
    limit: 10,
    list: {},
    p_num: 1,
    product_count: 0,
    background: ["demo-text-1", "demo-text-2", "demo-text-3"],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    startPageX: 0,
    tmpList: [], // 0 当前条  1 上一条  2 下一条
    cards: [], // 卡片数据，一个包含所有卡片对象的数组
    removed_cards: [], // 存放已经移除的卡片的索引数据，如果索引填充了其他卡片，需要将该索引移出
    transition: true, //是否开启过渡动画
    circling: true, // 是否列表循环
    rotate_deg: 0, // 整个滑动过程旋转角度
    slide_duration: 200, // 手指离开屏幕后滑出界面时长，单位(ms)毫秒
    show_cards: 3, // 显示几张卡片
    thershold: 60, // 松手后滑出界面阈值，单位px
    scale_ratio: 0.07, // 下层卡片收缩力度
    up_height: 40, // 下层卡片下移高度，单位rpx
  },
  onLoad() {},
  onHide() {},
  onShow() {
    this.getList();

    // if (tool.isEmptyObject(this.data.list)) return;
    // this.reqList(); //刷新查看次数
  },
  getListSeeinfo(e) {
    console.log(e.detail);
    this.data.list.info_list.forEach((item) => {
      if (item.id === e.detail) {
        item.visit = parseInt(item.visit) + 1;
      }
    });
    this.setData({
      list: this.data.list,
    });
  },
  goindex() {
    wx.switchTab({
      url: "../../Pages/Index/index",
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  buyNow() {
    wx.navigateTo({
      url:
        "../../Pages/submitOrder/orderConfirm?product_id=" +
        this.data.list.product_id,
    });
  },
  linkto(e) {
    wx.navigateTo({
      url:
        "../../Pages/shop-detail/shop-detail?goodsid=" +
        e.currentTarget.dataset.goodsid,
    });
  },
  // 获取当前这一条
  getList() {
    this.setData({
      cards: [],
      p_num: 1,
    });
    mdProducts({
      product_id: this.data.product_id,
      p_num: this.data.p_num,
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      let arr = this.data.cards;
      let tmp = res.product;
      tmp.title = res.product.product_id;
      tmp.src = res.product.image;
      arr.push(tmp);
      this.setData({
        cards: arr,
        list: res.product,
        product_count: res.product_count,
      });
      this.getnextList();
    });
  },
  // 右滑动的那一条
  getnextList(current) {
    let max = this.data.product_count;
    this.setData({
      p_num: this.data.p_num === max ? this.data.p_num : this.data.p_num + 1,
    });
    mdProducts({
      product_id: this.data.product_id,
      p_num: this.data.p_num,
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      let arr = this.data.cards;
      let tmp = res.product;
      tmp.title = res.product.product_id;
      tmp.src = res.product.image;
      arr.push(tmp);
      this.setData({
        cards: arr,
        product_count: res.product_count,
      });
    });
  },

  setList(id) {
    // this.
  },

  cardSwipe(e) {
    const { direction, swiped_card_index, current_cursor } = e.detail;
    // console.log(this.data.cards[current_cursor]);
    this.setData({
      list: this.data.cards[current_cursor],
    });
    // wx.showToast({
    //   title: `卡片${swiped_card_index + 1}向${
    //     direction === "left" ? "左" : "右"
    //   }滑`,
    //   icon: "none",
    //   duration: 1000,
    // });
    if (this.data.p_num === this.data.product_count) {
      return;
    }
    this.getnextList();
    // this.setData({
    //   current_cursor,
    // });
  },
});
