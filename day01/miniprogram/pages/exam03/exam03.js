// pages/exam03/exam03.js
const db=wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detail:{},
      content:'',  //评价的内容
      score:4,     //当前默认的分数
      images:[],   //要上传的图片  
      fileids:[],
      movieid:'',
      xianshi:false,
      title:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//首次加载
    wx.setNavigationBarTitle({
      title: '电影祥情模块',
    })
   wx.setNavigationBarColor({
     frontColor:"#000000",
     backgroundColor: '#ff0',
     animation: {
      duration: 1000,
      timingFunc: 'easeIn'
  }
   })
    this.setData({
      movieid:options.movieid,
    })
    wx.showLoading({
      title: '加载中',
    })
        console.log(options.movieid)
        wx.cloud.callFunction({
          name:"getdetail",
          data:{
            movieid:options.movieid
          }
        }).then(res=>{
          wx.hideLoading();
           
          console.log(res);
          this.setData({
            detail:JSON.parse(res.result)
          })
        }).catch(err=>{
          wx.hideLoading();
          console.error(err)
        })
  },
    onContentChange(e){

          this.setData({
              content:e.detail
          })
    },
    onScoreChange(e){
        this.setData({
            score:e.detail
        })
    },
    submit(){
      wx.showLoading({
        title: '评论中',
      });
        console.log(this.data.content,this.data.score);
        //上传图片到云存储
        let promiseArr=[];
        for(let i=0;i<this.data.images.length;i++){
            promiseArr.push(new Promise((reslove,reject)=>{
                let item = this.data.images[i];
                let suffix = /\.\w+$/.exec(item)[0];/*正则表达式，返回文件的扩展名*/
                wx.cloud.uploadFile({
                  cloudPath: new Date().getTime()+suffix,
//cloudPath:new Date().getTime()+Math.floor(Math.random()*9999)+suffix
                  filePath: item, // 文件路径
                  success: res => {
                    // get resource ID
                    console.log(res.fileID)
                    this.setData({
              fileids:this.data.fileids.concat(res.fileID)
                    });
                    reslove();
                  },
                  fail: err => {
                    // handle error
                    console.error(err)
                  }
                })
              }));
            }
      Promise.all(promiseArr).then(res=>{
        //插入数据
        db.collection("xianhuaimg")
        .add({
            data:{
             // content:this.data.content,
             // score:this.data.score,
             // movieid:this.data.movieid,
              fileids:this.data.fileids
            }
        }).then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '评价成功',
          })
        }).catch(err=>{
          wx.hideLoading();
          wx.showToast({
            title: '评论失败',
          })

        })
      })
    },
    uploadImg(){
      //选择图片
      wx.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success:res=>{//改成箭头函数，改变this的指向，否则报错
          // tempFilePath可以作为img标签的src属性显示图片
          //console.log(res)
          const tempFilePaths = res.tempFilePaths
          //console.log(tempFilePaths)
            this.setData({
              images:this.data.images.concat(tempFilePaths),
              xianshi:true,
            })
        }
      })

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