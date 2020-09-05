/*
 * @Author: yezi
 * @Date: 2020-08-26 14:48:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-08-31 15:42:32
 * @Description:
 */
// Pages/commenProblem/commenProblem.js
import { problem } from "../../Apis/ApiUrls";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },
  gotoLink(e) {
    console.log(e);
    wx.navigateTo({
      url: "/Pages/H5/H5?type=question&&qData=" + e.currentTarget.dataset.index,
    });
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  getList() {
    problem().then((res) => {
      this.setData({
        list: res,
      });
    });
  },
});
