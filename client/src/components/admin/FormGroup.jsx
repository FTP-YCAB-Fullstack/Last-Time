import React from 'react'

const FormGroup = ({label , name , type="text"}) => {
    return (
        <div className="my-4">
            <label className="block mb-2">{label}</label>
            <input className="focus:ring-4 w-full focus:outline-none ring-teal-300 py-2 px-6 rounded shadow-sm" name={name} type={type} />
        </div>
    )
}

export default FormGroup