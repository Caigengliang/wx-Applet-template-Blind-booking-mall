/*
 * @Author: yezi
 * @Date: 2020-08-26 14:23:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-01 11:35:12
 * @Description:
 */
// Pages/articleCollect/articleCollect.js
import { articleList } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    limit: 20,
    page: 1,
    token: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync("loginInfo")) {
      this.setData({
        token: wx.getStorageSync("loginInfo").token,
      });
    }
    this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  goLink(e) {
    // console.log(e);
    wx.navigateTo({
      url:
        "../../Pages/msg-detail/msg-detail?id=" + e.currentTarget.dataset.index,
    });
  },
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
  getList() {
    articleList({
      // Authori-zation: this.data.token,
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      if (res.list.length === 0) {
        showToast("没有更多了～");
      }
      console.log(res);
      this.setData({
        list: [...this.data.list, ...res.list],
      });
    });
  },
});
