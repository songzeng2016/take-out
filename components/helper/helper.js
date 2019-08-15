Component({
  methods: {
    feedback: function() {
      wx.navigateTo({
        url: '/pages/feedback/feedback',
      });
    },
    makePhoneCall: function() {
      wx.makePhoneCall({
        phoneNumber: '17521123721',
      });
    },
  },
});