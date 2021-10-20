import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect , Route } from 'react-router'

const PublicRoute = (props) => {
    const auth = useSelector(state => state.auth)
    const fromHome = localStorage.getItem('status-from-home')
    const path = localStorage.getItem('pathname')

    
    return auth.status ?
            fromHome === 'false' ? <Redirect to={path} /> :
            auth.role === "admin" ?
                <Redirect to="/admin/dashboard" />
                : <Redirect to="/user/dashboard" />
            : <Route {...props}>{props.children}</Route>
}

export default PublicRoute
