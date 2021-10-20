import React from 'react'

const TableHistory = ({data}) => {
    
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Riwayat Setor Sampah</h2>
            <table className="table-auto overflow-hidden bg-white dark:bg-gray-700 shadow-md w-full rounded">
                <thead className="text-teal-500 dark:text-teal-300 dark:bg-teal-700 h-10 bg-teal-100 ">
                    <tr>
                        <th>No</th>
                        <th>Waktu</th>
                        <th>Poin</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ?
                            data.map((history , i) => 
                                <tr key={history._id} className="text-center h-12" > 
                                    <td>{i+1}</td>
                                    <td>{history.createdAt}</td>
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
