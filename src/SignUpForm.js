import React, { Component } from 'react'

export default class SignUpForm extends Component{
    render(){
        return(
            <form className='signUp' onSubmit={this.props.onSubmit.bind(this)}>
            <div className="row">
                <input placeholder='邮箱' type="text" 
                value={this.props.formData.email}
                onChange={this.props.onChange.bind(this,'email')}/>
            </div>
            <div className="row">
                <input placeholder='用户名' type="text" 
                value={this.props.formData.username}
                onChange={this.props.onChange.bind(this,'username')}/>
            </div>
            <div className="row">
                <input  placeholder='密码' type="password" 
                value={this.props.formData.password}
                onChange={this.props.onChange.bind(this,'password')}/>
            </div>
            <div className="row actions">
                <button type='submit'>注册</button>
            </div>
        </form>
        )
    }
}