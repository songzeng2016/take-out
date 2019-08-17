// pages/payment/payment.js
const fetch = require('../../common/js/fetch.js');
const {
  orderStatus
} = require('../../common/js/config.js');

const orderList = [{
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '宏慧 有个机器人 2F',
    phone: '13668080000',
    price: '0.2',
  },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    meteor: 'r1',
    orderList,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    this.data.meteor = options.meteor;
    fetch.getPayment('r1')
      .then(res => {
        console.log(res.data)
      })
    // this.payment();
    // this.postRecord();
  },

  submit() {
    if (this.data.orderList.length) {
      this.payment();
    } else {
      this.putRecord();
    }
  },

  postRecord() {
    fetch.postRecord();
  },

  putRecord() {
    fetch.putRecord()
      .then(res => {
        wx.switchTab({
          url: '/pages/order/order',
        })
      });
  },

  payment() {
    const payData = {
      device_id: parseInt(this.data.meteor.substr(1), 10),
      device_type: 'DEVICE_TYPE_ROBOT',
    }

    fetch.prePay(payData)
      .then(res => {
        const param = JSON.parse(res.pay_param);
        wx.requestPayment({
          ...param,
          success: function(res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000,
            })
            if (res.errMsg === 'requestPayment:ok') {
              wx.reLaunch({
                url: '/pages/index/index',
              });
              wx.removeStorage({
                key: 'meteor',
                success: function(res) {
                  console.log('meteor存储已移除' + res.data)
                }
              })
            }
          },
          fail: function(res) {
            console.log(res);
            wx.showToast({
              title: '失败支付!' + JSON.stringify(res),
              icon: 'success',
              duration: 2000,
            })
          },
          complete: function() {
            console.log('payment complete');
          }
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})