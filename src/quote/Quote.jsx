import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
const Quote = () => {
  
  const quoteApi = "https://type.fit/api/quotes/"
  let random = Math.floor(Math.random()*1643)+1;



  useEffect(()=>{
    fetchData();
  },[])

  const [item, setItem] = useState("")

  const fetchData = () =>{
    axios.get(quoteApi)
    .then(response =>  {
      setItem(response.data[random])
      console.log(item)
    })
  }

  
  const color = ["181818","8758FF","5CB8E4","31E1F7","400D51","FF7777"]
 
  
  const randomData = () =>{
    axios.get(quoteApi)
    .then(response =>  {
      setItem(response.data[random])
      console.log(item)
    })
  }

  

  return (
    
    <div >
    <h1>QUOTE GENERATOR</h1>
    <h3 id='quoteBg'>{item.text}</h3>
    <h3>{item.author}</h3>
    <button onClick={randomData}>New Quote</button>


    <Link to={"/"}>Back</Link>
  
   
    </div>
  )
}

export default Quote