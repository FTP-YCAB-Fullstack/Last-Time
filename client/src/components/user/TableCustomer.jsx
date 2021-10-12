import React, { useEffect, useState } from 'react'
import axios from '../../axios'

const TableCustomer = ({customers , listenCustomer,  setListenCustomer , token}) => {
    
    const handleCustomer = async (e) => {
        let id = e.target.parentElement.getAttribute('data-id')
        let status = e.target.getAttribute('data-status')
        let response = await axios.patch(`customers/${id}` , {status} , {headers: {token}})
        if(response.status === 200) setListenCustomer(listenCustomer+1)
}
    
    return (
        <div className="my-6">
                <h2>Data Pelanggan</h2>
                <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
                    <thead className="bg-teal-300 h-10 text-white">
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Status</th>
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
                                        <td className="text-center">{customer.status}</td>
                                        <td data-id={customer._id}>
                                            {
                                                customer.status === 'waiting' ?
                                                    <>
                                                        <button className="px-4 rounded-full text-white bg-teal-300" data-status="accepted" onClick={handleCustomer}>Terima</button>
                                                        <button className="px-4 rounded-full text-white bg-red-300" data-status="reject" onClick={handleCustomer}>Tolak</button>
                                                    </>
                                                : ""
                                            }
                                        </td>
                                    </tr>
                                )
                            :
                                <tr></tr>
                        }
                    </tbody>
                </table>
            </div>
    )
}

export default TableCustomer
