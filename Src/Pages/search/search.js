/*
 * @Author: your name
 * @Date: 2020-08-24 15:00:09
 * @LastEditTime: 2020-09-03 15:21:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wxAppBoilerplate/Src/Pages/search/search.js
 */
import { search } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";
Page({
  data: {
    variable: {
      placeholder: "每日资讯",
      isShowClear: true,
      inputValue: "",
    },
    page: 1,
    limit: 10,
    shopShow: false,
    shopList: [],
    history: [],
  },
  cancel() {
    this.data.variable.inputValue = "";
    this.data.shopShow = false;
    this.setData({
      variable: this.data.variable,
      shopShow: this.data.shopShow,
    });
  },
  delHistory() {
    this.setData({
      history: [],
    });
    wx.setStorageSync("history", []);
  },
  onShow() {
    this.setData({
      history: wx.getStorageSync("history") || [],
    });
  },
  historySearch(e) {
    this.data.variable.inputValue = e.currentTarget.dataset.index;
    this.setData({
      variable: this.data.variable,
    });
    search({
      cid: 0,
      key_word: e.currentTarget.dataset.index,
      page: this.data.page,
      limit: this.data.limit,
    }).then((res) => {
      this.setData({
        shopList: res.list,
      });
      if (res.list.length > 0) {
        this.setData({
          shopShow: true,
        });
      }
      if (res.list.length === 0) {
        this.setData({
          shopShow: false,
        });
        showToast("找不到数据，换个关键字试试～");
      }
      console.log(res);
    });
  },
  getListSeeinfo(e) {
    // console.log(e.detail);
    this.data.shopList.forEach((item) => {
      if (item.id === e.detail) {
        item.visit = parseInt(item.visit) + 1;
      }
    });
    this.setData({
      shopList: this.data.shopList,
    });
  },
  serachin() {
    let that = this;
    if (!that.data.variable.inputValue) {
      showToast("请输入搜索内容～");
      return;
    }
    if (that.data.history.indexOf(that.data.variable.inputValue) < 0) {
      that.data.history.unshift(that.data.variable.inputValue);
    }
    that.setData({
      history: that.data.history,
    });
    wx.setStorageSync("history", that.data.history);
    search({
      cid: 0,
      key_word: that.data.variable.inputValue,
      page: that.data.page,
      limit: that.data.limit,
    }).then((res) => {
      that.setData({
        shopList: res.list,
      });
      if (res.list.length > 0) {
        that.setData({
          shopShow: true,
        });
      }
      if (res.list.length === 0) {
        showToast("找不到数据，换个关键字试试～");
        that.setData({
          shopShow: false,
        });
      }
      // console.log(res);
    });
  },
  searchInput(e) {
    console.log(e);
    this.data.variable.inputValue = e.detail.value;
    this.setData({
      variable: this.data.variable,
    });
  },
});
