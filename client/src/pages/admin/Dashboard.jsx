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
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10 w-full">
            <div className="md:w-2/3">
                <TablePickups data={lists} />
            </div>
            <div className="md:w-1/3">
                <ContainerCardDashboard>
                    <CardDashboard color="red" number={totalUsers} text="Pengguna" />
                    <CardDashboard icon="trash" number={0} text="Sampah Disetor" />
                </ContainerCardDashboard>
            </div>
        </div>
    )
}

export default Dashboard
