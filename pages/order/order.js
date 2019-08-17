// pages/order/order.js

const fetch = require('../../common/js/fetch.js');
const {
  orderStatus
} = require('../../common/js/config.js');

const orderList = [{
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.delivery,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.uncompleted,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.uncompleted,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.uncompleted,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.completed,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.completed,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: orderStatus.waitPay,
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
    phone: '13668080000',
  },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    orderList,
    offset: 0,
    limit: 20,
    hasMore: true,
  },

  switchTab(e) {
    const tabIndex = e.currentTarget.dataset.index;
    this.setData({
      tabIndex,
    });

    this.data.offset = 0;
    this.queryOrders();
  },

  navToDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.queryOrders();
  },

  queryOrders() {
    const {offset, limit} = this.data;
    let query;
    if (this.data.tabIndex === 0) {
      query = 'status_codes=20&status_codes=30&status_codes=80';
    } else {
      query = 'status_codes=20';
    }
    query += `&offset=${offset}&limit=${limit}`
    fetch.queryOrders(query)
      .then(res => {
        console.log(res.data)
        this.setData({
          hasMore: res.data.count > (offset + 1) * limit
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
    if (!this.data.hasMore) {
      return;
    }
    this.data.offset += 1;
    this.queryOrders();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})