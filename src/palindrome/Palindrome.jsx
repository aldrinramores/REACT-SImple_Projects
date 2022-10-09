import { Link } from 'react-router-dom'
import { useState, React } from 'react';

const Palindrome = () => {

  const [input,setInput] = useState("")
  let reversed = ""
  let palinResult = document.getElementById('result')
  let userValue = document.getElementById('userValue')
  const handleChange =(e)=>{
    setInput(e.target.value.replace(/[^a-z]/gi, ''))     
    e.preventDefault()
  }

  

  const handleSubmit =()=> {
    reversed = input.split('').reverse().join('')
    if (userValue.value.length == "") { 
      palinResult.innerHTML = ` Provide an input`
    } else if (input == reversed) {
      palinResult.innerHTML = ` ${input} is a palindrome`
    } else {
      palinResult.innerHTML = ` ${input} is not a palindrome`
    } 
  }
 
  
  return (
    <div>
      <h1>Palindrome Checker</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" id ="userValue"  onChange={handleChange} value={input}  />
          <button type='submit'>Submit</button>
        </form>
      <h1>Result:<span id ="result"></span></h1>


    <Link to={"/"}>Back</Link>
    </div>
  )
}

export default Palindrome