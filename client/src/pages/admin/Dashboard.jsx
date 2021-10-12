import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import ContainerCardDashboard from '../../components/admin/ContainerCardDashboard'
import TablePickups from '../../components/admin/TablePickups'
import { fetchListOffices } from '../../redux/actions/offices'

const Dashboard = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchListOffices())
    }, [])

    // data for card dashboard
    const {users} = useSelector(state => state.adminCount)
    let {members,pickupers} = users
    let totalUsers = members+ pickupers

    // data for table
    const {lists} = useSelector(state => state.offices)
    
    return (
        <div>
            <ContainerCardDashboard>
                <CardDashboard color="red" number={totalUsers} text="Total Pengguna" />
                <CardDashboard number={0} text="Total Sampah Disetor" />
            </ContainerCardDashboard>
            <TablePickups data={lists} />
        </div>
    )
}

export default Dashboard
