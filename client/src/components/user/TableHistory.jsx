import React from 'react'

const TableHistory = ({data}) => {
    return (
        <div>
            <h2 className="text-lg mb-4">Riwayat Setor Sampah</h2>
            <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
                <thead className="bg-teal-400 h-10 text-white">
                    <tr>
                        <th>No</th>
                        <th>Waktu</th>
                        <th>Status</th>
                        <th>Poin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ?
                            data.map((history , i) => 
                                <tr key={history._id} className="text-center" > 
                                    <td>{i+1}</td>
                                    <td>{history.createdAt}</td>
                                    <td>{history.status}</td>
                                    <td>{history.poin}</td>
                                </tr>
                            )
                        : <tr></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableHistory
