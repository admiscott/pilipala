// pages/mymovie/mymovie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        content:'',
        image:{},
  },
  //输入框，保存内容
  onContentChange(e){
      console.log(e.detail)
      this.setData({
        content:e.detail
      });
  },
  upload(){
       wx.chooseImage({
         count:1,
         sizeType:["original","compressed"],
         sourceType:["album","camera"],
         success:res=>{
           let file=res.tempFilePaths[0];
           console.log(file);
           this.setData({
             image:file,
           })
         },
       })
  },
  submit(){
     wx.showLoading({
       title: '提交中',
     })
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