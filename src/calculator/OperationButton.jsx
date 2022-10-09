
import React from 'react'
import {ACTIONS} from './Calculator'

const OperationButton = ({dispatch, operation}) => {
  return (
    <button onClick={() => dispatch({action: ACTIONS.ADD_OPERATION, typeaction: {operation}})}>{operation}</button>
  )
}

export default OperationButton