import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


const Todo = () => {
  
  const [input, setinput] = useState("")
  const [todos, setTodos] = useState([])
  const [updId, setUpdId] = useState(null)
  const [editing , setEditing] = useState("")

  // SAVE LOCAL
  useEffect(()=>{
    const temp = localStorage.getItem("todos")
    const loadTodo = JSON.parse(temp)

    if(loadTodo){
      setTodos(loadTodo)
    }
  },[])
  useEffect(()=>{
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos",temp)
  },[todos])
  
  // ADD TASK
  const handleSubmit = (e) => {
    e.preventDefault()
    setTodos([...todos].concat({id:uuidv4(), title: input, completed: false}))
    setinput("")
    console.log(todos)
  }

  // CHECK TASK
  const handleCheck = (id) => {
    setTodos(todos.map((todo)=> {
      if (todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    }))
  }

  // DEL TASK
  const handleDelete = (id) =>{
    setTodos(todos.filter((todo)=> todo.id !== id))
  }

  // UPD TASK
  const handleUpdate = (id) => {
    
    if (editing == "") {
      let inputErr = document.getElementById("inputErr")
      inputErr.innerHTML = " Provide task please"
    } else {
      setTodos(todos.map((todo) => {
        if (todo.id === id) {
          todo.title = editing
        }
        return todo
        
      }))
      setUpdId(null)
      setEditing("")
    }
    
  }

  return (
    <div>
      <h1>TO-DO APP</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange = {(e) => setinput(e.target.value)} required/>
        <button>Add</button>
      </form>

      {/* LIST */}
      {todos.map((todo) =>
      <div key={todo.id}>

        {/* SHOW LIST */}
        {updId === todo.id ? (<input type="text" placeholder={todo.title} onChange={(e) => setEditing(e.target.value)} />) : (<div>{todo.title}</div>)}  

       

        {/* EDIT / SUBMIT */}
        {updId === todo.id ? (<div><button onClick={() => handleUpdate(todo.id)}>Update</button><span id='inputErr'></span></div>):(<div> {/* CHECK TASK */}
        <input type="checkbox" id="" onChange={() => handleCheck(todo.id) } />
        {/* DELETE TASK */}
        <button onClick = {() => handleDelete(todo.id)}>Delete</button><button onClick={() => setUpdId(todo.id)}>Edit</button></div>)} 

        
       
      </div>
      )}

    <Link to={"/"}>Back</Link>
    </div>
  )

}

export default Todo