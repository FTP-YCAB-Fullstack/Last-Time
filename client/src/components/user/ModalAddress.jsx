import React from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const addressSchema = Yup.object({
    address: Yup.string().min(3).max(100).required()
})

const ModalAddress = ({setStatus , selectOffice , setSelectOffice , increaseListen}) => {
    const auth = useSelector(state => state.auth)
    let token = auth.token

    const {register, handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(addressSchema)
    })
    
    const onSubmit = async (data) => {
        let address = data.address
        let officeId = selectOffice
        try {
            let response = await axios.post('/customers' , {address,officeId} , {headers: {token}})
            if(response.status) {
                setStatus(true)
                increaseListen()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="bg-gray-700 flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-opacity-25">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-600 shadow-lg w-9/10 md:w-1/3 p-6 md:p-10 rounded-lg">
                <textarea {...register('address')} className="py-2 w-full block dark:bg-gray-700 px-6 border-2 border-teal-400 dark:border-0 rounded-md focus:outline-none focus:ring-4 transition duration-200" placeholder="Isi alamat lengkap anda" ></textarea>
                <small className="error text-red-400 font-bold">{errors.address?.message}</small>
                <div className="flex flex-row mt-4">
                    <button type="button" className="mx-auto bg-gray-400 text-white rounded-md font-semibold mt-2 md:my-6 py-2 px-4 block" onClick={() => setSelectOffice(null)}>Batal</button>
                    <button className="mx-auto bg-teal-400 text-white rounded-md font-semibold mt-2 md:my-6 py-2 px-4 block">Kirim</button>
                </div>
            </form>
        </div>
    )
}

export default ModalAddress
