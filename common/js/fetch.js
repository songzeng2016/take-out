const _url = 'https://api.yogorobot.com';

/**
 * 登录接口  POST /user/login/wechat/mini
 * @param {Object} data 例如:
 {
   "code": string,  调微信wx.login获取到的code
   "encryptedData": string,  调微信 wx.getUserInfo 获取到的res.encryptedData
   "nickName": string,  调微信 wx.getUserInfo 获取到的res.userInfo.nickName
   "gender": i8,  调微信 wx.getUserInfo 获取到的res.userInfo.gender
   "iv": string,  调微信 wx.getUserInfo 获取到的res.iv
 }
 *@param cb 登录成功后的回调
 **/
function userLogin(data, cb) {
  let that = this;
  wx.request({
    url: _url + '/user/login/wechat/mini',
    method: 'POST',
    data,
    success: (res) => {
      const sys = wx.getSystemInfoSync();
      let token = res.header['Grpc-Metadata-X-Token'];
      if (!token) {
        token = res.header['grpc-metadata-x-token'];
      }
      console.log('token获取成功:' + token);
      if (token) {
        /*取token存储到storage, 调用getProfile获取用户信息*/
        app.globalData.userToken = token;
        wx.setStorage({
          key: 'user_token',
          data: token,
        });
        typeof cb === 'function' && cb()
      }
    },
    fail: () => {
      console.error('登录失败');
    },
  })
}

function promise(url, method, data = null) {
  let header = {}
  if (method === 'GET') {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url + url,
      header,
      method,
      data,
      success(res) {
        resolve(res.data)
      },
      fail(error) {
        console.log('fail')
        reject(error)
      }
    })
  })
}

function queryOrders(data, cb) {
  promise('/orders/by_sender?' + data, 'GET')
  .then(res => {
    cb(res)
  })
}

module.exports = {
  userLogin,
  queryOrders,
}