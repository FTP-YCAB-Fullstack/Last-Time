import React from 'react'

const Container = ({children}) => {
    return (
        <div className="bg-gray-100 w-3/4 h-screen overflow-auto fixed right-0 box-border p-10">
            {children}
        </div>
    )
}

export default Container
