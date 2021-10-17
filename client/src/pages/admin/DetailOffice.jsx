import React, { useEffect, useState } from 'react'
import {Link , Switch , Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import axios from '../../axios'

const Navigation = () => {
    return (
        <div className="flex flex-wrap flex-row gap-2 md:gap-4 my-6">
            <Link to="/admin/pickups/detail" >
                <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Pelanggan</span>
                </button>
            </Link>
            <Link to="/admin/pickups/detail/transactions" >
                <button className="flex flex-row gap-2 bg-teal-300 dark:bg-teal-800 dark:text-teal-400 text-white font-semibold py-2 px-4 rounded dark:hover:bg-teal-700 hover:bg-teal-400 transition duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Transaksi</span>
                </button>
            </Link>
        </div>
    )
}

const TableCustomerOffice = ({office}) => {
    return (
        <div>
            <table className="bg-white hidden md:table w-full shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="h-10 text-teal-500 bg-teal-50">
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        office.customers.length ?
                            office.customers.map((customer , i) =>
                                <tr key={customer._id} className="h-12">
                                    <td className="text-center">{i+1}</td>
                                    <td>{customer.user.name}</td>
                                    <td>{customer.user.email}</td>
                                    <td>{customer.address}</td>
                                    <td className="text-center">{customer.status}</td>
                                </tr>
                            )
                        : <tr>
                            <td colSpan="5" className="text-center">Tidak ada data</td>
                        </tr>
                    }
                </tbody>
            </table>

            <div className="md:hidden">
                {
                    office.customers.length ?
                        office.customers.map(customer => 
                            <div key={customer._id} className="bg-white mb-4 shadow-md rounded-md p-4 dark:bg-gray-700">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{customer.user.name}</p>
                                    <p className="text-teal-400 text-sm">{customer.status}</p>
                                </div>
                                <div className="text-sm">
                                    <p className="italic">{customer.user.email}</p>
                                    <p>{customer.address}</p>
                                </div>
                            </div>
                        )
                    : <p>Tidak ada data</p>
                }
            </div>
        </div>
    )
}

const TableTransactionOffice = ({id}) => {
    const token = useSelector(state => state.auth.token)
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        (async() => {
            let result = await axios.get(`/transactions/${id}/office` , {headers: {token}})
            if(result.status === 200) {
                setTransactions(result.data.transactions)
            } 
        })()
    }, [])
    
    return (
        <>
            <table className="bg-white w-full hidden md:table shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="h-10 text-teal-500 bg-teal-50">
                        <th>No</th>
                        <th>Nama</th>
                        <th>Poin</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.length ?
                            transactions.map((item , i) => 
                                <tr key={item._id}>
                                    <td className="text-center">{i+1}</td>
                                    <td>{item.user}</td>
                                    <td className="text-right">{item.poin}</td>
                                    <td className="text-center">{item.status}</td>
                                    <td className="text-center">
                                        <Link to={{
                                            pathname: "/admin/pickups/detail/transactions/detail",
                                            state: {id: item._id}
                                        }}>
                                            <button className=" text-blue-300 hover:opacity-60 transition duration-100"  status="process">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        : <tr>
                            <td className="text-center" colSpan="5" >Tidak ada data</td>
                        </tr>
                    }
                </tbody>
            </table>
            
            <div>
                {
                    transactions.length ?
                        transactions.map(transaction => 
                            <div key={transaction._id} className="bg-white mb-4 rounded-md shadow-md p-4">
                                <div className="flex justify-between">
                                    <p className="font-semibold">{transaction.user}</p>
                                    <Link to={{
                                            pathname: "/admin/pickups/detail/transactions/detail",
                                            state: {id: transaction._id}
                                        }}>
                                            <button className=" text-blue-300 hover:opacity-60 transition duration-100"  status="process">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </Link>
                                </div>
                                <div className="text-sm">
                                    <p>Poin : {transaction.poin}</p>
                                    <p className="text-teal-400">Status : {transaction.status}</p>
                                </div>
                            </div>
                        )
                    : <p>Tidak ada data</p>
                }
            </div>
        </>
    )
}


const CategoryTrash = ({rubbishes , keyword }) => {
    return (
        <div className="flex my-2">
            <div className="py-2 px-4 w-28">
                {rubbishes[keyword].key}
            </div>
            <div className="bg-white dark:bg-gray-600 py-2 w-28 text-right px-4 shadow-md rounded-md">
                {rubbishes[keyword].value}
            </div>
        </div>
    )
}

const DetailTransaction = () => {
    const history = useHistory()
    const token = useSelector(state => state.auth.token)
    const [data, setData] = useState(null)
    const [rubbishes, setRubbishes] = useState({
        paper: {key: "Kertas" , value: 0},
        glass: {key: "Gelas" , value: 0},
        plastic: {key: "Plastik" , value: 0},
        iron: {key: "Logam" , value: 0},
        cardboard: {key: "Kardus" , value: 0},
    })
    
    useEffect(() => {
        let state = history.location.state
        if(state) {
            let id = state.id;
            (async() => {
                let result = await axios.get(`/transactions/${id}` , {headers: {token}})
                result.data.rubbish.forEach(rubbish => {
                    rubbishes[rubbish.category] = {...rubbishes[rubbish.category] , value: rubbish.weight}
                    setRubbishes(rubbishes)
                })
                setData(result.data)
            })()
        } else history.replace('/admin/pickups/detail/transactions')
    }, [])
    if(data) {
        return (
            <div>
                <div>
                    <h3 className="text-xl font-semibold">Data Member</h3>
                    <p>Nama : {data.user.name}</p>
                    <p>Email : {data.user.email}</p>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Data Transaksi</h3>
                    {
                            data.status !== 'reject' ?
                                <div className="w-full my-6">
                                    <div className="h-80 overflow-hidden bg-gray-400 rounded shadow-lg flex items-center justify-center">
                                        <img alt="trash foto" className="w-full transform hover:scale-110 transition duration-500" src={process.env.REACT_APP_API + `assets/${data.images}`} />
                                    </div>
                                </div>
                            : ""
                        }
                    <div className="flex flex-col-reverse md:flex-row gap-6 justify-between">
                        <div>
                            <CategoryTrash rubbishes={rubbishes} keyword="paper" />
                            <CategoryTrash rubbishes={rubbishes} keyword="glass" />
                            <CategoryTrash rubbishes={rubbishes} keyword="plastic" />
                            <CategoryTrash rubbishes={rubbishes} keyword="iron" />
                            <CategoryTrash rubbishes={rubbishes} keyword="cardboard" />
                        </div>
                        <div>
                            <p>status : {data.status}</p>
                            <p>poin : {data.poin}</p>
                            <p>created : {data.createdAt}</p>
                            <p>updated : {data.updatedAt}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else return (<div>Loading</div>)
}


const DetailOffice = () => {
    const history = useHistory()    
    const token = useSelector(state => state.auth.token)
    const [office, setOffice] = useState(null)

    useEffect(() => {
        let state = history.location.state
        if(state) {
            let officeId = state.id;
            (async() => {
                try {
                    let result = await axios.get(`/offices/${officeId}` , {headers: {token}})
                    setOffice(result.data.office)
                } catch (error) {
                    console.log(error)
                }
            })()
        } else {
            history.replace('/admin/pickups')
        }
    }, [])
    
    return (
        <div className="text-gray-600">
            {
                office ?
                <>
                    <div>
                        <h2 className="text-2xl font-semibold">Info Kantor</h2>
                        <p>Lokasi : {office.user.name}</p>
                        <p>Email : {office.user.email}</p>
                    </div>
                    <div>
                        <Navigation />
                    </div>
                    <div>
                        <Switch>
                            <Route exact path="/admin/pickups/detail">
                                <TableCustomerOffice office={office} />
                            </Route>
                            <Route exact path="/admin/pickups/detail/transactions">
                                <TableTransactionOffice id={office._id} />
                            </Route>
                            <Route exact path="/admin/pickups/detail/transactions/detail">
                                <DetailTransaction />
                            </Route>
                        </Switch>
                    </div>
                </> 
                : <p>Tidak ada data</p>
            }
        </div>
    )
}

export default DetailOffice
