import React from 'react'
import { Link } from 'react-router-dom'

const TablePickups = ({data}) => {
    return (
            <table className="table-auto overflow-hidden text-gray-600 bg-white dark:bg-gray-600 dark:text-gray-100 w-full shadow-md rounded">
                <thead className="bg-teal-50 dark:bg-teal-800 h-10 text-teal-500">
                    <tr>
                        <th className="w-16">No</th>
                        <th>Kota</th>
                        <th>Jumlah Pelanggan</th>
                        <th className="w-12">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ? data.map((item, i) => 
                            <tr className="h-10" key={item._id}>
                                <td className="text-center">{i+1}</td>
                                <td>{item.user}</td>
                                <td>{item.customers}</td>
                                <td className="text-center" data-id={item._id}>
                                    <Link to={{
                                        pathname: '/admin/pickups/detail',
                                        state: {id: item._id}
                                    }} >
                                        <button className=" h-8 text-center w-8  text-blue-400 hover:opacity-60 transition duration-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ) : <tr></tr>
                    }
                </tbody>
            </table>
    )
}

export default TablePickups
