import React, { Component } from 'react'
import './App.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

class App extends Component {
    constructor() {
        super()
        this.state = {
            newTodo: 'test',
            todoList: [
                { id: 1, title: '第1个待办' },
                { id: 2, title: '第2个待办' },
                { id: 3, title: '第3个待办' }
            ]
        }
    }
    render() {
        let todos = this.state.todoList.map((item, index) => {
            return <TodoItem todo={item}/>
        })
        return (
            <div className='App'>
                <h1>我的待办</h1>
                <div className="inputWrapper">
                <TodoInput content={this.state.newTodo}/>
                </div>
                <ol>
                    {todos}
                </ol>
            </div>
        )
    }
}

export default App