import React from 'react'
import RBButton from 'react-bootstrap/Button';
import './styles.css'
export function Button(props) {
  return (
    <RBButton className={`custom-button ${props.classes}`} {...props} />
  )
}

