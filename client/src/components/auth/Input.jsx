import React from 'react'

const Input = ({name , type}) => {
    return (
        <input className="border-2 border-gray-200 block mt-2" name={name} type={type} />
    )
}

export default Input
