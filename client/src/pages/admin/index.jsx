import React, { useEffect } from 'react'
import {Route , Switch , useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Container from '../../components/admin/Container'
import Sidebar from '../../components/admin/Sidebar'
import Dashboard from './Dashboard'
import Pickups from './Pickups'
import User from './User'
import { fetchTransactionCount, fetchUsersCount } from '../../redux/actions/adminCount'

const Home = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch({type: "FROM_HOME_FALSE"})
        dispatch(fetchUsersCount()) 
        dispatch(fetchTransactionCount())       
    }, [])
    useEffect(() => {
        dispatch({ type: "SET_PATH", payload: { path: history.location.pathname } })
    })
    return (
        <div>
            <Sidebar />
            <Container>
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/users" component={User} />
                    <Route path="/admin/pickups" component={Pickups} />
                </Switch> 
            </Container>
        </div>
    )
}

export default Home
