/*
 * @Author: your name
 * @Date: 2020-08-24 09:21:29
 * @LastEditTime: 2020-09-03 09:02:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /wxAppBoilerplate/Src/Components/search-bar/search-bar.js
 */
Component({
  data: {},
  properties: {
    variable: {
      type: Object,
      value: {
        placeholder: "每日资讯",
        isShowClear: true,
        inputValue: "",
      },
    },
  },
  methods: {
    searchInput() {
      console.log(233);
      wx.navigateTo({
        url: "../../Pages/search/search",
      });
    },
    clearInput() {},
  },
});
