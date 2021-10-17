import React from 'react'
import {Link} from 'react-router-dom'

const icons = {
    cart: <svg xmlns="http://www.w3.org/2000/svg" className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>,
    truck: <svg xmlns="http://www.w3.org/2000/svg" className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>,
    gallery: <svg xmlns="http://www.w3.org/2000/svg" className="w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>,
}

const CardDashboard = (props) => {
    let {text ,color="teal" , to="#" , icon="gallery"} = props 
    return (
        <div className="md:w-1/3">
            <Link to={to}>
                <div {...props} className={`text-${color}-400 flex flex-row items-center justify-around gap-2 hover:bg-${color}-50 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md transition duration-200 rounded p-8`}>
                    <div className="w-1/3">
                        {icons[icon]}
                    </div>
                    <div className="w-2/3">
                        <h3 className="text-2xl font-bold">{text}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CardDashboard
