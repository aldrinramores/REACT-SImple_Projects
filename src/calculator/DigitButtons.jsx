
import React from 'react'
import {ACTIONS} from './Calculator'

const DigitButtons = ({dispatch, digit}) => {
  return (
    <button onClick={() => dispatch({action: ACTIONS.NEW_DIGIT, typeaction: {digit}})}>{digit}</button>
  )
}

export default DigitButtons