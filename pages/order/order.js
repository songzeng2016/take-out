// pages/order/order.js
const orderList = [
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: '备货中',
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: '备货中',
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
  },
  {
    id: '',
    time: '2019-08-10 11:00:08',
    status: '备货中',
    address: '亚朵酒店 5F 509',
    content: '谷物水果套餐等 共2件商品',
    code: '3206',
    price: '120.0',
  },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    orderList,
  },

  switchTab(e) {
    const tabIndex = e.currentTarget.dataset.index;
    this.setData({ tabIndex });
  },

  navToDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})