import React from 'react'

const CardDashboard = (props) => {
    let {number , text , color="teal"} = props
    return (
        <div {...props} className={`md:w-1/3 bg-${color}-300 text-white rounded p-8 `}>
            <h1 className="text-4xl font-semibold">{number}</h1>
            <h4 className="text-2xl font-bold">{text}</h4>
        </div>
    )
}

export default CardDashboard
