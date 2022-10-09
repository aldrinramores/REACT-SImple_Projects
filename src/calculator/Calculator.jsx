import { Link } from 'react-router-dom'
import React, { useReducer } from 'react'
import DigitButtons from './DigitButtons.jsx'
import OperationButton from './OperationButton.jsx'

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

      else if (typeaction.digit == "." && state.currentOperand.includes(".")) {
        return state
      }
      else if (state.currentOperand == "0" && typeaction.digit.includes("0")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${typeaction.digit}`
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
        currentOperand: evaluateState(state)
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

  const [{prevOperand, currentOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div>
      <div>Prev:{prevOperand}{operation}</div>
      <div>Curr:{currentOperand}</div>
        <div>
        <DigitButtons dispatch={dispatch} digit = "7"/>
          <DigitButtons dispatch={dispatch} digit = "8"/>
          <DigitButtons dispatch={dispatch} digit = "9"/>
          <DigitButtons dispatch={dispatch} digit = "4"/>
          <DigitButtons dispatch={dispatch} digit = "5"/>
          <DigitButtons dispatch={dispatch} digit = "6"/>
          <DigitButtons dispatch={dispatch} digit = "1"/>
          <DigitButtons dispatch={dispatch} digit = "2"/>
          <DigitButtons dispatch={dispatch} digit = "3"/>
          <DigitButtons dispatch={dispatch} digit = "0"/>
          <DigitButtons dispatch={dispatch} digit = "."/>

          <OperationButton dispatch={dispatch} operation = "*"/>
          <OperationButton dispatch={dispatch} operation = "-"/>
          <OperationButton dispatch={dispatch} operation = "+"/>
          <OperationButton dispatch={dispatch} operation = "/"/>

          <button onClick={() => dispatch({action: ACTIONS.EVALUATE})} > = </button>
          <button onClick={() => dispatch({action: ACTIONS.CLEAR})} > AC </button>
          <button onClick={() => dispatch({action: ACTIONS.BACKSPACE})} > C </button>
        </div>
        <Link to={"/"}>Back</Link>
    </div>
  )
}

export default Calculator