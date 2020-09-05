/*
 * @Author: yezi
 * @Date: 2020-08-26 14:33:32
 * @LastEditors: yezi
 * @LastEditTime: 2020-08-28 10:20:16
 * @Description: 
 */
// Pages/aboutUs/aboutUs.js
import {aboutUs} from '../../Apis/ApiUrls'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getInit(){
    aboutUs({})
    .then(res => {
      console.log(res)
      this.setData({
        phone: res.site_phone
      })
    })
  },
  // 拨打联系电话
  call(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  }
})