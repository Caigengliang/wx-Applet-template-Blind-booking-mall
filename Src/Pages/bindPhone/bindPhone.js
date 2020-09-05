/*
 * @Author: your name
 * @Date: 2020-08-26 16:00:24
 * @LastEditTime: 2020-08-28 14:55:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/bindPhone/bindPhone.js
 */
// Pages/bindPhone/bindPhone.js
import { verify, verify_code, binding } from "../../Apis/ApiUrls";
import regExpCheck from "../../Utils/RegExp";
import tool from "../../Utils/Tools";
import { showToast } from "../../Common/WxFun";
const globalEnum = require("../../Enums/GlobalEnum.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    key: "",
    disabled: false,
    timetext: "获取验证码",
  },
  inputPhone(e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  inputcode(e) {
    console.log(e);
    this.setData({
      code: e.detail.value,
    });
  },
  getCode() {
    if (!regExpCheck.checkMobileNumber(this.data.phone)) {
      showToast("请输入正确的手机号");
      return;
    }
    if (this.data.disabled) {
      return;
    }
    tool.debounce(
      verify({
        phone: this.data.phone,
        type: "reset",
        key: this.data.key,
      }).then((res) => {
        this.runNun();
        // console.log(res.data);
      })
    );
  },
  bindmobilephone() {
    binding({
      phone: this.data.phone,
      captcha: this.data.code,
    }).then((res) => {
      showToast("绑定成功");
      let user = wx.getStorageSync(globalEnum.storageKeys.loginInfo);
      user.userInfo.phone = this.data.phone;
      wx.setStorageSync(globalEnum.storageKeys.loginInfo, user);
      wx.switchTab({
        url: "../../Pages/Mine/Mine",
      });
    });
  },
  getKey() {
    verify_code().then((res) => {
      this.setData({
        key: res.key,
      });
    });
  },
  runNun: function () {
    let that = this;
    let n = 60;
    let run = setInterval(function () {
      n--;
      if (n < 0) {
        clearInterval(run);
        that.setData({ disabled: false, timetext: "重新获取" });
      } else {
        that.setData({
          timetext: "剩余 " + n + "s",
          disabled: true,
        });
      }
    }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getKey();
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
