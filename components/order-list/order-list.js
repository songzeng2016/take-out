// components/order-list/order-list.js
const {
  orderStatus
} = require('../../common/js/config.js');

const orderStatusDesc = {
  [orderStatus.waitPay]: '待支付',
  [orderStatus.delivery]: '配送中',
  [orderStatus.completed]: '已完成',
  [orderStatus.uncompleted]: '未完成',
}

const orderButtonDesc = {
  [orderStatus.waitPay]: '支付',
  [orderStatus.delivery]: '查看详情',
  [orderStatus.completed]: '意见反馈',
  [orderStatus.uncompleted]: '售后进度',
}

Component({

  behaviors: [],

  // 属性定义（详情参见下文）
  properties: {
    order: { // 属性名
      type: Object,
      value: {}
    },
    type: String, // 简化的定义方式
  },

  data: { // 私有数据，可用于模板渲染
    orderStatusDesc,
    orderButtonDesc,
  }, 

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () { },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  methods: {
    onMyButtonTap: function () {
      this.setData({
        // 更新属性和数据的方法与更新页面数据的方法类似
      })
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      })
    },
    _propertyChange: function (newVal, oldVal) {

    }
  }

})