import React, { Component } from 'react'
import './UserDialog.css'
import SignInOrSignUp from './SignInOrSignUp'
import ForgetPasswordForm from './ForgetPasswordForm'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'
import JSONParseAndStringify from './JSONParseAndStringify'

class UserDialog extends Component {
    constructor() {
        super()
        this.state = {
            selectedTab:'signInOrSignUp',
            formData:{
                email:'',
                username:'',
                password:''
            }
        }
    }
    signIn(e){
        e.preventDefault()
        let {username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignIn.call(null,user)
        }
        let error = (error)=>{
            switch (error.code) {
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('找不到用户')
                    break
                default:
                    alert(error)
                    break
            }
        }
        let usernameLength = username.trim().length
        let passwordLength = password.trim().length
        if (username === '') {
            alert('用户名为空')
        } else if (password === '') {
            alert('密码为空')
        } else if (usernameLength <= 3) {
            alert('用户名必须大于三个字符')
        } else if (passwordLength < 6) {
            alert('密码必须不小于6个字符')
        } else {
            signIn(username, password, success, error)
        }
    }
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error = (error)=>{
            switch(error.code){
                case 202:
                alert('用户名已被占用')
                break
                case 203:
                alert('邮箱已被占用')
                break
                case 125:
                alert('电子邮箱地址无效')
                break
                default:
                alert(error)
                break
            }
        }
        let usernameLength = username.trim().length
        let passwordLength = password.trim().length
        if(email===''){
            alert('邮箱为空')
        }else if(username===''){
            alert('用户名为空')
        }else if(password===''){
            alert('密码为空')
        }else if (usernameLength<=3){
            alert('用户名必须大于三个字符')
        }else if(passwordLength<6){
            alert('密码必须不小于6个字符')
        }else{
            signUp(email, username, password, success, error)
        }
    }
    changeFormData(key,e){
        let stateCopy = JSONParseAndStringify(this.state)
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        return (
            <div className="UserDialogWrapper">
                <div className="UserDialog">
                    {this.state.selectedTab==='signInOrSignUp'
                    ?<SignInOrSignUp formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onClick={this.showForgetPassword.bind(this)}/>
                    :<ForgetPasswordForm formData={this.state.formData}
                    onSubmit={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onClick={this.returnToSignIn.bind(this)}/>}
                </div>
            </div>
        )
    }
    showForgetPassword(){
        let stateCopy = JSONParseAndStringify(this.state)
        stateCopy.selectedTab = 'forgetPassword'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        let email = this.state.formData.email
        let reg = new RegExp(/@/)
        if(email===''){
            alert('邮箱为空')            
        }else if(email.match(reg)){
        sendPasswordResetEmail(email)
        }else{
            alert('邮箱地址无效')
        }
    }
    returnToSignIn(e){
        e.preventDefault()
        let stateCopy = JSONParseAndStringify(this.state)
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
}

export default UserDialog