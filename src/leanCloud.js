import AV from 'leancloud-storage'

var APP_ID = 'rrfsGl7WT9nC6eSI9EsKgf98-gzGzoHsz';
var APP_KEY = 'zoP5Iwsm3ugh9FwLRhweO8jq';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel = {
  getByUser(user, successFn, errorFn) {
    let query = new AV.Query('Todo');
    query.equalTo('deleted',false)
    query.find().then(function (response) {
      let array = response.map((item)=>{
        return {
          id:item.id,
          ...item.attributes
        }
      })
      successFn.call(null,array)
    },(error)=>{
      errorFn&&errorFn.call(null,error)
    })
  },
  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    // 新建对象
    let todo = new Todo();
    // 设置名称
    todo.set('title', title);
    // 设置优先级
    todo.set('status', status);
    todo.set('deleted', deleted);

    // 新建一个 ACL 实例
    let acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(), true);
    acl.setReadAccess(AV.User.current(), true);

    // 将 ACL 实例赋予 Todo 对象
    todo.setACL(acl);

    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error)
    });
  },
  update({ id, title, status, deleted }, successFn, errorFn) {
    // 第一个参数是 className，第二个参数是 objectId
    let todo = AV.Object.createWithoutData('Todo', id);
    // 修改属性
    title!==undefined&&todo.set('title', title)
    status!==undefined&&todo.set('status', status);
    deleted!==undefined&&todo.set('deleted', deleted);
    // 保存到云端
    todo.save().then((response)=>{
      successFn&&successFn.call(null)
    },(error)=>{
      errorFn&&errorFn.call(null,error)
    });

  },
  destory(todoId,successFn,errorFn){
    // let todo = AV.Object.createWithoutData('Todo', todoId);
    // todo.destroy().then(function (success) {
    //   successFn && successFn.call(null)
    //   // 删除成功
    // }, function (error) {
    //   // 删除失败
    //   errorFn && errorFn.call(null, error)
    // });
    TodoModel.update({id:todoId,deleted:true},successFn,errorFn)
  }
}

export function signUp(email,username,password,successFn,errorFn){
  // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.setEmail(email);
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
    return {}
  }
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function () {
    alert('发送成功')
    successFn.call()
  }, function (error) {
    switch (error.code) {
      case 1:
        alert('请不要往同一个邮件地址发送太多邮件')
        break
      case 204:
        alert('没有提供电子邮箱地址')
        break
      case 205:
        alert('找不到电子邮箱地址对应的用户')
        break
      default:
        alert(error)
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