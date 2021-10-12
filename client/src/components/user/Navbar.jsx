import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { setLogout } from '../../redux/actions/auth'

const Navbar = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }
    
    return (
        <div className="bg-teal-400 text-white flex flex-row justify-between box-border py-4 px-10">
            <div>

            </div>
            <div className="flex gap-6 font-semibold text-lg">
                <Link to="/user/dashboard">
                    <div>
                        Dasboard
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
    )
}

export default Navbar
