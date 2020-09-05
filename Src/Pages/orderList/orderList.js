/*
 * @Author: yezi
 * @Date: 2020-08-25 10:28:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-01 11:36:05
 * @Description:
 */
// Pages/orderList/orderList.js
import { orderList } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    limit: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1,
    });
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  toDetail(e) {
    wx.navigateTo({
      url:
        "/Pages/orderDetail/orderDetail?orderid=" +
        e.currentTarget.dataset.orderid,
    });
  },
  toRefund() {
    wx.navigateTo({
      url: "/Pages/orderRefund/orderRefund",
    });
  },
  getList() {
    orderList({
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      console.log("11", res);
      if (res.length === 0) {
        showToast("没有更多了～");
      }
      this.setData({
        list: [...this.data.list, ...res],
      });
    });
  },
});
