/*
 * @Author: your name
 * @Date: 2020-07-13 17:02:33
 * @LastEditTime: 2020-09-01 14:17:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mdshop_mini/Src/Apis/Domain.js
 */
// 生产环境
const proDomains = {
  // api域名
  a: "",
  // 静态文件域名
  s: "http://111.198.29.215:8081/",
  // 文件上传域名
  f: "http://111.198.29.215:8082",
};

// 测试环境
const testDomains = {
  // api域名
  a: "",
  // 静态文件域名
  s: "http://111.198.29.215:8081/",
  // 文件上传域名
  f: "http://111.198.29.215:8082",
};

// 开发环境
const devDomains = {
  // api域名
  a: "",
  // 静态文件域名
  s: "http://111.198.29.215:8081/",
  // 文件上传域名
  f: "http://111.198.29.215:8082",
};

let domains = null;

if (wx.app_env.isProduction) {
  domains = proDomains;
} else if (wx.app_env.isTest) {
  domains = testDomains;
} else if (wx.app_env.isDevelop) {
  domains = devDomains;
}

domains = (({ a = "", s = "", f = "" } = {}) => ({
  // api域名
  apiDomain: a,
  // 静态文件域名
  staticDomain: s,
  // 文件上传域名
  fileUploadDoamin: f,
}))(domains);

module.exports = domains;
