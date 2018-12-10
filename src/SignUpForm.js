import React from 'react'

export default function(props){
    return(
        <form className='signUp' onSubmit={props.onSubmit.bind(this)}>
        <div className="row">
            <input placeholder='邮箱' type="text" 
            value={props.formData.email}
            onChange={props.onChange.bind(this,'email')}/>
        </div>
        <div className="row">
            <input placeholder='用户名' type="text" 
            value={props.formData.username}
            onChange={props.onChange.bind(this,'username')}/>
        </div>
        <div className="row">
            <input  placeholder='密码' type="password" 
            value={props.formData.password}
            onChange={props.onChange.bind(this,'password')}/>
        </div>
        <div className="row actions">
            <button type='submit'>注册</button>
        </div>
    </form>
    )
    
}