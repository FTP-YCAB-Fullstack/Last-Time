import React from 'react'
import {Switch , Route} from 'react-router-dom'
import Navbar from '../../components/user/Navbar'
import Dashboard from './Dashboard'
import Pickup from './Pickup'

const Container = ({children}) => {
    return (
        <div className="py-10 w-5/6 md:w-4/5 mx-auto">
            {children}
        </div>
    )
}

const User = () => {
    return (
        <div className="bg-gray-50 dark:bg-gray-800 pb-10 text-gray-600 dark:text-gray-300 min-h-screen">
            <Navbar />
            <Container>
                <Switch>
                    <Route path="/user/dashboard" component={Dashboard} />
                    <Route path="/user/pickup" component={Pickup} />
                </Switch>
            </Container>
        </div>
    )
}

export default User
