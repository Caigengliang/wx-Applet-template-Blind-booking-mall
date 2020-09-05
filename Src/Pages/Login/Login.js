/*
 * @Author: your name
 * @Date: 2020-07-13 17:02:33
 * @LastEditTime: 2020-09-02 08:54:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/Login/Login.js
 */
// Pages/Login/Login.js
// import base from "../../main.js"; // 导入基础模块
import httpRequest from "../../Utils/HttpHelper.js";
import { userLogin } from "../../Apis/ApiUrls";
import appApi from "../../Apis/ApiUrls";
const globalEnum = require("../../Enums/GlobalEnum.js");
import { showToast } from "../../Common/WxFun";

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  cancel() {
    wx.navigateBack({
      delta: 1,
    });
  },
  wx_login() {
    let spread_spid = app.systemData.spid; //获取推广人ID
    let spread_code = app.systemData.code; //获取推广人分享二维码ID
    wx.login({
      timeout: 10000,
      success: (result) => {
        wx.getUserInfo({
          withCredentials: "false",
          lang: "zh_CN",
          timeout: 10000,
          success: (rt) => {
            let postData = rt;
            postData.spread_spid = spread_spid;
            postData.spread_code = spread_code;
            postData.code = result.code;
            wx.request({
              url: appApi.urls.userLogin.url,
              data: postData,
              header: { "Content-Type": "application/json; charset=utf-8" },
              method: "POST",
              dataType: "json",
              responseType: "text",
              success: (ru) => {
                if (ru.data.status === 200) {
                  wx.setStorageSync(
                    globalEnum.storageKeys.loginInfo,
                    ru.data.data
                  );
                  showToast("登录成功");
                  wx.navigateBack({
                    delta: 1,
                  });
                }
              },
              fail: (err) => {
                showToast("网络开小差,稍后再试");
              },
              complete: () => {},
            });
          },
          fail: () => {},
          complete: () => {},
        });
        console.log(result);
      },
      fail: () => {
        showToast("网络开小差请稍后再试～");
      },
      complete: () => {},
    });
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
});
