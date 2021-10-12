import React, { useEffect, useState } from 'react'
import axios from '../../axios'

const TablePickupTrash = ({transactions , listenCustomer, setListenCustomer , token , setDoneId}) => {
    
    const handleStatus = async (e) =>{
        let id = e.target.parentElement.getAttribute('data-id')
        let status = e.target.getAttribute('status')
        let response = await axios.patch(`transactions/${id}/status`, {status}, {headers: {token}})
        if (response.status === 200) setListenCustomer(listenCustomer+1)
    }

    const handleDone = async (e) => {
        let id = e.target.parentElement.getAttribute('data-id')
        setDoneId(id)
    }
    
    return (
        <div className="my-6">
            <h2>Data Angkut Sampah</h2>
                <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
                    <thead className="bg-teal-300 h-10 text-white">
                        <tr>
                            <th>No</th>
                            <th>Pelanggan</th>
                            <th>Status</th>
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
                                        <td className="text-center">{transaction.status}</td>
                                        <td data-id={transaction._id} className="flex gap-3 justify-center py-2">
                                            {
                                                transaction.status !== 'done' && transaction.status !== 'reject' ?
                                                    <>  {
                                                        transaction.status === 'waiting' ?
                                                            <>
                                                                <button className="px-4 rounded-full text-white bg-blue-300"  status="process" onClick={handleStatus}>Process</button>
                                                            </>
                                                            : ""
                                                        }
                                                        <button onClick={handleDone} className="px-4 rounded-full text-white bg-teal-300" >Done</button>
                                                        <button className="px-4 rounded-full text-white bg-red-300" >Reject</button>
                                                    </>
                                                : ""
                                            }
                                        </td>

                                    </tr>
                                )
                            : <tr></tr>
                        }
                        <tr></tr>
                    </tbody>
                </table>
        </div>
    )
}

export default TablePickupTrash
