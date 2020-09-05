/*
 * @Author: your name
 * @Date: 2020-08-28 10:55:25
 * @LastEditTime: 2020-09-05 07:29:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Pages/msg-detail/msg-detail.js
 */
import { zixuninfo, zixunzan, quxiaozixunzan } from "../../Apis/ApiUrls";
import tool from "../../Utils/Tools";
import { showToast } from "../../Common/WxFun";
Page({
  data: {
    detail: null,
    id: "",
    timer: "",
    tapTime: "", // 防止两次点击操作间隔太快
  },
  onLoad: function (op) {
    this.getzixun(op.id);
    this.setData({
      id: op.id,
    });
  },
  //获取资讯详情
  getzixun(id) {
    zixuninfo(id).then((res) => {
      let tmp = res;
      tmp.content = tmp.content.replace(/\<img/gi, '<img class="rich-img" ');
      this.setData({
        detail: tmp,
      });
    });
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: this.detail.title,
      path: "pages/index/index",
    };
  },
  zaning(e) {
    if (this.data.detail.is_like == 1) {
      quxiaozixunzan({ info_id: this.data.id, type: "like" }).then((res) => {
        this.setData({
          ["detail.is_like"]: 0,
          ["detail.like_count"]: this.data.detail.like_count - 1,
        });
      });
    } else {
      zixunzan({ info_id: this.data.id, type: "like" }).then((res) => {
        this.setData({
          ["detail.is_like"]: 1,
          ["detail.like_count"]: this.data.detail.like_count + 1,
        });
      });
    }
  },
  //点赞
  zan(e) {
    var nowTime = new Date();
    if (nowTime - this.data.tapTime < 300) {
      showToast("你点得太快了～");
      return;
    }
    this.setData({ tapTime: nowTime });
    clearTimeout(this.data.timer);
    this.data.timer = setTimeout(() => {
      this.zaning(e);
    }, 500);
  },
  collecting(e) {
    if (e.currentTarget.dataset.index == 1) {
      quxiaozixunzan({ info_id: this.data.id, type: "collect" }).then((res) => {
        this.setData({
          ["detail.is_collect"]: 0,
        });
      });
    } else {
      zixunzan({ info_id: this.data.id, type: "collect" }).then((res) => {
        this.setData({
          ["detail.is_collect"]: 1,
        });
      });
    }
  },
  //收藏
  collect(e) {
    tool.debounce(this.collecting(e));
  },
});
