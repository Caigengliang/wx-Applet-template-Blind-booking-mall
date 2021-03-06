/**
 * 日期时间格式化
 * @params {string|Date} date 标准日期时间字符串或Date对象
 * @params {string} fmt 日期时间格式
 */
const dateTimeFormate = (date, fmt) => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return fmt;
};

/**
 * 时间日期简单格式化 yyyy/MM/dd hh:mm:ss
 * @params {Date|string} date Date对象或标准日期时间字符串
 * @params {string} connector 年月日间的连接符，默认为“/”
 */
const sampleFormatTime = (date, connector = "/") => {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join(connector) +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

module.exports = {
  dateTimeFormate,
  sampleFormatTime,
};
