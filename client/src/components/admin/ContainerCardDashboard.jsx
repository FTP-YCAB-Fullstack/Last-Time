import React from 'react'

const ContainerCardDashboard = (props) => {
    let {children} = props
    return (
        <div {...props} className="flex flex-col md:flex-row w-full gap-8 my-8">
            {children}
        </div>
    )
}

export default ContainerCardDashboard
