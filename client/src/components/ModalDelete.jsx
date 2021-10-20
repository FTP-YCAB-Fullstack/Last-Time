import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleModalDel } from '../redux/actions/storeDelete'
import axios from '../axios'
import {motion} from 'framer-motion'

const ModalDelete = ({}) => {
    const auth = useSelector(state => state.auth)
    const token = auth.token
    const storeDelete = useSelector(state => state.delete)
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await axios.delete(storeDelete.url , {headers: {token}})
        // let response = {status: 200 , data: {id: 10}}
        if(response.status === 200) {
            if(storeDelete.cb) storeDelete.cb(response)
            setTimeout(() => {
                dispatch(toggleModalDel())
            }, 300);
        }
    }

    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        style={{zIndex: 100}} className="w-screen h-screen bg-gray-800 bg-opacity-25 fixed top-0 left-0 flex items-center justify-center">
            <motion.form 
                initial={{ opacity: 0, y: -120 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 , delay: 0.3}}
            onSubmit={handleSubmit} className="bg-white dark:bg-gray-600 dark:text-gray-100 text-gray-600 shadow-lg text-center p-8 w-5/6 md:w-1/3 rounded-lg">
                <p className="text-sm md:text-2xl mb-8">Apakah kamu yakin akan menghapus data yang dipilih?</p>
                <div className="flex justify-around">
                    <button onClick={() => dispatch(toggleModalDel())} type="button" className="flex flex-row gap-2 bg-gray-400 dark:bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 dark:hover:bg-gray-600 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                        <span>Kembali</span>
                    </button>
                    <button type="submit" className="flex flex-row gap-2 bg-red-300 text-white font-semibold py-2 px-4 rounded dark:bg-red-700 dark:hover:bg-red-600 hover:bg-red-400 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Hapus</span>
                    </button>
                </div>
            </motion.form>
        </motion.div>
    )
}

export default ModalDelete
