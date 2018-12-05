import React,{Component} from 'react'

class TodoInput extends Component{
    render(){
        return(
            <input type='text' value={this.props.content}
            onKeyPress={this.submit.bind(this)}
            onChange={this.changeTitle.bind(this)}
            placeholder='在此输入'/>
        )
    }
    submit(e){
        if(e.key ==='Enter'){
            this.props.onSubmit(e)       
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}

export default TodoInput