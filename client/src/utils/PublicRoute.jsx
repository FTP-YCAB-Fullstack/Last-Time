import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect , Route } from 'react-router'

const PublicRoute = (props) => {
    const auth = useSelector(state => state.auth)
    return auth.status ?
            auth.role === "admin" ?
                <Redirect to="/admin/dashboard" />
                : <Redirect to="/user/dashboard" />
            : <Route {...props}>{props.children}</Route>
}

export default PublicRoute
