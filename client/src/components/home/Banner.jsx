import React from 'react'
import illustration from '../../assests/banner-illustration.svg'

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row items-center gap-6 w-5/6 md:w-3/4 mx-auto py-10 md:py-20">
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-xl md:text-4xl font-black mb-4">Pilah Sampah Jadi Mudah</h1>
                <p className="text-sm md:text-base">Sekarang, kamu bisa memilah sampah dengan mudah tanpa perlu berpikir panjang. Coba sekarang dengan menggunakan fitur yang tersedia di aplikasi kami.</p>
                <a href={process.env.REACT_APP_CLASIFIER} rel="noreferrer" target="_blank" className="py-2 inline-block my-4 px-6 rounded-md text-white font-semibold bg-teal-400 dark:bg-teal-600 hover:bg-teal-500 transition duration-200">Pilah</a>
            </div>
            <div className="w-full md:w-1/2">
                <img src={illustration} className="w-full" alt="banner illustration" />
            </div>
        </div>
    )
}

export default Banner
