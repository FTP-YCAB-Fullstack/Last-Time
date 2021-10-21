import React from 'react'
import {useDispatch} from 'react-redux'

const Container = ({children}) => {
    const dispatch = useDispatch()
    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget
        if(scrollTop + clientHeight === scrollHeight ) {
            dispatch({type: "INCREASE_PAGE"})
        }
    }
    return (
        <div onScroll={handleScroll} className="bg-gray-100 dark:bg-gray-800 w-screen md:w-3/4 h-screen overflow-auto fixed right-0 box-border p-4 md:p-10">
            {children}
        </div>
    )
}

export default Container
