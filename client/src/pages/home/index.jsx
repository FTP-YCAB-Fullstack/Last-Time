import React from 'react'
import Navbar from '../../components/home/Navbar'
import Banner from '../../components/home/Banner'
import About from '../../components/home/About'
import Footer from '../../components/home/Footer'

const index = () => {
    return (
        <div className="pt-14">
            <Navbar />
            <Banner />
            <About />
            <Footer />
        </div>
    )
}

export default index
