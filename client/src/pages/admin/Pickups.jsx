import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import ContainerCardDashboard from '../../components/admin/ContainerCardDashboard'
import TablePickups from '../../components/admin/TablePickups'
import { fetchListOffices } from '../../redux/actions/offices'
import { Switch , Route } from 'react-router'
import DetailOffice from './DetailOffice'

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
        <div className="flex flex-col-reverse md:flex-row gap-10">
            <div className="md:w-2/3">
                <Switch>
                    <Route path="/admin/pickups" exact>
                        <TablePickups data={lists} />
                    </Route>
                    <Route path="/admin/pickups/detail">
                        <DetailOffice />
                    </Route>
                </Switch>
            </div>
            <div className="md:w-1/3">
                <ContainerCardDashboard>
                    <CardDashboard number={waiting} text="Menunggu" />
                    <CardDashboard number={process} text="Proses" />
                    <CardDashboard number={done} text="Selesai" />
                </ContainerCardDashboard>
            </div>
        </div>
    )
}

export default Pickups
