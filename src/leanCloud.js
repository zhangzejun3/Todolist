import AV from 'leancloud-storage'

var APP_ID = 'rrfsGl7WT9nC6eSI9EsKgf98-gzGzoHsz';
var APP_KEY = 'zoP5Iwsm3ugh9FwLRhweO8jq';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV
export function signUp(email,username,password,successFn,errorFn){
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username||'');
  // 设置密码
  user.setPassword(password||'');
  // 设置邮箱
  user.setEmail(email||'');
  user.signUp().then(function (loggedInUser) {
    let user = getUserFormAVUser(loggedInUser)
    successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  });
  return undefined
}
export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username, password).then(function (loggedInUser) {
    let user = getUserFormAVUser(loggedInUser)
    successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  });
}
export function signOut(){
  AV.User.logOut()
  return undefined
}
export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFormAVUser(user)
  }else{
    return null
  }
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function (success) {
    alert('发送成功')
    successFn.call()
  }, function (error) {
    console.log(error.code)
    switch(error.code){
      case 1:
      alert('请不要往同一个邮件地址发送太多邮件')
      break
      case 204:
      alert('没有提供电子邮箱地址')
      break
      case 204:
      alert('找不到电子邮箱地址对应的用户')
      break
    }
    errorFn.call(null,error)
  });
}

function getUserFormAVUser(AVUser){
  return {
    id : AVUser.id,
    ...AVUser.attributes

  }
}