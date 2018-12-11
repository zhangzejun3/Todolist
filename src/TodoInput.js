import React,{Component} from 'react'

class TodoInput extends Component{
    componentDidMount(){
        this.input.focus()
    }
    componentDidUpdate(){
        this.input.focus()
    }
    render(){
        return(
            <input type='text' value={this.props.content}
            onKeyPress={this.submit.bind(this)}
            onChange={this.changeTitle.bind(this)}
            ref={(input)=>{this.input = input}}
            placeholder='在此输入'/>
        )
    }
    submit(e){
        if(e.key ==='Enter'){
            if(e.target.value.trim()!==''){
                this.props.onSubmit(e) 
            }      
        }
    }
    changeTitle(e){
        this.props.onChange(e)
    }
}

export default TodoInput