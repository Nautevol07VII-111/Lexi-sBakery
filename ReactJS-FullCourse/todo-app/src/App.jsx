import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import  { useState, useEffect } from 'react'

function App() {
  // const todos = [
  //   { input: 'Hello! Please Add your first Todo!', complete: true },
  //   { input: 'Get groceries!', complete: false },
  //   { input: 'Respond to emails.', complete: false },
  //   { input: 'Call grandma!', complete: true },
  // ]

  const [todos, setTodos] = useState([
    { input: 'Hello! Please Add your first Todo!', complete: true },
    { input: 'Get groceries!', complete: false },
    { input: 'Respond to emails.', complete: false },
    { input: 'Call grandma!', complete: true },
  ])
  const [selectedTab, setSelectedTab] = useState('Open')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
      //CRUD action: update/edit/modify
      let newTodoList = [...todos] //created duplicate array(listOfTodos)
      let completedTodo = todos[index] //accessed todos we're completing and then modify completion status
      completedTodo['complete'] = true //we update the modified status in new list
      newTodoList[index] = completedTodo //Saves entry to new list
      setTodos[newTodoList] //overrides state to match new list we just created
      handleSaveData(newTodoList)
  }
//Below we've defined a handler function for deleteTodo because this is where I'm handling states, we then passed that function down into the todo-list (the return @ the bottom)
  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currentTodos) {
    localStorage.setItem('todo-app',JSON.stringify ({ todos:currentTodos }))
  } //Stringifies todoList & saves (ensures data persistence)

  useEffect(() => { 
  if(!localStorage || localStorage.getItem('todo-app')) { return } 
  let db = JSON.parse(localStorage.getItem('todo-app'))
  setTodos(db.todos)
 },[])




  return (
    //the empty tags that are wrapping the components below are what's called a react fragment
    <>
      
        <Header todos={todos}/>
        < Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos}/>
        < TodoInput handleAddTodo={handleAddTodo}/>
        < TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}/>

    </>
    //In the fragment above we added an attribute style prop which enables us to pass information from the todos array to the specified components.
  )
}

export default App
