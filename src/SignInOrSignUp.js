import React, { Component } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class SignInOrSignUp extends Component{
    constructor(){
        super()
        this.state={
            selected:'signIn'
        }
    }
    toggle(e) {
        this.setState({
            selected: e.target.value
        })
    }
    render(){
        return(
            <div className="signInOrSignUp">
                <h1>Welcome</h1>
                <div className="formWrapper">
                    {this.state.selected === 'signIn' 
                    ? <SignInForm formData={this.props.formData}
                    onSubmit={this.props.onSignIn.bind(this)}
                    onChange={this.props.onChange.bind(this)}
                    onClick={this.props.onClick.bind(this)}/>
                    : <SignUpForm formData={this.props.formData}
                    onSubmit={this.props.onSignUp.bind(this)}
                    onChange={this.props.onChange.bind(this)}/>}
                </div>
                <footer className='clearfix'>
                    <button value='signUp'
                        onClick={this.toggle.bind(this)}>注册</button>
                    <button value='signIn'
                        onClick={this.toggle.bind(this)}>登录</button>
                </footer>
            </div>
        )
    }
}