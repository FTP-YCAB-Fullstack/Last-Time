import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="bg-teal-400 shadow-lg fixed top-0 w-screen text-white flex flex-row justify-between box-border py-4 px-10">
            <div>

            </div>
            <div className="flex gap-6 font-semibold text-lg">
                <Link to="/auth/login">
                    <span>
                        Login
                    </span>
                </Link>
                <Link to="/auth/register">
                    <span>
                        Register
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
