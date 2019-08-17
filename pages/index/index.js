//index.js
//获取应用实例
const app = getApp()
const fetch = require('../../common/js/fetch.js')

Page({
  data: {
    scene: null,
  },
  onLoad: function(options) {
    if (options.scene) {
      const scene = decodeURIComponent(options.scene)
      console.log('扫码传参：' + scene);
      this.data.scene = scene;
    }
    // TODO: 判断是否为扫码进入支付页面
    const user_token = wx.getStorageSync('user_token')
    if (user_token) {
      app.globalData.userToken = user_token
      this.navTo()
      return
    }
    this.login()
  },
  /*
   * 微信登陆，授权 userInfo 走全量
   * 未授权 userInfo 只传 code
   */
  login() {
    const that = this
    wx.login({
      success(res) {
        const code = res.code
        if (res.code) {
          wx.getUserInfo({
            success(res) {
              const userInfo = res.userInfo
              app.globalData.userInfo = userInfo
              that.requestLogin({
                code: code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                gender: userInfo.gender,
                nickName: userInfo.nickName
              })
            },
            fail() {
              that.requestLogin({
                code
              })
            }
          })
        }
      }
    })
  },
  requestLogin(data) {
    fetch.userLogin(data)
      .then(() => {
        this.navTo()
      })
      .catch(() => {
        console.log('error')
      })
  },
  navTo() {
    // TODO: 判断是否为扫码进入支付页面
    if (this.data.scene) {
      wx.redirectTo({
        url: '/pages/payment/payment?meteor=' + this.data.scene,
      })
    } else {
      wx.switchTab({
        url: '/pages/order/order',
      })
    }
  }
})