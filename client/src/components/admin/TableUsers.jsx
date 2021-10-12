import React from 'react'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { fetchUsersCount } from '../../redux/actions/adminCount'

const TableUsers = ({data , setData , token}) => {
    const dispatch = useDispatch()
    const handleDelete = async (e) => {
        let id = e.target.parentElement.getAttribute('data-id')
        let response = await axios.delete(`/users/${id}` , {headers: {token}})
        if(response.status === 200) {
            data = data.filter(item => item._id !== id)
            setData(data)
            dispatch(fetchUsersCount())
        }
    }
    
    return (
        <table className="table-auto overflow-hidden bg-white shadow-md w-full rounded">
            <thead className="bg-teal-300 h-10 text-white">
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length ? data.map((item , i) => 
                        <tr className="h-10" key={item._id}>
                            <td className="text-center">{i+1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td className="text-center" data-id={item._id}>
                                <button onClick={handleDelete} className="bg-red-400 text-white text-sm px-4 rounded-full">hapus</button>
                            </td>
                        </tr>
                    ) : <tr></tr>
                }
            </tbody>
        </table>
    )
}

export default TableUsers
