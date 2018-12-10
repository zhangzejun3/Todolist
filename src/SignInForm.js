import React, { Component } from 'react'

export default class SignInForm extends Component{
    render(){
        return(
            <form className='signIn' onSubmit={this.props.onSubmit.bind(this)}>
            <div className="row">
                <input placeholder='用户名' type="text" value={this.props.formData.username}
                onChange={this.props.onChange.bind(this,'username')}/>
            </div>
            <div className="row">
                <input placeholder='密码' type="password" value={this.props.formData.password}
                onChange={this.props.onChange.bind(this,'password')}/>
            </div>
            <div className="row actions">
                <button type='submit'>登录</button>
                <div className="forgetPasswordWrapper clearfix">
                <a href="#" onClick={this.props.onClick.bind(this)}>忘记密码</a>
                </div>
            </div>
        </form>
        )
    }
}