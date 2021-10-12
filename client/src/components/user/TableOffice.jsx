import React from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'

const TableOffice = ({data , setStatus}) => {
    const auth = useSelector(state => state.auth)
    let token = auth.token
    const handleClick = async (e) => {
        let officeId = e.target.getAttribute('data-id')
        let response = await axios.post('/customers' , {officeId} , {headers: {token}})
        if(response.status === 200) setStatus(true)
    }
    
    return (
        <div>
            <h2 className="text-lg mb-4">Cari Kantor Terdekat</h2>
            <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
                <thead className="bg-teal-400 h-10 text-white">
                    <tr>
                        <th>No</th>
                        <th>Kota</th>
                        <th>Pilih</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length ?
                            data.map((office , i) => 
                                <tr key={office._id} className="text-center">
                                    <td>{i + 1}</td>
                                    <td className="text-left">{office.user}</td>
                                    <td>
                                        <button data-id={office._id} onClick={handleClick}>pilih</button>
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

export default TableOffice
