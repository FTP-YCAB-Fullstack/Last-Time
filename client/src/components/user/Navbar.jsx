import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { setLogout } from '../../redux/actions/auth'

const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>,
    truck: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>,
    gallery: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>,
    cart: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>,
    logout: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
}

const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }
    
    return (
        <>
            <div className="bg-teal-400 dark:bg-teal-800 shadow-md text-white hidden md:flex flex-row justify-between box-border py-4 px-10">
                <div>
                </div>
                <div className="flex gap-6 font-semibold text-lg">
                    <Link to="/user/dashboard">
                        <div>
                            Dashboard
                        </div>
                    </Link>
                    <Link to="/user/pickup">
                        <div>
                            Angkut
                        </div>
                    </Link>
                    <Link to="/user/exhibition">
                        <div>
                            Pameran
                        </div>
                    </Link>
                    <Link to="/user/store">
                        <div>
                            Toko
                        </div>
                    </Link>
                    <div className="cursor-pointer text-red-400" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            </div>
            <div className="bg-teal-400 dark:bg-teal-800 z-50 shadow-md text-teal-100 md:hidden flex flex-row justify-around py-2 fixed bottom-0 w-screen">
                <Link to="/user/dashboard">
                    <div className="flex flex-col items-center hover:opacity-60 transition duration-200">
                            <div className="h-7 flex items-center">
                                {icons['dashboard']}
                            </div>
                            <small className="text-xs">Home</small>
                    </div>
                </Link>
                <Link to="/user/pickup">
                    <div className="flex flex-col items-center hover:opacity-60 transition duration-200">
                        <div className="h-7 flex items-center">
                            {icons['truck']}
                        </div>
                        <small className="text-xs">Angkut</small>
                    </div>
                </Link>
                <Link to="/user/exhibition" >
                    <div className="flex flex-col items-center hover:opacity-60 transition duration-200">
                        <div className="h-7 flex items-center">
                            {icons['gallery']}
                        </div>
                        <small className="text-xs">Pameran</small>
                    </div>
                </Link>
                <Link to="/user/store" >
                    <div className="flex flex-col items-center hover:opacity-60 transition duration-200">
                        <div className="h-7 flex items-center">
                            {icons['cart']}
                        </div>
                        <small className="text-xs">Toko</small>
                    </div>
                </Link>
                <div className="flex flex-col items-center cursor-pointer hover:opacity-60 transition duration-200 text-red-300" onClick={handleLogout}> 
                    <div className="h-7 flex items-center">
                        {icons['logout']}
                    </div>
                    <small className="text-xs">Keluar</small>
                </div>
            </div>
        </>
    )
}

export default Navbar
