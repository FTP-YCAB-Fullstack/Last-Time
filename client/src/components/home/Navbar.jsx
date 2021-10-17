import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="bg-teal-400 dark:bg-teal-700 shadow-lg fixed top-0 w-screen text-white flex flex-row justify-between box-border py-2 md:py-4 px-10">
            <div>

            </div>
            <div className="flex gap-6 font-semibold text-base md:text-lg">
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
