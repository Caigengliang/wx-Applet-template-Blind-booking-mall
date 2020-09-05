/*
 * @Author: yezi
 * @Date: 2020-08-25 16:09:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-02 09:17:05
 * @Description:
 */
// Pages/orderConfirm/orderConfirm.js
import { mdDetail, oderconfirm, ordercreate } from "../../Apis/ApiUrls";
import { showToast } from "../../Common/WxFun";
import { isEmptyObject } from "../../Utils/Tools";
import regExpCheck from "../../Utils/RegExp";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      name: "", //姓名
      phone: "", //手机号码
      type: "", //证件类型
      idNumber: "", //证件号
      remark: "", //留言
    },
    id: "",
    detailData: {},
    show: false,
    certification_type: [],
    total_price: "",
    orderKey: "",
    isonload: false,
  },

  showProp() {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({
      show: false,
    });
  },
  onConfirm(e) {
    this.setData({
      ["formData.type"]: e.detail.value,
      show: false,
    });
  },
  submit() {
    if (this.checkValue()) {
      let typeNum = "";
      this.data.detailData.certification_type.forEach((item) => {
        if (item.text === this.data.formData.type) {
          typeNum = item.val;
        }
      });
      wx.showLoading({ title: "订单支付中" });
      ordercreate(this.data.orderKey, {
        key: this.data.orderKey,
        real_name: this.data.formData.name,
        phone: this.data.formData.phone,
        certification_type: typeNum,
        certification_info: this.data.formData.idNumber,
        mark: this.data.formData.remark,
      }).then((res) => {
        wx.hideLoading();
        showToast(res.status);
      });
    }
  },
  setoderconfirm() {
    let that = this;
    oderconfirm({
      productId: that.data.id,
      cartNum: that.data.detailData.storeInfo.sales,
    }).then((res) => {
      that.setData({
        orderKey: res.orderKey,
        total_price: res.total_price,
      });
    });
  },
  checkValue() {
    if (this.data.formData.name === "") {
      showToast("请输入姓名 ");
      return false;
    }
    if (!regExpCheck.checkMobileNumber(this.data.formData.phone)) {
      showToast("请输入正确的手机号");
      return false;
    }
    if (this.data.formData.type === "") {
      showToast("请选择证件类型");
      return false;
    }
    if (this.data.formData.idNumber === "") {
      showToast("请输入证件编号");
      return false;
    }
    return true;
  },
  textin(e) {
    let key = e.currentTarget.dataset.index;
    console.log(e);
    this.data.formData[key] = e.detail.value;
    this.setData({
      formData: this.data.formData,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isonload: true,
    });
    console.log("....././/..", options);
    this.setData({
      id: options.product_id,
    });
    this.getDetail(options.product_id);
  },
  getDetail(id) {
    let that = this;
    mdDetail(id).then((res) => {
      let tmp = res;
      that.setData({
        detailData: tmp,
        isonload: false,
        certification_type: tmp.certification_type.map((item) => {
          return item.text;
        }),
      });
      that.setoderconfirm();
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(232323);
    if (this.data.total_price || !this.data.id || this.data.isonload) return;
    this.getDetail(this.data.id);
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
