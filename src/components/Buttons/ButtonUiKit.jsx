import React from 'react'

function ButtonUiKit({ className = '', children, ...rest }) {
  return (
    <button
      className={`${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default ButtonUiKit