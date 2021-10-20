import React , {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import axios from '../../axios'
import ModalAddress from '../../components/user/ModalAddress'
import TableHistory from '../../components/user/TableHistory'
import TableOffice from '../../components/user/TableOffice'
import {motion} from 'framer-motion'
import { setLogout } from '../../redux/actions/auth'

const RightSide = ({status, customer , poinUser , loading , statusPickup , handlePickup}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch(setLogout())
        history.replace('/')
    }

    return (
        status && customer && customer.status !== 'reject' ?
                    <div className="flex flex-col md:mb-10 gap-4 md:gap-10">
                        <div>   
                            <h2 className="text-3xl mb-2 flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span>Poin : {poinUser}</span>
                            </h2>
                            {
                                customer && customer.status === 'accepted' ?
                                    statusPickup === 'waiting' ?
                                        <div className="bg-gray-400 text-white py-2 px-6 rounded-md font-semibold">Menunggu</div>
                                : <button onClick={handlePickup} disabled={loading ? true : false}  className="bg-teal-400 dark:bg-teal-600 transition duration-200 hover:bg-teal-500 flex flex-row gap-2 text-white py-2 px-6 rounded-md font-semibold">
                                        {
                                            loading ?
                                                <svg version="1.1" className="h-6 w-6 animate-spin" strokeWidth="4px" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                    viewBox="0 0 100 100" enableBackground="new 0 0 0 0" >
                                                    <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                    </path>
                                                </svg>
                                            : 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                                                </svg>
                                        }
                                        <span>Angkut Sampah</span>
                                    </button>
                                :   <div className="bg-gray-400 text-white py-2 px-6 rounded-md font-semibold
                                ">Menunggu</div>
                            }
                        </div>
                        
                        <div>
                            <h2 className="text-3xl mb-2">Pengangkut</h2>
                            <h4 className="text-2xl flex items-center gap-4 font-bold tracking-wider text-teal-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span>{customer.office}</span>
                            </h4>
                        </div>
                        <button onClick={handleLogout} className="text-center flex flex-row justify-center inline-block w-2/3 gap-2 bg-red-300 dark:bg-red-800 text-red-100 dark:text-red-200 font-semibold py-2 px-2 text-sm md:text-base md:px-4 rounded dark:hover:bg-red-700 hover:bg-red-400 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <div>
                            Keluar
                            </div>
                        </button>
                    </div>
                : null
    )
}

const Normal = () => {
    const auth = useSelector(state => state.auth)
    const token = auth.token

    const [status, setStatus] = useState(null)
    const [selectOffice, setSelectOffice] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [histories, setHistories] = useState([])
    const [offices, setOffices] = useState([])
    const [poinUser, setPoinUser] = useState(0)
    const [statusPickup, setStatusPickup] = useState(null)
    const [listenButton, setListenButton] = useState(0)
    const [loadPikcup , setLoadPickup] = useState(false)
    
    useEffect( () => {
        (async () => {
            try {
                 // fetch poin
                let userRes = await axios.get('/users/detail' , {headers: {token}})
                let {poin} = userRes.data.user
                setPoinUser(poin)
                
                // fetch status customer
                let response  = await axios.get('/customers/status' , {headers: {token}})
                let {status , customer} = response.data
                setStatus(status)
                setCustomer(customer)

                if(status && customer.status !== 'reject') {
                    // fetch history
                    let response = await axios.get(`/transactions/user` , {headers: {token}})
                    let lastStatus = response.data.length ? response.data[0].status : null
                    setStatusPickup(lastStatus)
                    setHistories(response.data)
                } else {
                    // fetch office
                    let response = await axios.get('/offices' , {headers: {token}})
                    setOffices(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        })()

    }, [status , listenButton])

    const handlePickup = async () => {
        setLoadPickup(true)
        let response = await axios.post(`/transactions/user`, {} , {headers: {token}})
        if(response) setLoadPickup(false)
        if(response.status === 200) setListenButton(listenButton+1)
    }

    const increaseListen = () => {
        setListenButton(listenButton+1)
    }
    
    return (
        <div className="flex flex-col-reverse mx-auto md:w-full md:flex-row gap-8">
            <motion.div 
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            className="w-full md:w-3/4">
                {
                    status && customer && customer.status !== 'reject'  ?
                        <TableHistory data={histories} />
                        : 
                        <div>
                            {
                                customer && customer.status === 'reject' ?
                                    <div className="bg-red-100 p-4 px-8 rounded-md shadow-md mb-6 dark:bg-red-600">
                                        <h2 className="text-lg font-semibold">Permintaan ditolak.</h2>
                                        <p>{customer.reason}</p>
                                    </div>
                                : null
                            }
                            {
                                selectOffice ?
                                    <ModalAddress selectOffice={selectOffice} setSelectOffice={setSelectOffice} setStatus={setStatus} increaseListen={increaseListen}  />
                                : ""
                            }
                            <TableOffice data={offices} setSelectOffice={setSelectOffice} />
                        </div>
                }
            </motion.div>
            <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            className="w-full md:w-1/4">
                <RightSide status={status} loading={loadPikcup} customer={customer} poinUser={poinUser} statusPickup={statusPickup} handlePickup={handlePickup} />
            </motion.div>
        </div>
    )
}

export default Normal
