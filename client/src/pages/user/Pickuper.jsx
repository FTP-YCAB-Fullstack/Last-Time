import React, { useEffect , useState } from 'react'
import {Link, Route, Switch , useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardDashboard from '../../components/admin/CardDashboard'
import axios from '../../axios'
import TablePickupTrash from '../../components/user/TablePickupTrash'
import TableCustomer from '../../components/user/TableCustomer'
import FormDone from '../../components/user/FormDone'
import DetailTransaction from '../../components/user/DetailTransaction'
import {motion} from 'framer-motion'
import { setLogout } from '../../redux/actions/auth'

const Navigation = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }
    
    return (
        <div className="flex flex-row gap-2 md:gap-4 mt-12 md:mt-0 mb-2 md:mb-12">
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7 ,delay: 0.1 }}
            >
                <Link to="/user/pickup/customer">
                    <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-2 text-sm md:text-base md:px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                        Pelanggan
                    </button>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7, delay: 0.5 }}
            >
                <Link to="/user/pickup/" >
                    <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-2 text-sm md:text-base md:px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                        Transaksi
                    </button>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7, delay: 0.9 }}
            >
                <button onClick={handleLogout} className="flex flex-row gap-2 bg-red-300 dark:bg-red-800 text-red-100 dark:text-red-400 font-semibold py-2 px-2 text-sm md:text-base md:px-4 rounded dark:hover:bg-red-700 hover:bg-red-400 transition duration-200">
                    Keluar
                </button>
            </motion.div>
        </div>
    )
}


const Pickuper = () => {
    const auth = useSelector(state => state.auth)
    let token  = auth.token

    
    
    const [listenCustomer, setListenCustomer] = useState(0)
    const [doneId, setDoneId] = useState(null)
    
    // data customers & transactions
    const [customers, setCustomers] = useState([])
    const [transactions, setTransactions] = useState([])
    const [count, setCount] = useState(null)
    const [countCustomer, setCountCustomer] = useState(null)
    const [statusTransaction, setStatusTransaction] = useState('waiting')
    const [statusCustomer, setStatusCustomer] = useState('waiting')
    
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                try {
                    let res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`)
                    setWeather({
                        ...res.data.weather, icon: `http://openweathermap.org/img/wn/${res.data.weather.icon}@2x.png`
                    })
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }, [])
    
    useEffect(() => {
        (async() => {
            try {
                let {data} = await axios.get(`customers/office` , {headers: {token}})
                setCustomers(data.customers)
                setCountCustomer(data.count)

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

    useEffect(() => {
        (async() => {
            try {
                let response = await axios.get(`/transactions/user?status=${statusTransaction}`, { headers: { token } })
                setTransactions(response.data)
            } catch (error) {
                console.log(error)
            }
        })()
    } , [statusTransaction])

    useEffect(() => {
        (async() => {
            try {
                let { data } = await axios.get(`customers/office?status=${statusCustomer}`, { headers: { token } })
                setCustomers(data.customers)
                setCountCustomer(data.count)
            } catch (error) {
                console.log(error)
            }
        })()
    } , [statusCustomer])
    
    return (
        <div className="flex flex-col md:flex-row-reverse gap-4 md:gap-10">
            <div className="w-full md:w-1/3">
                <div>
                    {
                        weather ?
                            <div className="flex md:w-3/4 mx-auto mb-6 shadow-md rounded flex-col bg-gray-200 dark:bg-gray-700 items-center">
                                <img className="h-18" alt="weather" src={weather.icon} />
                                <h1 className="font-semibold text-2xl transform -translate-y-4">{weather.main}</h1>
                            </div>
                            : ""
                    }
                </div>
                <Switch>
                    <Route path="/user/pickup/customer" exact>
                        {
                            countCustomer ?
                                <div className="flex flex-col gap-4 md:gap-6 md:w-3/4 mx-auto">
                                    <CardDashboard className="cursor-pointer" color="blue" onClick={() => setStatusCustomer('waiting')} icon="users" number={countCustomer.waiting} text="Menunggu" />
                                    <CardDashboard className="cursor-pointer" onClick={() => setStatusCustomer('accepted')} icon="users" number={countCustomer.accepted} text="Diterima" />
                                    <CardDashboard className="cursor-pointer" onClick={() => setStatusCustomer('reject')} icon="users" color="indigo" number={countCustomer.reject} text="Ditolak" />
                                </div>
                            : ""
                        }
                    </Route>
                    <Route path="/user/pickup" >
                        {
                            count ?
                                <div className="flex flex-col gap-4 md:gap-6 md:w-3/4 mx-auto">
                                    <CardDashboard className={"cursor-pointer " + (statusTransaction === 'waiting' ? 'dark:bg-teal-500' : '')} color="blue" onClick={() => setStatusTransaction('waiting')} icon="truck" number={count.waiting} text="Menunggu" />
                                    <CardDashboard className="cursor-pointer" onClick={() => setStatusTransaction('process')} icon="truck" number={count.process} text="Prosess" />
                                    <CardDashboard className="cursor-pointer" onClick={() => setStatusTransaction('done')} icon="truck" number={count.done} color="indigo" text="Selesai" />
                                </div>
                            : ""
                        }
                    </Route>
                </Switch>
            </div>

            <div
            className="md:w-2/3">
                <Navigation />
                <Switch>
                    <Route path="/user/pickup" exact>
                        
                        {
                            !doneId ?
                                <>
                                    <motion.div
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                        <TablePickupTrash
                                            statusTransaction={statusTransaction}
                                            setDoneId={setDoneId}
                                            transactions={transactions}
                                            token={token} listenCustomer={listenCustomer}
                                            setListenCustomer={setListenCustomer} />
                                    </motion.div>
                                </>
                                : <FormDone id={doneId} token={token} setDoneId={setDoneId} />
                        }
                    </Route>
                    <Route path="/user/pickup/transaction">
                        <DetailTransaction />
                    </Route>
                    <Route path="/user/pickup/customer">
                            <TableCustomer statusCustomer={statusCustomer} customers={customers}
                                token={token} listenCustomer={listenCustomer}
                                setListenCustomer={setListenCustomer} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Pickuper
