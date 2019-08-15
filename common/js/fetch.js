const HOST = 'https://api.yogorobot.com';

function promise(url, method, data = null) {
  let header = {}
  if (method === 'GET') {
    header = {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
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
  queryOrders,
}