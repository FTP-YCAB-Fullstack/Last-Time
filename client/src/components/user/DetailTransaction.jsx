import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import axios from '../../axios'
import {motion} from 'framer-motion'

const CategoryTrash = ({rubbishes , keyword }) => {
    return (
        <div className="flex my-2">
            <div className="py-2 px-4 w-28">
                {rubbishes[keyword].key}
            </div>
            <div className="bg-white dark:bg-gray-600 py-2 w-28 text-right px-4 shadow-md rounded-md">
                {rubbishes[keyword].value}
            </div>
        </div>
    )
}


const DetailTransaction = () => {
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const token = auth.token
    const [data, setData] = useState(null)
    const [rubbishes, setRubbishes] = useState({
        paper: {key: "Kertas" , value: 0},
        glass: {key: "Gelas" , value: 0},
        plastic: {key: "Plastik" , value: 0},
        iron: {key: "Logam" , value: 0},
        cardboard: {key: "Kardus" , value: 0},
    })

    useEffect(() => {
        (
            async() => {
                try {
                    let id = history.location.state.id
                    let response = await axios.get(`/transactions/${id}` , {headers: {token}})
                    response.data.rubbish.forEach(rubbish => {
                        rubbishes[rubbish.category] = {...rubbishes[rubbish.category] , value: rubbish.weight}
                        setRubbishes(rubbishes)
                    })
                    setData(response.data)
                } catch (error) {
                    console.log(error)
                }
            }
        )()
    }, [])

    return data ? (
        <div>
            <h1 className="text-2xl font-bold mb-2">Detail Transaksi</h1>
            <div className="italic mb-4">Status : {data.status}</div>
            <div className="flex flex-col mb-4 md:flex-row justify-between w-full">
                <motion.div 
                    initial={{ opacity: 0,x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg">Kategori Sampah</h3>
                    <CategoryTrash rubbishes={rubbishes} keyword="paper" />
                    <CategoryTrash rubbishes={rubbishes} keyword="glass" />
                    <CategoryTrash rubbishes={rubbishes} keyword="plastic" />
                    <CategoryTrash rubbishes={rubbishes} keyword="iron" />
                    <CategoryTrash rubbishes={rubbishes} keyword="cardboard" />
                </motion.div>
                {
                    data.status !== 'reject' ?
                        <motion.div 
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        className="md:w-2/3">
                            <div 
                            className="h-72 overflow-hidden bg-gray-400 rounded shadow-lg flex items-center justify-center">
                                <img alt="trash foto" className="w-full transform hover:scale-110 transition duration-500" src={process.env.REACT_APP_API + `assets/${data.images}`} />
                            </div>
                            <div className="flex w-full flex-row justify-between mt-3">
                                <small>Created: {data.createdAt}</small>
                                <small>Updated: {data.updatedAt}</small>
                            </div>
                        </motion.div>
                    : ""
                }
            </div>
            
            <div className="inline-block">
                <Link to="/user/pickup">
                    <button type="button" className="flex flex-row gap-2 bg-gray-400 dark:bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                        </svg>
                        <span>Kembali</span>
                    </button>
                </Link>
            </div>
        </div>
    ) : <span>Loading...</span>
}

export default DetailTransaction
