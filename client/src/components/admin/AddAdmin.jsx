import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { fetchUsersCount } from '../../redux/actions/adminCount'
import FormGroup from './FormGroup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const officeSchema = Yup.object({
    name: Yup.string().min(3).max(50).required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().oneOf([Yup.ref('password') , null] , 'Konfirmasi password salah')
})

const AddAdmin = ({token}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const {register,handleSubmit , formState: {errors}} = useForm({
        resolver: yupResolver(officeSchema)
    })
    
    const onSubmit = async (data) => {
        let response = await axios.post(`/users/admin` , data , {headers: {token}})
        if(response.status === 201) history.push('/admin/users')
        dispatch(fetchUsersCount())
    }
    
    return (
        <div className="dark:text-gray-200 my-8">
            <h1 className="text-2xl font-semibold">Tambah Admin</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-1/2">
                <FormGroup register={register} errors={errors} label="Nama" name="name" />
                <FormGroup register={register} errors={errors} label="Email" name="email" type="email" />
                <FormGroup register={register} errors={errors} label="Password" name="password" type="password" />
                <FormGroup register={register} errors={errors} label="Konfirmasi Password" name="password_confirmation" type="password" />

                {/* button back and submit */}
                <div className="flex justify-between">
                    <Link to="/admin/users">
                        <button type="button" className="flex flex-row gap-2 bg-gray-400 dark:bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                            </svg>
                            <span>Kembali</span>
                        </button>
                    </Link>
                    <button className="flex flex-row gap-2 bg-teal-300 text-white font-semibold py-2 px-4 rounded dark:bg-teal-700 dark:hover:bg-teal-600 hover:bg-teal-400 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span>Tambah</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddAdmin
