import React, { Component } from 'react'
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import { getCurrentUser, signOut,TodoModel } from './leanCloud';

class App extends Component {
    constructor() {
        super()
        this.state = {
            user: getCurrentUser()||{},
            newTodo: '',
            todoList: []
        }
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                this.setState(stateCopy)
            })
        }
    }
    render() {
        let todos = this.state.todoList
            .filter((item) => !item.deleted)
            .map((item, index) => {
                return <TodoItem todo={item} key={index}
                    onToggle={this.toggle.bind(this)}
                    onDelete={this.delete.bind(this)} />
            })
        return (
            <div className='App'>
                <h1>Todos
                {this.state.user.id ?
                        <button onClick={this.onSignOut.bind(this)}>登出</button> : null}</h1>
                <div className="inputWrapper">
                    <TodoInput content={this.state.newTodo}
                        onSubmit={this.addTodo.bind(this)}
                        onChange={(this.changeTitle.bind(this))} />
                </div>
                <ol>
                    {todos}
                </ol>
                {this.state.user.id ? null : <UserDialog
                    onSignUp={this.onSignUpOrSignIn.bind(this)}
                    onSignIn={this.onSignUpOrSignIn.bind(this)} />}
            </div>
        )
    }

    onSignUpOrSignIn(user) {
        // this.state.user = user
        // this.setState(this.state)
        //直接修改会报错
        // let stateCopy = JSON.parse(JSON.stringify(this.state))
        // stateCopy.user = user//没有刷新todoList
        // this.setState(stateCopy)
        if (user) {
            TodoModel.getByUser(user, (todos) => {
                let stateCopy = JSON.parse(JSON.stringify(this.state))
                stateCopy.todoList = todos
                stateCopy.user = user
                this.setState(stateCopy)
            })
        }
    }
    onSignOut() {
        signOut()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
    }
    delete(event, todo) {
        TodoModel.destory(todo.id, () => {
            todo.deleted = true
            this.setState(this.state)
        })
    }
    toggle(e, todo) {
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo,()=>{
            this.setState(this.state)
        },(error)=>{
            todo.status = oldStatus
            this.setState(this.state)
        })
    }
    addTodo(event) {
        let newTodo = {
            title : event.target.value,
            status:'',
            deleted:false
        }
        TodoModel.create(newTodo,(id)=>{
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                newTodo:'',
                todoList:this.state.todoList
            })
        },(error) => {
            console.log(error)
        })
    }
    changeTitle(event) {
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }
}

export default App