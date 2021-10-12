import React from 'react'
import {Link} from 'react-router-dom'

const CardDashboard = (props) => {
    let {text ,color="teal" , to="#"} = props 
    return (
        <div className="md:w-1/3">
            <Link to={to}>
                <div {...props} className={`bg-${color}-300 text-white rounded p-8 `}>
                    <h3 className="text-2xl font-bold">{text}</h3>
                </div>
            </Link>
        </div>
    )
}

export default CardDashboard
