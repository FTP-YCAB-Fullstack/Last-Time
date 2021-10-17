import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserRoute = (props) => {
    const auth = useSelector(state => state.auth)
    return auth.status ? 
            auth.role === "user" ?
                <Route {...props}>{props.children}</Route>
            : <Redirect to="/forbidden" />
        :
        <Redirect to="/auth/login" />
}

export default UserRoute
