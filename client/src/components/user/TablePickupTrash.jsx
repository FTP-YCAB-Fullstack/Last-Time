import React from 'react'
import axios from '../../axios'
import {Link} from 'react-router-dom'

const TablePickupTrash = ({transactions , statusTransaction , listenCustomer, setListenCustomer , token , setDoneId}) => {
    const handleStatus = async (e) =>{
        let id = null
        let status = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.parentElement.getAttribute('data-id')
            status = el.parentElement.getAttribute('status')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.parentElement.getAttribute('data-id')
            status = el.parentElement.parentElement.getAttribute('status')
        }

        try {
            let response = await axios.patch(`transactions/${id}/status`, {status}, {headers: {token}})
            if (response.status === 200) setListenCustomer(listenCustomer+1)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDone = async (e) => {
        let id = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.parentElement.getAttribute('data-id')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.parentElement.getAttribute('data-id')
        }
        setDoneId(id)
    }
    
    return (
        <div className="my-6">
                <h2 className="text-xl font-bold mb-2">Data Angkut Sampah</h2>
                <h4 className="mb-2 text-teal-400">Status : {statusTransaction}</h4>
                <table className="table-auto hidden md:table overflow-hidden bg-white dark:bg-gray-700 shadow-md w-full rounded">
                    <thead className="text-teal-500 dark:text-teal-300 dark:bg-teal-700 h-10 bg-teal-100">
                        <tr>
                            <th>No</th>
                            <th>Pelanggan</th>
                            <th>Waktu</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.length ?
                                transactions.map((transaction , i) => 
                                    <tr key={transaction._id}>
                                        <td className="text-center">{i+1}</td>
                                        <td>{transaction.user}</td>
                                        <td>{transaction.createdAt}</td>
                                        <td data-id={transaction._id} className="flex gap-3 justify-center py-2">
                                            {
                                                transaction.status !== 'done' && transaction.status !== 'reject' ?
                                                    <>  {
                                                        transaction.status === 'waiting' ?
                                                            <>
                                                                <button className=" text-blue-300 hover:opacity-60 transition duration-100"  status="process" onClick={handleStatus}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                                                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                            : ""
                                                        }
                                                        {
                                                            transaction.status === 'process' ?
                                                                <button onClick={handleDone} className="text-teal-300 hover:opacity-60 transition duration-100" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            : ""
                                                        }
                                                        <button status="reject" onClick={handleStatus} className="text-red-300 hover:opacity-60 transition duration-100" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                : 
                                                <Link to={{
                                                        pathname: "/user/pickup/transaction",
                                                        state: {id: transaction._id}
                                                    }} state={{id: transaction._id}}>
                                                    <button className=" text-blue-400 hover:opacity-60 transition duration-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            }
                                        </td>

                                    </tr>
                                )
                            : <tr>
                                <td colSpan="5" className="text-center h-8"> Tidak ada data</td>
                            </tr>
                        }
                        <tr></tr>
                    </tbody>
                </table>


                <div className="md:hidden">
                    {
                        transactions.length ?
                            transactions.map(transaction => 
                                <div  className="bg-white my-4 dark:bg-gray-700 shadow-md rounded-md  p-4" key={transaction._id}>
                                    <p className="font-semibold">{transaction.user}</p>
                                    <p>{transaction.createdAt}</p>
                                    
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-sm text-teal-400">{transaction.status}</p>
                                        <div data-id={transaction._id}  className="flex gap-4">
                                            {
                                                transaction.status !== 'done' && transaction.status !== 'reject' ?
                                                    <>  {
                                                        transaction.status === 'waiting' ?
                                                            <>
                                                                <button className=" text-blue-300 hover:opacity-60 transition duration-100"  status="process" onClick={handleStatus}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                                                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                                                    </svg>
                                                                </button>
                                                            </>
                                                            : ""
                                                        }
                                                        {
                                                            transaction.status === 'process' ?
                                                                <button onClick={handleDone} className="text-teal-300 hover:opacity-60 transition duration-100" >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            : ""
                                                        }
                                                        <button status="reject" onClick={handleStatus} className="text-red-300 hover:opacity-60 transition duration-100" >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                : 
                                                <Link to={{
                                                        pathname: "/user/pickup/transaction",
                                                        state: {id: transaction._id}
                                                    }} state={{id: transaction._id}}>
                                                    <button className=" text-blue-400 hover:opacity-60 transition duration-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        : <p>Tidak ada data</p>
                    }
                </div>
        </div>
    )
}

export default TablePickupTrash
