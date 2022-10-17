import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const Quote = () => {
  
  const quoteApi = "https://type.fit/api/quotes/"
  let random = Math.floor(Math.random()*1643)+1;

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[])


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
    
    <div className='overflow-hidden' data-aos ="fade-in-zoom" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">
        <h1 className='text-center absolute top-0 left-0 right-0 mx-auto text-white text-4xl md:text-6xl main_title p-5 bg-yellow-500' >QUOTE GENERATOR</h1>

        <div className="max-w-2xl text-center mx-auto mt-60 md:mt-72 drop-shadow-2xl ">
          <div className=" bg-slate-200 mx-5 rounded-xl">
            <h3 id='quoteBg' className='font-mono px-5 text-gray-900 text-2xl md:text-4xl pt-20'  >"{item.text}"</h3>
            <div className="flex items-center justify-between text-justify gap-10 p-10">
              <h3 className='font-mono font-bold text-xs whitespace-nowrap md:text-lg ' >- {item.author || "Unknown Author"}</h3>
              <button onClick={randomData} className="bg-yellow-600 p-2 md:p-5 rounded-xl text-white font-mono font-bold text-base drop-shadow-xl md:text-lg whitespace-nowrap">New Quote</button>
            </div>
          </div>
        </div>
   
    </div>
  )
}

export default Quote