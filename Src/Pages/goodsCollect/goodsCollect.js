/*
 * @Author: yezi
 * @Date: 2020-08-26 11:25:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-04 11:37:50
 * @Description:
 */
// Pages/goodsCollect/goodsCollect.js
import { goodsList } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    limit: 20,
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  goDetail(e) {
    console.log(e);
    wx.navigateTo({
      url:
        "../../Pages/shop-detail/shop-detail?goodsid=" +
        e.currentTarget.dataset.index,
      success: (result) => {},
      fail: () => {},
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
    goodsList({
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      console.log(res);
      if (res.length === 0) {
        showToast("没有更多了～");
      }
      this.setData({
        list: [...this.data.list, ...res],
      });
    });
  },
});
