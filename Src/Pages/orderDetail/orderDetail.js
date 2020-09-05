/*
 * @Author: yezi
 * @Date: 2020-08-25 10:54:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-31 15:56:36
 * @Description:
 */
// Pages/orderDetail/orderDetail.js
import { orderDetail } from "../../Apis/ApiUrls";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderid: "",
    list: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        orderid: options.orderid,
      });
    }
    this.getDetail();
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  checkRight() {
    wx.navigateTo({
      url: "/Pages/orderRight/orderRight",
    });
  },
  getDetail() {
    orderDetail(this.data.orderid).then((res) => {
      this.setData({
        list: res,
      });
    });
    let cinfo = wx.getStorageInfoSync("certification_type");
  },
});
