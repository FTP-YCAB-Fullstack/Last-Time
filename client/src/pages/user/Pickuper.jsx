import React, { useEffect , useState } from 'react'
import { useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import axios from '../../axios'
import TablePickupTrash from '../../components/user/TablePickupTrash'
import TableCustomer from '../../components/user/TableCustomer'
import FormDone from '../../components/user/FormDone'





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
            let {data} = await axios.get(`customers/office` , {headers: {token}})
            setCustomers(data.customers)

            let response = await axios.get(`/transactions/user` , {headers: {token}})
            setTransactions(response.data)

            let statusCount = await axios.get(`/transactions/status/count` , {headers: {token}})
            setCount(statusCount.data)
        })()
    }, [listenCustomer])

    useEffect(() => {
        setListenCustomer(listenCustomer+1)
    } , [doneId])

    
    return (
        <div>
            {
                count ?
                    <div className="flex flex-col md:flex-row gap-6 w-3/4 mx-auto">
                        <CardDashboard number={count.waiting} text="Menunggu" />
                        <CardDashboard number={count.process} text="Prosess" />
                        <CardDashboard number={count.done} text="Selesai" />
                    </div>
                : ""
            }
            <TableCustomer customers={customers} 
                            token={token} listenCustomer={listenCustomer} s
                            etListenCustomer={setListenCustomer} />
            {
                !doneId ? 
                    <TablePickupTrash 
                        setDoneId={setDoneId}
                        transactions={transactions} 
                        token={token} listenCustomer={listenCustomer} 
                        setListenCustomer={setListenCustomer}/>
                : <FormDone id={doneId} token={token} setDoneId={setDoneId} />
            }
        </div>
    )
}

export default Pickuper
