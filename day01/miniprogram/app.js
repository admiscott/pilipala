//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,//默认的
        env:'web-wutest01-wzivk'//配置自动生成的环境id手动写
      })
    }

    this.globalData = {}
  }
})


















