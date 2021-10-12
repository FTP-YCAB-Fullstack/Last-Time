import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLogout } from '../../redux/actions/auth'
import { useHistory } from 'react-router'

const Menu = ({text , to}) => {
    return (
        <Link to={to}>
            <div className="hover:bg-teal-300 py-4 text-lg px-8 font-semibold transition duration-200">
                {text}
            </div>
        </Link>
    )
}


const Sidebar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }
    return (
        <div className="md:w-1/4 h-screen bg-teal-400 gap-2 fixed text-white  z-40 divide-y-4">
            <div className="text-center py-5">
                <h3 className="text-3xl font-black tracking-wider">Tiv Ash</h3>
                <h5>Kreatif dengan Sampah</h5>
            </div>
            <div className="flex flex-col ">
                <Menu to="/admin/dashboard" text="Dashboard" />
                <Menu to="/admin/users" text="Pengguna" />
                <Menu to="/admin/pickups" text="Angkut Sampah" />
                <div onClick={handleLogout} className="hover:bg-teal-300 py-4 text-lg px-8 font-semibold transition duration-200 text-red-400 cursor-pointer">
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Sidebar
