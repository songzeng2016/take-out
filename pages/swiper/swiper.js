// pages/swiper/swiper.js

const tabs = [
  {
    index: 0,
    text: 'tab-a',
    active: true,
    loaded: true,
  },
  {
    index: 1,
    text: 'tab-b',
    active: false,
    loaded: false,
  },
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs,
    currentIndex: 0,
  },

  switchTab(e) {
    const {index} = e.target.dataset;

    this.setData({
      currentIndex: index,
    });
  },

  swiperChange(e) {
    console.log(e)
    const {current, source} = e.detail;

    if (!this.data.tabs[current].loaded) {
      wx.showLoading({
        title: 'loading...',
      })

      setTimeout(() => {
        wx.hideLoading()
      }, 1000)
    }

    const tabs = this.data.tabs.map(tab => {
      return {
        ...tab,
        active: tab.index === current,
        loaded: tab.loaded || tab.index === current,
      };
    });

    this.setData({
      tabs,
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
    console.log('pull down refresh')
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
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