// pages/feedback/feedback.js
const fetch = require('../../common/js/fetch.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submitForm(e) {
    const {
      content
    } = e.detail.value;

    if (!content) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        mask: true,
      })
      return;
    }

    fetch.feedback(content)
      .then(res => {
        wx.showToast({
          title: '感谢反馈',
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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