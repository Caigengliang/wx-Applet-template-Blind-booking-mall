/*
 * @Author: yezi
 * @Date: 2020-08-26 14:40:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-03 18:58:49
 * @Description:
 */
// Pages/H5/H5.js
import { aboutUs } from "../../Apis/ApiUrls";
import { problem } from "../../Apis/ApiUrls";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
    });
    if (options.type == "server") {
      wx.setNavigationBarTitle({
        title: "服务协议",
      });
      this.getServe();
    }
    if (options.type == "privacy") {
      wx.setNavigationBarTitle({
        title: "隐私协议",
      });
      this.getPrivacy();
    }
    if (options.type == "question") {
      wx.setNavigationBarTitle({
        title: "问题详情",
      });
      this.getList(options.qData);
    }
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
  getServe() {
    aboutUs().then((res) => {
      console.log(res);
      this.setData({
        content: res.service_agreement.replace(
          /\<img/gi,
          '<img class="rich-img" '
        ),
      });
    });
  },
  getPrivacy() {
    aboutUs().then((res) => {
      console.log(res);
      this.setData({
        content: res.privacy_agreement.replace(
          /\<img/gi,
          '<img class="rich-img" '
        ),
      });
    });
  },

  getList(id) {
    problem().then((res) => {
      res.forEach((item) => {
        item.articles.forEach((i) => {
          if (i.id.toString() === id.toString()) {
            this.setData({
              content: i.content.detail.replace(
                /\<img/gi,
                '<img class="rich-img" '
              ),
            });
          }
        });
      });
    });
  },
});
