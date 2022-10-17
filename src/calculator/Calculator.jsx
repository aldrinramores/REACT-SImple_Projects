import { Link } from 'react-router-dom'
import React, { useReducer, useEffect } from 'react'
import DigitButtons from './DigitButtons.jsx'
import OperationButton from './OperationButton.jsx'
import AOS from 'aos'
import 'aos/dist/aos.css'




export const ACTIONS = {
  NEW_DIGIT: 'new-digit',
  ADD_OPERATION: 'add-operation',
  EVALUATE: 'evaluate',
  CLEAR: 'clear-state',
  BACKSPACE: 'delete'
}


const reducer = (state, {action, typeaction}) => {

  switch (action) {
    
    // ADDING NEW CURRENT
    case ACTIONS.NEW_DIGIT:

      if (state.overwrite) {
        return{
          ...state,
          overwrite:false,
          currentOperand: typeaction.digit
        }
      }
      if (state.currentOperand == null && typeaction.digit == ".") {
        return state
      }
      
      if (typeaction.digit === "." && state.currentOperand.includes(".")){
        return state
      }
     
      
      if (state.currentOperand == "0" && typeaction.digit.includes("0")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || "" }${typeaction.digit}` 
      }
    
    
    // ADDING OPERATIONS
    case ACTIONS.ADD_OPERATION:

      if (state.currentOperand == null && state.prevOperand == null) { 
        return state
      }

      else if (state.currentOperand == null) {
        return {
          ...state,
          operation: typeaction.operation
        }
      }

      else if (state.prevOperand == null) {
        return {
          ...state, 
          operation: typeaction.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
  
        }
      }
      return {
        ...state, 
        prevOperand: evaluateState(state),
        operation: typeaction.operation, 
        currentOperand: null
      }

    //EVALUATE
    case ACTIONS.EVALUATE:
      if (state.prevOperand == null || state.currentOperand == null || state.operation == null ) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        prevOperand: null,
        operation:null,
        currentOperand:  evaluateState(state)
      }
    
    // CLEAR
    case ACTIONS.CLEAR:
      return {}
    
    // BACKSPACE
    case ACTIONS.BACKSPACE:

      if (state.currentOperand == null) {
        return state
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
  }

} 

const evaluateState = ({prevOperand,currentOperand,operation}) => {
  let prev = parseFloat(prevOperand)
  let curr = parseFloat(currentOperand)
  if(isNaN(prev)||isNaN(curr)) return ""
  if (prevOperand == null || currentOperand == null || operation == null) {
    return ""
  }

  let result = ""

  switch (operation) {
    case "+":
      result = prev + curr
      break
    case "-":
      result = prev - curr
      break
    case "*":
      result = prev * curr
      break
    case "/":
      result = prev + curr
      break  
  }
  return result.toString()
}




const Calculator = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  },[])
  

  const [{prevOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {})
 
  return (
    <div className='overflow-hidden relative' data-aos ="fade-in-zoom" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600">

      <h1 className='text-center absolute top-0 left-0 right-0 mx-auto text-white text-4xl md:text-6xl  main_title p-5 bg-sky-700'>Calculator</h1>

      <div className="max-w-xs  mx-auto mt-40 md:mt-60 px-5  pt-1  ">
        <div className='text-gray-600 text-right text-2xl  rounded-t-md py-2 overflow-hidden bg-black/70 pr-2'>{prevOperand || "0"}{operation}</div>
        <div className='text-white text-4xl text-right py-2 pr-2  bg-black/70 overflow-hidden'>{currentOperand || "0"}</div>
        <div className='text-white grid grid-cols-4 poppins overflow-hidden'>
            <button className='col-span-2 bg-red-900  hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50' onClick={() => dispatch({action: ACTIONS.CLEAR})} > AC </button>
            <button className='hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900' onClick={() => dispatch({action: ACTIONS.BACKSPACE})} > C </button>
            <OperationButton  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-sky-900`}   dispatch={dispatch} operation = "*"/>
            <DigitButtons className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`}  dispatch={dispatch} digit = "7"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "8"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "9"/>
            <OperationButton  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-sky-900`} dispatch={dispatch} operation = "+"/>
            <DigitButtons className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`}  dispatch={dispatch} digit = "4"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "5"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "6"/>
            <OperationButton  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-sky-900`} dispatch={dispatch} operation = "-"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "1"/>
            <DigitButtons  className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "2"/>
            <DigitButtons className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`}  dispatch={dispatch} digit = "3"/>
            <OperationButton className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-sky-900`} dispatch={dispatch} operation = "/"/>
            <DigitButtons className={` col-span-2 p-4  rounded-bl-md hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "0"/>
            <DigitButtons className={`p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900`} dispatch={dispatch} digit = "."/>
            <button className=' col-end p-4 hover:-translate-y-1 transition-all hover:border-b-4 hover hover:border-r-1 hover:border-black/50 bg-slate-900 rounded-br-md' onClick={() => dispatch({action: ACTIONS.EVALUATE})} > = </button>
           
        </div>
      </div>
   
     
    </div>
  )
}

export default Calculator