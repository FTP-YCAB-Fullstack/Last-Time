import React, { useEffect } from 'react'
import Navbar from '../../components/home/Navbar'
import Banner from '../../components/home/Banner'
import About from '../../components/home/About'
import Footer from '../../components/home/Footer'
import Service from '../../components/home/Service'
import { useDispatch } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "FROM_HOME_TRUE" })
        dispatch({type: "SET_PATH" , payload: {path: "/"}})
    }, [])

    return (
        <div className="pt-14 dark:bg-gray-800 text-gray-600 dark:text-gray-100">
            <Navbar />
            <Banner />
            <About />
            <Service />
            <Footer />
        </div>
    )
}

export default Home
