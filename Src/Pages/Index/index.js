/*
 * @Author: your name
 * @Date: 2020-07-13 17:02:33
 * @LastEditTime: 2020-09-05 08:11:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wxAppBoilerplate/Src/Pages/Index/index.js
 */
//index.js
//获取应用实例
const app = getApp();
const { globalEnum } = wx.utils;
import { bannerList } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";
Page({
  data: {
    motto: "Hello World",
    bannerUrl: "",
    binfo: {},
    list: [],
    page: 1,
    limit: 10,
    userInfo: {},
    isOverShare: true,
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    ...require("./Data.js"), // 在此处引用，只在该页面运行时才会加载data
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  loadMore() {
    this.setData({
      page: this.data.page + 1,
    });
    this.getBanner();
  },
  onLoad: function () {
    // const loginInfo = app.getLoginInfo();
    // if (loginInfo.userInfo) {
    //   this.setData({
    //     userInfo: loginInfo.userInfo,
    //     hasUserInfo: true,
    //   });
    // }
  },
  onShareAppMessage: function () {},
  onShow: function () {
    this.setData({
      page: 1,
    });
    this.getBanner();
  },
  onHide() {
    this.setData({
      page: 1,
    });
  },
  toDetail(e) {
    wx.navigateTo({
      url:
        "../../Pages/msg-detail/msg-detail?id=" + e.currentTarget.dataset.index,
    });
  },
  getBanner() {
    bannerList({
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      if (res.list.length === 0) {
        showToast("没有更多了～");
        return;
      }
      let lsits = res.list;
      if (this.data.page !== 1) {
        lsits = [...this.data.list, ...res.list];
      }
      this.setData({
        list: lsits,
      });
      this.setData({
        binfo: res.banner,
      });
      // console.log("/////////////", res);
    });
  },
  getUserInfo: function (e) {
    console.log(e);
    wx.setStorage({
      data: {
        userInfo: e.detail.userInfo,
      },
      key: globalEnum.storageKeys.loginInfo,
    });

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
});
