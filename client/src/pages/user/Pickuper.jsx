import React, { useEffect , useState } from 'react'
import {Route, Switch} from 'react-router-dom'
import { useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import axios from '../../axios'
import TablePickupTrash from '../../components/user/TablePickupTrash'
import TableCustomer from '../../components/user/TableCustomer'
import FormDone from '../../components/user/FormDone'
import DetailTransaction from '../../components/user/DetailTransaction'





const Pickuper = () => {
    const auth = useSelector(state => state.auth)
    let token  = auth.token

    const [listenCustomer, setListenCustomer] = useState(0)
    const [doneId, setDoneId] = useState(null)
    
    // data customers & transactions
    const [customers, setCustomers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [count, setCount] = useState(null)
    useEffect(() => {
        (async() => {
            try {
                let {data} = await axios.get(`customers/office` , {headers: {token}})
                setCustomers(data.customers)

                let response = await axios.get(`/transactions/user` , {headers: {token}})
                setTransactions(response.data)

                let statusCount = await axios.get(`/transactions/status/count` , {headers: {token}})
                setCount(statusCount.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [listenCustomer])

    useEffect(() => {
        setListenCustomer(listenCustomer+1)
    } , [doneId])

    
    return (
        <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-10">
            <div className="w-full md:w-1/3">
                {
                    count ?
                        <div className="flex flex-col gap-4 md:gap-6 md:w-3/4 mx-auto">
                            <CardDashboard icon="truck" number={count.waiting} text="Menunggu" />
                            <CardDashboard icon="truck" number={count.process} text="Prosess" />
                            <CardDashboard icon="truck" number={count.done} text="Selesai" />
                        </div>
                    : ""
                }
            </div>

            <div className="md:w-2/3">
                <Switch>
                    <Route path="/user/pickup" exact>
                        {
                            !doneId ? 
                                <>
                                <TableCustomer customers={customers} 
                                                token={token} listenCustomer={listenCustomer} 
                                                setListenCustomer={setListenCustomer} />
                                <TablePickupTrash 
                                    setDoneId={setDoneId}
                                    transactions={transactions} 
                                    token={token} listenCustomer={listenCustomer} 
                                    setListenCustomer={setListenCustomer}/>
                                </>
                            : <FormDone id={doneId} token={token} setDoneId={setDoneId} />
                        }
                    </Route>
                    <Route path="/user/pickup/transaction">
                        <DetailTransaction />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Pickuper
