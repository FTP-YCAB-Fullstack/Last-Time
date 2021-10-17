import React from 'react'

const FormSearch = (props) => {
    return (
        <input {...props} placeholder="Cari..." className="bg-white dark:bg-gray-700 my-3 dark:text-teal-400 focus:outline-none transition duration-200 focus:ring-4 ring-teal-200 dark:ring-teal-800 focus:bg-teal-50 dark:focus:bg-teal-900 py-2 px-6 rounded-md shadow-md" />
    )
}

export default FormSearch
