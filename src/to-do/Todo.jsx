import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import AOS from 'aos'
import 'aos/dist/aos.css'
import {RiEditFill,RiDeleteBin7Fill} from 'react-icons/ri'
import {BsArrowRightCircleFill} from 'react-icons/bs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  
  const [input, setinput] = useState("")
  const [todos, setTodos] = useState([])
  const [updId, setUpdId] = useState(null)
  const [editing , setEditing] = useState("")

  // TOASTIFY
  const updateValidation = () => {
    toast.error('Update Failed: Provide an Input', {
      position: "top-center",
      className:"drop-shadow-xl",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  const taskAdded = () => {
    toast.success(`${input} Task Added! `, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  // SAVE LOCAL
  useEffect(()=>{
    const temp = localStorage.getItem("todos")
    const loadTodo = JSON.parse(temp)
    AOS.init();
    AOS.refresh();
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
    taskAdded()
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
      updateValidation()
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
    
    <div className='overflow-hidden relative' data-aos ="fade-in-zoom" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
    <ToastContainer className="poppins"  />
      <h1 className='text-center absolute top-0 left-0 right-0 mx-auto text-white text-4xl md:text-6xl main_title p-5  bg-[#fd5308]'>TO - DO APP</h1>

    <div className="max-w-sm text-center mx-auto mt-60 md:mt-72 drop-shadow-2xl ">
         {/* FORM */}
      <form className='mx-5 bg-slate-200 rounded-lg' onSubmit={handleSubmit}>
        <div className="flex items-center justify-around gap-1">
          <input type="text" className='shadow-lg-inner poppins text-slate-900 bg-transparent  w-full px-4 py-2 focus:outline-none' value={input} onChange = {(e) => setinput(e.target.value)}  maxLength={18} required/>
          <button className='px-4 py-2 poppins bg-orange-600 shadow-lg  hover:outline-2 hover:outline transition-all hover:outline-offset-2 outline-orange-600 drop-shadow rounded-r-lg text-slate-200'>Add</button>
        </div>
       
      </form>

      {/* LIST */}
      {todos.map((todo) =>
      <div className='mt-1  flex items-center justify-between bg-white p-2 rounded-lg mx-5' key={todo.id}>        
      {/* SHOW LIST */}
        {updId === todo.id ? (<input type="text" className='poppins text-gray-600 focus:outline-none' maxLength={25} placeholder={todo.title} onChange={(e) => setEditing(e.target.value)} required />) : (<div className={`poppins  text-gray-600 ${todo.completed === true ? "line-through italic" : "no-underline"}`} >{todo.title}</div>)}  
        {/* EDIT / SUBMIT */}
        {updId === todo.id ? (<div><button className='text-green-600  text-2xl poppins ' onClick={() => handleUpdate(todo.id)}><BsArrowRightCircleFill/></button></div>):(<div> {/* CHECK TASK */}
        <input type="checkbox" className='outline-2 outline-green-500' onChange={() => handleCheck(todo.id) } />
        {/* DELETE TASK */}
        <button className='text-red-500 px-1' onClick = {() => handleDelete(todo.id)}><RiDeleteBin7Fill/></button><button onClick={() => setUpdId(todo.id)} className="text-teal-500 px-1"><RiEditFill/></button></div>)} 
        
      </div>

    
      )}

      </div>
     
 
    </div>
  )

}

export default Todo