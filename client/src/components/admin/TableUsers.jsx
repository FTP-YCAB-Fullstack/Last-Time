import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setIdDelete } from '../../redux/actions/storeDelete'
import { motion } from 'framer-motion'

const TableUsers = ({data , setData , token }) => {
    const dispatch = useDispatch()
    
    const handleDelete = async (e) => {
        let id = null
        let el = e.target
        if(el.tagName === 'svg') {
            id = el.parentElement.parentElement.getAttribute('data-id')
        } else if(el.tagName === 'path') {
            id = el.parentElement.parentElement.parentElement.getAttribute('data-id')
        }
        dispatch(setIdDelete(id , `/users/${id}`))
    }

    useEffect(() => {
        dispatch({type: "INCREASE_PAGE"})
    }, [])
    
    return (
        <motion.table 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        className="table-auto overflow-hidden bg-white text-gray-600 dark:bg-gray-600 dark:text-gray-100 shadow-md w-full rounded">
            <thead className="bg-teal-50 text-teal-400 dark:bg-teal-800 h-10">
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length ? data.map((item , i) => {
                        let delay = i % 20
                        return (
                            <motion.tr 
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.06 * delay }}
                            className="h-10" key={item._id}>
                                <td className="text-center">{i+1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className="text-center" data-id={item._id}>
                                    <button onClick={handleDelete} className=" h-8 text-center w-8  text-red-400 hover:scale-110 text-sm rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                    </button>
                                </td>
                            </motion.tr>
                        )
                    }
                    ) : <tr>
                        <td colSpan="4">
                            <p className="text-lg font-bold text-red-400 py-4 text-center ">Tidak ada data</p>
                        </td>
                    </tr>
                }
            </tbody>
        </motion.table>
    )
}

export default TableUsers
