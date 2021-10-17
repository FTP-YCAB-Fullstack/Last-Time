import React from 'react'

const ContainerCardDashboard = (props) => {
    let {children} = props
    return (
        <div {...props} className="flex flex-col w-full gap-4 md:gap-8">
            {children}
        </div>
    )
}

export default ContainerCardDashboard
