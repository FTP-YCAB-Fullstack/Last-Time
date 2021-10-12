import React from 'react'

const TablePickups = ({data}) => {
    return (
            <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
                <thead className="bg-teal-300 h-10 text-white">
                    <tr>
                        <th>No</th>
                        <th>Kota</th>
                        <th>Jumlah Pelanggan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ? data.map((item, i) => 
                            <tr className="h-10" key={item._id}>
                                <td className="text-center">{i+1}</td>
                                <td>{item.user}</td>
                                <td>{item.customers}</td>
                                <td>
                                    <span>detail</span>
                                </td>
                            </tr>
                        ) : <tr></tr>
                    }
                </tbody>
            </table>
    )
}

export default TablePickups
