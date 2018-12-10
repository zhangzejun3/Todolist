import React, { Component } from 'react'
import './UserDialog.css'
import SignUpForm from './SignUpForm'
import {signUp,signIn,sendPasswordResetEmail} from './leanCloud'

class UserDialog extends Component {
    constructor() {
        super()
        this.state = {
            selected: 'signIn',
            selectedTab:'signInOrSignUp',
            formData:{
                email:'',
                username:'',
                password:''
            }
        }
    }
    toggle(e) {
        this.setState({
            selected: e.target.value
        })
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
                case 201:
                    alert('密码为空')
                    break
                case 200:
                    alert('用户名为空')
                    break
                case 211:
                    alert('请输入正确的用户名和密码')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username,password,success,error)
    }
    signUp(e){
        e.preventDefault()
        let {email,username,password} = this.state.formData
        let success = (user)=>{
            this.props.onSignUp.call(null,user)
        }
        let error = (error)=>{
            if(username===''){
                alert('用户名为空')
            }else if(password===''){
                alert('密码为空')
            }
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
        signUp(email,username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {

        let signInForm = (<form className='signIn' onSubmit={this.signIn.bind(this)}>
            <div className="row">
                <input placeholder='用户名' type="text" value={this.state.formData.username}
                onChange={this.changeFormData.bind(this,'username')}/>
            </div>
            <div className="row">
                <input placeholder='密码' type="password" value={this.state.formData.password}
                onChange={this.changeFormData.bind(this,'password')}/>
            </div>
            <div className="row actions">
                <button type='submit'>登录</button>
                <div className="forgetPasswordWrapper clearfix">
                <a href="#" onClick={this.showForgetPassword.bind(this)}>忘记密码</a>
                </div>
            </div>
        </form>)

        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <h1>Welcome</h1>
                <div className="formWrapper">
                    {this.state.selected === 'signIn' ? signInForm 
                    : <SignUpForm formData={this.state.formData}
                    onSubmit={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}/>}
                </div>
                <footer className='clearfix'>
                    <button value='signUp'
                        onClick={this.toggle.bind(this)}>注册</button>
                    <button value='signIn'
                        onClick={this.toggle.bind(this)}>登录</button>
                </footer>
            </div>
        )
        let forgetPassword = (
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form className="forgetPassword" onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <input type="text" value={this.state.formData.email}
                            placeholder='邮箱'
                            onChange={this.changeFormData.bind(this, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type='submit'>发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>
        )

        return (
            <div className="UserDialogWrapper">
                <div className="UserDialog">
                    {this.state.selectedTab==='signInOrSignUp'
                    ?signInOrSignUp:forgetPassword}
                </div>
            </div>
        )
    }
    showForgetPassword(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'forgetPassword'
        this.setState(stateCopy)
    }
    resetPassword(e){
        e.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }
    returnToSignIn(e){
        e.preventDefault()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
}

export default UserDialog