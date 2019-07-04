// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[{//标记点
      iconPath:"/images/kefuf.gif",
      id:0,
      latitude:'39.916085',
      longitude:'116.300901',
      width:20,
      height:30
    }],
    polyline:[{//路线
      points:[
        {longitude:'116.300901',latitude:'39.916085'},
        {longitude:'116.316696',latitude:'39.913509'}
      ],
      color:"#FF00DD",//线的颜色
      width:10,
      dottedLine:true
    }],
      controls:[{//引入图标的样式
          id:1,
          iconPath:'/images/01.png',
          position:{
            left:50,
            top:150,
            width:20,
            height:20
          }
      }]
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