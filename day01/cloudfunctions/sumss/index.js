/*// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}*/

//第一个云函数 完成二个函数和  i  j 相加
//event  用户传的参数
//context   当前用户的信息
//async   异步，当前函数异步执行
exports.main=async(event,context)=>{
    return {
      sumss:event.i+event.j
    }
}







































