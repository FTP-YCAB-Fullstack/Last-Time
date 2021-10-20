import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'

const ModalReject = ({id , close , setListen , listen}) => {
    const token = useSelector(state => state.auth.token)
    console.log('open modal reject')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let reason = e.target.reason.value
        try {
            let result = await axios.patch(`/customers/${id}`,
                            {
                                status: "reject",
                                reason,
                            } , {headers: {token}})
            if(result.status === 200) {
                setListen(listen+1)
                close(null)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-gray-700 flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-opacity-25">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-600 shadow-lg w-9/10 md:w-1/3 p-6 md:p-10 rounded-lg">
                <textarea name="reason" className="py-2 w-full block dark:bg-gray-700 px-6 border-2 border-teal-400 dark:border-0 rounded-md focus:outline-none focus:ring-4 transition duration-200" placeholder="Isi alasan untuk menolak" ></textarea>
                <div className="flex flex-row mt-4">
                <button type="button" className="mx-auto bg-gray-400 text-white rounded-md font-semibold mt-2 md:my-6 py-2 px-4 block" onClick={() => close(null)}>Batal</button>
                <button className="mx-auto bg-teal-400 text-white rounded-md font-semibold mt-2 md:my-6 py-2 px-4 block">Kirim</button>
                </div>
            </form>
        </div>
    ) 
}

const TableCustomer = ({customers , statusCustomer , listenCustomer,  setListenCustomer , token}) => {
    
    const handleCustomer = async (e) => {
        let id = null
        let status = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.parentElement.getAttribute('data-id')
            status = el.parentElement.getAttribute('data-status')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.parentElement.getAttribute('data-id')
            status = el.parentElement.parentElement.getAttribute('data-status')
        }

        try {
            let response = await axios.patch(`customers/${id}` , {status} , {headers: {token}})
            if(response.status === 200) setListenCustomer(listenCustomer+1)
        } catch (error) {
            console.log(error)
        }
    }

    // reject customer
    const [rejectId, setRejectId] = useState(null)
    const handleReject = async(e) => {
        console.log('must open modal reject')
        let id = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.getAttribute('data-id')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.getAttribute('data-id')
        }
        setRejectId(id)
    }

    const handleDelete = async(e) => {
        let id = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.getAttribute('data-id')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.getAttribute('data-id')
        }
        
        try {
            let response = await axios.delete(`customers/${id}` , {headers: {token}})
            if(response.status === 200) setListenCustomer(listenCustomer+1)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="my-6 ">
                {
                    rejectId && <ModalReject id={rejectId} listen={listenCustomer} setListen={setListenCustomer} close={setRejectId} />
                }
                
                <h2 className="text-xl font-bold mb-2">Data Pelanggan</h2>
                <h4 className="mb-2 text-teal-400">Status : {statusCustomer}</h4>
                <table className="table-auto hidden md:table overflow-hidden bg-white dark:bg-gray-700 shadow-md w-full rounded">
                    <thead className="text-teal-500 dark:text-teal-300 dark:bg-teal-700 h-10 bg-teal-100">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.length ?
                                customers.map((customer , i) => 
                                    <tr key={customer._id}>
                                        <td className="text-center">{i+1}</td>
                                        <td>{customer.user}</td>
                                        <td>{customer.address}</td>
                                        <td data-id={customer._id} className="text-center py-2 ">
                                            {
                                                customer.status === 'waiting' ?
                                                    <>
                                                        <button className="text-teal-300 hover:opacity-60 transition duration-100" data-status="accepted" onClick={handleCustomer}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                        </button>
                                                        <button className="text-red-300 hover:opacity-60 transition duration-100" data-id={customer._id} data-status="reject" onClick={handleReject}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                : <>
                                                        <button className="text-red-300 transition duration-100 hover:opacity-60" onClick={handleDelete}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                            }
                                        </td>
                                    </tr>
                                )
                            :
                                <tr>
                                    <td colSpan="4" className="h-10 text-center text-red-400">Tidak ada data</td>
                                </tr>
                        }
                    </tbody>
                </table>



                <div className="md:hidden">
                    {
                        customers.length ?
                            customers.map(customer => 
                                <div className="bg-white my-4 dark:bg-gray-700 shadow-md rounded-md  p-4" key={customer._id}>
                                    <p className="text-lg font-semibold">{customer.user}</p>
                                    <p className="text-sm">{customer.address}</p>
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-sm text-teal-400">status: {customer.status}</p>
                                        <div className="flex gap-4">
                                            {
                                                customer.status === 'waiting' ?
                                                    <>
                                                        <button className="text-teal-300 hover:opacity-60 transition duration-100" data-id={customer._id} data-status="accepted" onClick={handleCustomer}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                        </button>
                                                        <button className="text-red-300 hover:opacity-60 transition duration-100" data-id={customer._id} data-status="reject" onClick={handleReject}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                                : <>
                                                        <button className="text-red-300 transition duration-100 hover:opacity-60" onClick={handleDelete}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        : <p className="text-center text-red-400">Tidak ada data</p>
                    }
                </div>
            </div>
    )
}

export default TableCustomer
