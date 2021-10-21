import React from 'react'
import {Switch , Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'


const Auth = () => {
    return (
        <div>
            <Switch>
                <Route path="/auth/login" component={Login} />
                <Route path="/auth/register" component={Register} />
            </Switch>            
        </div>
    )
}

export default Auth
