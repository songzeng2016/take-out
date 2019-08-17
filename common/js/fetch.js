const _url = 'https://api.yogorobot.com';

const app = getApp();
// const HOST = 'http://10.242.181.111:8000';
const HOST = 'https://api.yogorobot.com';

/**
 * wx.request 封装
 * @param {String} url 请求地址
 * @param {String} method 请求方法
 * @param {Object} data 请求参数
 * return Promise
 * **/
function request(url, method, data = {}) {
  const header = {};
  const token = app.globalData.userToken || wx.getStorageSync('user_token')
  if (method === 'GET') {
    header['content-type'] = 'application/x-www-form-urlencoded';
  }
  if (token) {
    header['Grpc-Metadata-X-Token'] = token
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
      header,
      method,
      data,
      success(res) {
        resolve(res);
      },
      fail(err) {
        console.log(err);
        reject();
      },
    });
  });
}

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
 **/
function userLogin(data) {
  return new Promise((resolve, reject) => {
    request('/user/login/wechat/mini', 'POST', data)
      .then(res => {
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
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}

/**
 * 订单查询接口  GET /orders?status_codes=string&limit=i32&offset=i32
 * @query_params:
 {
   "status_codes": string,
   "building_id": ,
   "receiver_phone": ,
   "receiver_phone_tail": ,
   "limit": ,
   "offset":
 }
 **/
function queryOrders(data) {
  return request('/orders/by_sender?' + data, 'GET');
}

/**
 * 查询机器人待支付订单接口  GET /orders/waiting_payment/<robot_id>
 **/
function getPayment(meteor) {
  const urlMap = {
    'r': '/orders/waiting_payment/',
    's': '/orders/waiting_payment/station/'
  }
  const meteorType = meteor[0]
  const url = urlMap[meteorType] + meteor.substr(1)

  return request(url, 'GET')
}

/**
 * 预支付接口  PUT /pre_pay
 * @param {Object} data 例如:
 {
   "device_type": 设备类型, DEVICE_TYPE_ROBOT
   "device_id": int,  机器人ID，如1
 }
 **/
function prePay(data) {
  const urlMap = {
    'DEVICE_TYPE_ROBOT': '/prepay',
    's': '/pre_pay/station'
  }
  const keyMap = {
    'DEVICE_TYPE_ROBOT': 'device_id',
    's': 'station_id'
  }
  return request(urlMap[data.device_type], 'PUT', data)
}

// 意见反馈
function feedback(content) {
  return new Promise(resolve => {
    resolve()
  })
}

//
function postRecord() {
  return request('/record', 'POST');
}

//
function putRecord() {
  return new Promise(resolve => {
    resolve()
  })
}

module.exports = {
  userLogin,
  queryOrders,
  getPayment,
  prePay,
  feedback,
  postRecord,
  putRecord,
}