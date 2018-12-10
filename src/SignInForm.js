import React from 'react'

export default function (props){
    return(
        <form className='signIn' onSubmit={props.onSubmit.bind(this)}>
        <div className="row">
            <input placeholder='用户名' type="text" value={props.formData.username}
            onChange={props.onChange.bind(this,'username')}/>
        </div>
        <div className="row">
            <input placeholder='密码' type="password" value={props.formData.password}
            onChange={props.onChange.bind(this,'password')}/>
        </div>
        <div className="row actions">
            <button type='submit'>登录</button>
            <div className="forgetPasswordWrapper clearfix">
            <a href="#" onClick={props.onClick.bind(this)}>忘记密码</a>
            </div>
        </div>
    </form>
    )
    
}