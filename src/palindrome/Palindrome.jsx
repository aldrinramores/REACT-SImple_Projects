import { Link } from 'react-router-dom'
import { useState,useEffect, React } from 'react';
import { BiChevronLeft } from "react-icons/bi";
import AOS from 'aos';


const Palindrome = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[])

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
    <div className='overflow-hidden relative ' data-aos ="fade-in-zoom" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
    

      <h1 className='text-center absolute top-0 left-0 right-0 mx-auto text-white text-4xl md:text-6xl  main_title p-5 bg-green-700'>Palindrome Checker</h1>

        <div className="max-w-6xl text-center mx-auto mt-60 md:mt-72 ">
        
          <form className=' font-mono flex items-center gap-5 justify-center' onSubmit={handleSubmit}>
            <input className='my-2 focus:outline-none  md:py-2 md:px-5 bg-transparent border-b-4 border-green-900 text-white font-bold text-md md:text-4xl ' type="text" placeholder='Provide a word' id ="userValue"  onChange={handleChange} value={input} maxLength="15"  />
            <button className='submit font-mono text-sm md:text-xl py-2 px-5 bg-green-800 rounded-lg text-white font-bold drop-shadow-xl '>CHECK</button>
          </form>
          <h1 className='text-center text-xl md:text-2xl text-slate-500 font-bold mx-5 font-mono py-10 '>Result:<span id ="result"></span></h1>
        </div>

     
        
    


     
    </div>
  )
}

export default Palindrome