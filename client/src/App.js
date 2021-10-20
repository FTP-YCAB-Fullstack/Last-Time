import React, { useEffect } from 'react'
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Home from './pages/home'
import User from './pages/user'
import Admin from './pages/admin'
import Auth from './pages/auth'
import AdminRoute from './utils/AdminRoute'
import PublicRoute from './utils/PublicRoute'
import UserRoute from './utils/UserRoute'
import { useDispatch } from 'react-redux'
import { setLogin } from './redux/actions/auth'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
      let authLocal = JSON.parse(localStorage.getItem("tivash-user"))
      if(authLocal && authLocal.status) {
        dispatch(setLogin(authLocal))
      }
  }, [])
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute path="/auth" component={Auth} />
        <AdminRoute path="/admin" component={Admin} />
        <UserRoute path="/user" component={User} />
      </Switch> 
    </Router>
  )
}

export default App;
