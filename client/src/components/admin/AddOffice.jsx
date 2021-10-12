import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from '../../axios'
import { useDispatch } from 'react-redux'
import { fetchUsersCount } from '../../redux/actions/adminCount'
import FormGroup from './FormGroup'

const AddOffice = ({token}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let {name , email , password} = e.target
        let data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        let response = await axios.post(`/offices` , data , {headers: {token}})
        console.log(response.status)
        if(response.status === 201) history.push('/admin/users')
        dispatch(fetchUsersCount())
    }
    
    return (
        <div>
            <h1>Tambah Kantor</h1>
            <form onSubmit={handleSubmit} className="md:w-1/2">
                <FormGroup label="Nama" name="name" />
                <FormGroup label="Email" name="email" type="email" />
                <FormGroup label="Password" name="password" type="password" />
                <FormGroup label="Konfirmasi Password" name="password_confirmation" type="password" />

                {/* button back and submit */}
                <div className="flex justify-between">
                    <Link to="/admin/users">
                        <button type="button" className="flex flex-row gap-2 bg-gray-400 text-white font-semibold py-2 px-4 rounded hover:bg-gray-500 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                            </svg>
                            <span>Kembali</span>
                        </button>
                    </Link>
                    <button className="flex flex-row gap-2 bg-teal-300 text-white font-semibold py-2 px-4 rounded hover:bg-teal-400 transition duration-200">
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

export default AddOffice
