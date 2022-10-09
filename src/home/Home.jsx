import React from 'react'
import { Link } from 'react-router-dom'
const home = () => {
  return (
    <div>
    <h1>React Projects</h1>
    <Link to={"/palindrome"}><h1>Palindrome</h1></Link>
    <Link to={"/quote"}><h1>Quote Generator</h1></Link>
    <Link to={"/to-do"}><h1>To-Do App</h1></Link>
    <Link to={"/calculator"}><h1>Calculator</h1></Link>
    </div>
  )
}

export default home