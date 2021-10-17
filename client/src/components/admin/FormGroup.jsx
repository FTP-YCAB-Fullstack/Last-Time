import React from 'react'
import {useForm} from 'react-hook-form'

const FormGroup = ({label , register , errors , name , type="text"}) => {
    return (
        <div className="my-4">
            <label className="block mb-2">{label}</label>
            <input className="focus:ring-4 w-full focus:outline-none dark:bg-gray-700 ring-teal-300 dark:ring-teal-600 py-2 px-6 rounded shadow-sm" {...register(name)} type={type} />
            <small  className="error text-red-400 font-bold">{errors[name]?.message}</small>
        </div>
    )
}

export default FormGroup