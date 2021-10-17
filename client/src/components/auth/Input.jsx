import React from 'react'

const Input = (props) => {
    const {name , type="text"} = props
    return (
        // <input className="border-2 border-gray-200 block mt-2" name={name} type={type} />
        <input {...props} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" name={name} type={type}/>
    )
}

export default Input
