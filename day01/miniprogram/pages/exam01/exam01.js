// pages/exam01/exam01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        name:"小明",
        list:[],
        sta:0
  },
     tiao(){
       //新的组件出现，先卸载再跳转  关闭再跳转
        wx.redirectTo({
          url: '/pages/exam02/exam02?name=dignding&uid=10',//一定要加/号才有用哦
        })
     },
     xqing(e){
        //新的组件出现，保留上一页面跳转
        
        wx.navigateTo({
          url:`/pages/exam03/exam03?movieid=${e.target.dataset.movieid}`,//一定要加/号才有用哦
        })
     
     },
  /**
   * 生命周期函数--监听页面加载
   */
    loadmore(){
      wx.showLoading({
        title:'加载中'
      })
      //调云函数  movielist2
      wx.cloud.callFunction({
        name: "movielist2",
        data: {
          start: this.data.list.length,
          count: 10
        }
      }).then(res => {
        // console.log(res.result);
        let obj = JSON.parse(res.result);
       // console.log(obj.subjects);
        this.setData({
          list:this.data.list.concat(obj.subjects)
        })
        wx.hideLoading();
      }).catch(err => {
        wx.hideLoading();
        console.log(err)
      })
        //将云函数返回电影列表保存
        //显示当前组件
    },

  onLoad: function (options) {
       this.loadmore();
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
      console.log("显示组件")
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log("隐藏组件")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
        console.log("卸载组件")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
        console.log("用户下拉更新数据");
       
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
          console.log("用户上拉下一页多点数据才行");
        this.loadmore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})