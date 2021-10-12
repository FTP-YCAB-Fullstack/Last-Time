import React from 'react'

const FormSearch = (props) => {
    return (
        <input {...props} placeholder="Cari..." className="bg-white my-3 focus:outline-none focus:ring-4 focus:bg-teal-50 py-2 px-6 rounded-md shadow-md" />
    )
}

export default FormSearch
