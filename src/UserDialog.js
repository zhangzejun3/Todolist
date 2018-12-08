import React, { Component } from 'react'
import './UserDialog.css'
import {signUp,signIn} from './leanCloud'

class UserDialog extends Component {
    constructor() {
        super()
        this.state = {
            selected: 'signUp',
            formData:{
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
            switch(error.code){
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
                alert('找不到用户')
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
        let {username,password} = this.state.formData
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
                case 204:
                alert('没有提供邮箱')
                break
                case 201:
                alert('密码为空')
                break
                case 200:
                alert('用户名为空')
                break
                default:
                alert(error)
                break
            }
        }
        signUp(username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    render() {
        let signUpForm = (<form className='signUp' onSubmit={this.signUp.bind(this)}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={this.state.formData.username}
                onChange={this.changeFormData.bind(this,'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={this.state.formData.password}
                onChange={this.changeFormData.bind(this,'password')}/>
            </div>
            <div className="row actions">
                <button type='submit'>注册</button>
            </div>
        </form>)

        let signInForm = (<form className='signIn' onSubmit={this.signIn.bind(this)}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={this.state.formData.username}
                onChange={this.changeFormData.bind(this,'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={this.state.formData.password}
                onChange={this.changeFormData.bind(this,'password')}/>
            </div>
            <div className="row actions">
                <button type='submit'>登录</button>
            </div>
        </form>)

        return (
            <div className="UserDialogWrapper">
                <div className="UserDialog">
                    <nav>
                        <label><input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}  
                            onChange={this.toggle.bind(this)}/>注册</label>
                        <label><input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'} 
                            onChange={this.toggle.bind(this)}/>登录</label>
                    </nav>
                    <div className="formWrapper">
                        {this.state.selected === 'signIn' ? signInForm : signUpForm}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDialog