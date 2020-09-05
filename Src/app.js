// 加载计时
const loadTime = {
  totalTime: Date.now(),
  isFirstLoad: true,
};

import base from "/main.js"; // 导入基础模块
const { httpRequest, appApi, logger, tool, globalEnum, version } = base;

var networkType = "",
  appOptions = {};

App({
  // 启动时执行
  onLaunch: function (options) {
    appOptions = options; // 小程序启动时接收的参数
    this.overShare();
    if (options.query.hasOwnProperty("scene")) {
      switch (options.scene) {
        //扫描小程序码
        case 1047:
          this.systemData.code = options.query.scene;
          break;
        //长按图片识别小程序码
        case 1048:
          this.systemData.code = options.query.scene;
          break;
        //手机相册选取小程序码
        case 1049:
          this.systemData.code = options.query.scene;
          break;
        //直接进入小程序
        case 1001:
          this.systemData.spid = options.query.scene;
          break;
      }
    }
    wx.getNetworkType({
      // 获取网络状态信息
      success: function (res) {
        networkType = res.networkType;
      },
    });

    wx.onNetworkStatusChange(function (res) {
      // 监听网络状态
      networkType = res.isConnected ? res.networkType : "未打开网络";
    });
  },
  onShow: function () {
    version.upgradeApp(); // 检查更新

    wx.getSystemInfo({
      // 检查微信版本
      success: function (res) {
        console.log("系统信息", res);

        // 检测微信版本是否低于目标版本
        version.checkVersion(res.version, "7.0.4", () => {
          wx.clearStorageSync();
        });
      },
    });

    if (loadTime.isFirstLoad) {
      loadTime.isFirstLoad = false;
      console.log(
        "启动加载耗时：",
        ((Date.now() - loadTime.totalTime) * 1.0) / 1000
      );
    }
  },
  systemData: {
    // 全局数据
    spid: 0,
    code: 0,
    appLoadTime: loadTime,
    getAppOptions: function () {
      return appOptions;
    },
  },
  getLoginInfo: function () {
    // 获取本地存储的登录信息
    let loginInfo = wx.getStorageSync(globalEnum.storageKeys.loginInfo);
    if (loginInfo) {
      return loginInfo;
    } else {
      wx.showModal({
        title: "提示",
        content: "您尚未登录或登录信息已过期，请重新登录",
        showCancel: false,
        success: function () {
          wx.clearStorageSync();
          wx.reLaunch({
            url: "/Pages/login/login",
          });
        },
      });
      return "";
    }
  },
  //重写分享方法
  overShare: function () {
    //监听路由切换
    //间接实现全局设置分享内容
    wx.onAppRoute(function (res) {
      //获取加载的页面
      let pages = getCurrentPages(),
        //获取当前页面的对象
        view = pages[pages.length - 1],
        data;
      if (view) {
        data = view.data;
        console.log("是否重写分享方法", data.isOverShare);
        if (!data.isOverShare) {
          data.isOverShare = true;
          view.onShareAppMessage = function () {
            //你的分享配置
            return {
              title: "盲订商城",
              path: "/pages/index/index",
            };
          };
        }
      }
    });
  },
  onError: function (err) {
    // 监听错误
    if (logger) {
      logger.log("小程序逻辑层发生异常", err);
    } else {
      console.log(
        "小程序逻辑层发生异常----时间：" +
          tool.sampleFormatTime(new Date(Date.now())) +
          "-----异常信息：",
        err
      );
    }

    var curPages = getCurrentPages();
    var errorDetail = {};
    var errLength = err.split("\n").length;

    for (var i = 2; i < errLength; i++) {
      errorDetail[i - 1] = err.split("\n")[i];
    }

    // 上报错误信息
    // httpRequest.post(appApi.apis.ReportError, {
    //    loginInfo: this.globalData.loginInfo,
    //    error: {
    //       errorMessage: err.split('\n')[0],
    //       description: err.split('\n')[1],
    //       detail: errorDetail
    //    },
    //    errorData: wx.getStorageSync(feiCheEnum.constValue.errData) || '',
    //    currentPage: {
    //       route: curPages[curPages.length - 1] ? curPages[curPages.length - 1].route : '',
    //       options: curPages[curPages.length - 1].options,
    //       data: curPages[curPages.length - 1].data
    //    },
    //    breadcrumb: {
    //       time: tool.sampleFormatTime(new Date(Date.now())),
    //       belong: "Page",
    //       route: curPages[curPages.length - 1].route,
    //       options: curPages[curPages.length - 1].options
    //    },
    //    networkType: networkType,
    //    systemInfo: wx.getSystemInfoSync()
    // });
  },
});
