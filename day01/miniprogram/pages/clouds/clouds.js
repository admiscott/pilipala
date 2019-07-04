// pages/clouds/clouds.js
const db=wx.cloud.database({
  env:"web-wutest01-wzivk"//配置环境ID让他找得着环境啊啊啊
});

Page({

  /*
   *
   * 页面的初始数据
   */
  data: {
     list:[],//存查到的数据第2步
     rows:[],
     activeNames: ['1']
  },
  
   onChange(event) {
    this.setData({
      activeNames: event.detail
    })
  },



  tarbaba(){
    wx.switchTab({
      url: '/pages/base/base',
    })
  },
  diao(){
    //新的组件出现，先卸载再跳转
     wx.redirectTo({
       url: '/pages/exam01/exam01?id=118&uname=dingding',//一定要加/号才有用哦
     })
  },
   insert(){
     //两种插入语法
      db.collection("webstu").add({
        data:{
          name:"dingding",
          age:"88"
        },
        success:(res)=>{
          console.log(res);
        },
        fail:(err)=>{
          console.log(err);
        }
      })
        db.collection("webstu").add({
          data:{
            name:"jack",
            age:99
          }
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })

   },
   handleSuma(){//调用云函数
     wx.cloud.callFunction({
       name:"sumss",
       data:{
         i:10,
         j:20
       }
     }).then(res=>{
       console.log(res)
     }).catch(err=>{
       console.log(err)
     })
   },
    handlelogin(){
        wx.cloud.callFunction({
          name:'login'
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
    },
    handleDel(){
      wx.cloud.callFunction({
        name:'batchDelete'
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    upload(){
        //选择图片
        wx.chooseImage({
          count:1,//一次选中几张
          sizeType:["original","compressed"],//原图，压缩
          sourceType:["album","camera"],//相册，相机
          success: function(res) {
            let list=res.tempFilePaths[0];//返回一个数组
            //console.log(list);
            //成功上传图片到数据库中
              wx.cloud.uploadFile({
                cloudPath:new Date().getTime()+".jpg",//新文件路径
                filePath:list,//准备上传文件路径
                success:res=>{
                  console.log(res,fileID);
                }
              })
          },
        })
        //上传图片
    },
    myupload(){
      //选择图片
      wx.chooseImage({
        count:9,
        sizeType:["original","compressed"],
        sourceType:["album","camera"],
        success(res){
          let file=res.tempFilePaths[0];
          //选择成功后上传图片
          wx.cloud.uploadFile({
            cloudPath:new Date().getTime()+".jpg",
            filePath:file,
            success:res=>{
                //将图片的fileID保存到集合中          连续的嵌套
            let fileID=res.fileID;
                 db.collection("myphoto").add({
                   data:{
                     fileID
                   }
                 }).them(res=>{
                   console.log(res);
                 }).catch(err=>{
                    console.log(err)
               })
             }
          })
        }
      })
   },
    myImage(){
        //展示图片
        db.collection("myphoto")//指定集合
        .get()                   //获取查询
        .then(res=>{              //获取成功回调
          console.log(res.data);
          this.setData({
            rows:res.data
          })
        }).catch(err=>{
          console.log(err)
        })
        //查询云数据库集合myphoto
        //获取数组保存
        //在网页显示图片
    },
    getItem(){
       
    },
    deltup(e){
      let _id=e.target.dataset.id;//唯一的方法拿值
      db.collection("myphoto").doc(_id)
      .remove()
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
          console.log(err)
      })
    },
  update(){
    //修改语法
    db.collection("websuer").doc("3b07eb945d020b84008def630d40e9a3").update({
          data:{
            age:66
          }
        }).then(res=>{
          console.log(res);
        }).catch(err=>{
          console.log(err);
        })
  },
  add(){
    db.collection("webstu").add({
      data: {
        name: "tom",
        age: 12,
        clazz:"web"
      }
    
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    db.collection("webstu").add({
      data: {
        name: "jerry",
        age: 18,
        clazz: "php"
      }

    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  upp(){
    db.collection("webstu").doc("94b1e1fc5d0219d60098256e6edf7f47").update({
      data: {
        name:"scokk",
        age: 78
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  del(){
    db.collection("webstu").doc("08560c9e5d021925009690a30952b9ff").remove({//整条都删掉
      data: {
        
        age: 78
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  },
  select(){
      // db.collection("webstu").where({
      //   name:"jerry"//完全一样的记录会只显示一条
      // }).get().then(res=>{
      //   console.log(res)
      // }).catch(err=>{
      //   console.log(err)
      // })

      // db.collection("webstu").get().then(res=>{
      //   console.log(res);
        
      // }).catch(err=>{
      //   console.log(err)
      // })



  },
    deletes(e){//接id回来删此数据第4步
     let _id=e.target.dataset.id;//唯一的方法拿值
      db.collection("webstu").doc(_id).remove().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
  search(){

    db.collection("webstu").get().then(res => {
      console.log(res.data);
      this.setData({//查到数据先保存第1步
          list:res.data
      });
    }).catch(err => {
      console.log(err)
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