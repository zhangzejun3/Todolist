import React, { Component } from 'react'

export default class ForgetPasswordForm extends Component{
    render(){
        return(
            <div className="forgetPassword">
                <h3>重置密码</h3>
                <form className="forgetPasswordForm" onSubmit={this.props.onSubmit.bind(this)}>
                    <div className="row">
                        <input type="text" value={this.props.formData.email}
                            placeholder='邮箱'
                            onChange={this.props.onChange.bind(this, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type='submit'>发送重置邮件</button>
                        <a href="#" onClick={this.props.onClick.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}