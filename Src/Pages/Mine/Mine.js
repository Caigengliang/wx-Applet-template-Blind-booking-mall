/*
 * @Author: your name
 * @Date: 2020-07-13 17:02:33
 * @LastEditTime: 2020-09-02 18:05:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/Mine/Mine.js
 */
// Pages/Mine/Mine.js
const globalEnum = require("../../Enums/GlobalEnum.js");
const app = getApp();
import { user } from "../../Apis/ApiUrls";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    isBindphone: false,
    userInfo: {},
  },
  wxLogin() {
    wx.navigateTo({
      url: "../../Pages/Login/Login",
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  call: function () {
    if (!this.data.site_service_phone) {
      this.wxLogin();
    }
    wx.makePhoneCall({
      phoneNumber: this.data.site_service_phone,
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync(globalEnum.storageKeys.loginInfo)) {
      this.getUser();
      this.setData({
        userInfo: wx.getStorageSync(globalEnum.storageKeys.loginInfo),
        isLogin: true,
      });
      if (this.data.userInfo.userInfo.phone) {
        this.setData({
          isBindphone: true,
        });
      }
    }
  },
  getUser() {
    user().then((res) => {
      this.setData({
        site_service_phone: res.site_service_phone,
      });
      // console.log(res);
    });
  },
  bindPhone() {
    wx.navigateTo({
      url: "../../Pages/bindPhone/bindPhone",
    });
  },
  loginout() {
    wx.clearStorage();
    wx.reLaunch({
      url: "../Mine/Mine",
    });
  },
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
});
