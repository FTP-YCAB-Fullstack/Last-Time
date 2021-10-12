import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import ContainerCardDashboard from '../../components/admin/ContainerCardDashboard'
import TablePickups from '../../components/admin/TablePickups'
import { fetchListOffices } from '../../redux/actions/offices'

const Pickups = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchListOffices())
    }, [])
    
    // data for card dashboard
    const {transactions} = useSelector(state => state.adminCount)
    let {waiting, process, done} = transactions

    // data for table
    const {lists} = useSelector(state => state.offices)

    return (
        <div>
            <ContainerCardDashboard>
                <CardDashboard number={waiting} text="Menunggu" />
                <CardDashboard number={process} text="Proses" />
                <CardDashboard number={done} text="Selesai" />
            </ContainerCardDashboard>
            <TablePickups data={lists} />
        </div>
    )
}

export default Pickups
