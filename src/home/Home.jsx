import React from 'react'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt';
import palindromeGIF from '../gif/palindrome.gif'
import todoGIF from '../gif/todoGIF.gif'
import quoteGIF from '../gif/quoteGIF.gif'
import calculatorGIF from '../gif/calculatorvid.gif'

const home = () => {
  return (
    <div className='overflow-hidden scroll-smooth'>
    <h1 className='text-center text-4xl md:text-6xl pt-40 pb-20 px-2  syncopate'>React Simple Projects</h1>
    
    <div className="grid items-center text-white grid-cols-1 md:grid-cols-2 mx-auto text-center max-w-6xl poppins text-xl  gap-10 content-center pb-20 ">
    
    <Link to={"/palindrome"}>
      <Tilt className="Tilt" gyroscope={true}>
        <div className='bg-green-900 mx-auto  h-[90%] w-[90%]  '>
          <img src={palindromeGIF} />
        </div>
      </Tilt>
    </Link>

    <Link to={"/to-do"}>
      <Tilt className="Tilt" gyroscope={true}>
        <div className='bg-green-900 mx-auto h-[90%] w-[90%] '>
        <img src={todoGIF} />
        </div>
      </Tilt>
    </Link>

    <Link to={"/quote"}>
      <Tilt className="Tilt" gyroscope={true}>
        <div className='bg-green-900 mx-auto h-[90%] w-[90%] '>
        <img src={quoteGIF} />
        </div>
      </Tilt>
    </Link>
    
    <Link to={"/calculator"}>
      <Tilt className="Tilt" gyroscope={true}>
        <div className='bg-green-900 mx-auto h-[90%] w-[90%] '>
        <img src={calculatorGIF} />
        </div>
      </Tilt>
    </Link>
    </div>
 
    </div>
  )
}

export default home