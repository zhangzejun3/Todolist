import React, { Component } from 'react'
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser} from './leanCloud';

class App extends Component {
    constructor() {
        super()
        this.state = {
            user:getCurrentUser||{},
            newTodo: '',
            todoList: []
        }
    }
    componentDidUpdate(){
    }
    render() {
        let todos = this.state.todoList
        .filter((item)=>!item.deleted)
        .map((item, index) => {
            return <TodoItem todo={item} key={index}
            onToggle={this.toggle.bind(this)}
            onDelete={this.delete.bind(this)}/>
        })
        return (
            <div className='App'>
                <h1>{this.state.user.username||''}Todos</h1>
                <div className="inputWrapper">
                <TodoInput content={this.state.newTodo}
                onSubmit={this.addTodo.bind(this)}
                onChange={(this.changeTitle.bind(this))}/>
                </div>
                <ol>
                    {todos}
                </ol>
                {this.state.user.id?null:<UserDialog 
                onSignUp={this.onSignUp.bind(this)}
                onSignIn={this.onSignIn.bind(this)}/>}
            </div>
        )
    }
    onSignUp(user){
        // this.state.user = user
        // this.setState(this.state)
        //直接修改会报错
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }
    onSignIn(user){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
    }
    delete(event,todo){
        todo.deleted = true
        this.setState(this.state)
    }
    toggle(e,todo){
        todo.status = todo.status==='completed'?'':'completed'
        this.setState(this.state)
    }
    addTodo(event){
        let todoList = this.state.todoList
        todoList.push({
            id:idMaker(),
            title:event.target.value,
            status:null,
            deleted:false
        })
        this.setState({
            newTodo:'',
            todoList:todoList
        })
        console.log(todoList[todoList.length-1].title)
    }
    changeTitle(event){
        this.setState({
            newTodo:event.target.value,
            todoList:this.state.todoList
        })
    }
}
let id = 0
function idMaker(){
    id += 1
    return id
}

export default App