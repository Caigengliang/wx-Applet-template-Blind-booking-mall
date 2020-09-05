/*
 * @Author: your name
 * @Date: 2020-08-24 09:12:18
 * @LastEditTime: 2020-09-02 10:47:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Components/shop-box/shop-box.js
 */
Component({
  data: {},
  properties: {
    shopData: {
      type: Object,
      value: {
        id: "",
        label_copy: "",
        title: "",
        image_input: [],
        visit: "",
        add_time: "",
      },
    },
  },
  methods: {
    todetail() {
      wx.navigateTo({
        url: "../../Pages/msg-detail/msg-detail?id=" + this.data.shopData.id,
      });
      this.triggerEvent("seeinfo", this.data.shopData.id); //通过triggerEvent将参数传给父组件
    },
  },
});
