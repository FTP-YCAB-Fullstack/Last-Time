import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLogout } from '../../redux/actions/auth'
import { useHistory } from 'react-router'

const Menu = ({text , to}) => {
    return (
        <Link to={to}>
            <div className="hover:text-teal-500 hover:bg-gray-100 dark:hover:bg-gray-800 py-4 text-lg px-8 font-semibold transition duration-200">
                {text}
            </div>
        </Link>
    )
}


const BtnSidebar = ({status ,toggle}) => {
    return (
        <div>
            <button onClick={() => toggle()} className="dark:text-white bg-white text-gray-500 hover:bg-gray-200 dark:bg-gray-500 flex md:hidden flex-row items-center justify-center fixed top-6 right-6 z-50 p-2 rounded-full shadow-md  hover:shadow-lg  dark:hover:bg-gray-600 transition duration-200">
                {
                    status ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    :   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                }
            </button>
        </div>
    )
}


const Sidebar = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [toggleSidebar, setToggleSidebar] = useState(false)

    const toggle = () => {
        setToggleSidebar(!toggleSidebar)
    }
    
    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }
    return (
        <>
            <BtnSidebar status={toggleSidebar} toggle={toggle} />
            <aside className={(!toggleSidebar ? "-translate-x-full md:translate-x-0" : "translate-x-0")+" transform w-full transition duration-500 md:w-1/4 h-screen gap-2 fixed text-gray-600 dark:text-gray-200  shadow-lgbg-gray-50 bg-gray-50 shadow-md dark:bg-gray-700  z-40 divide-y-4"}>
                <div className="text-center py-5">
                    <h3 className="text-3xl font-black tracking-wider">Tiv Ash</h3>
                    <h5>Kreatif dengan Sampah</h5>
                </div>
                <div className="flex flex-col ">
                    <Menu to="/admin/dashboard" text="Dashboard" />
                    <Menu to="/admin/users" text="Pengguna" />
                    <Menu to="/admin/pickups" text="Angkut Sampah" />
                    <div onClick={handleLogout} className="hover:text-red-500 light:hover:bg-gray-100 dark:hover:bg-gray-800 py-4 text-lg px-8 font-semibold transition duration-200 cursor-pointer">
                        Logout
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
