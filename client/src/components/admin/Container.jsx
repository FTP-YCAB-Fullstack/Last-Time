import React from 'react'

const Container = ({children}) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 w-screen md:w-3/4 h-screen overflow-auto fixed right-0 box-border p-4 md:p-10">
            {children}
        </div>
    )
}

export default Container
