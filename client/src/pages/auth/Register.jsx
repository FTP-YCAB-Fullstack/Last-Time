import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/auth/Input'
import axios from '../../axios'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import illustration from '../../assests/illustration-1.svg'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const registerSchema = yup.object({
  name: yup.string().min(3).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  password_confirmation: yup.string().oneOf([yup.ref('password') , null] , 'Konfirmasi password salah')
})

const RegisterComponent = () => {
    const history = useHistory()
    const {register, handleSubmit , formState: {errors}} = useForm({
      resolver: yupResolver(registerSchema)
    })

    
    const onSubmit = async (data) => {
        let response = await axios.post("/users/register" , data)
        if(response.status === 201) history.push('/auth/login')
    }
    
    return (
      <div className='min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-gray-100 text-gray-900 flex justify-center'>
      {/* {isAuth() ? <Redirect to='/' /> : null} */}
      <ToastContainer />
        <div className='max-w-screen-xl dark:bg-gray-700 m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign Up for Tivash
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex-1 mt-8 text-teal-500'>
                  <div className='mx-auto mb-4 max-w-xs relative '>
                      <label className="mb-1 block">Nama</label>
                  <input {...register('name')} type="text" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 ark:border-gray-800 dark:focus:bg-gray-700 transition duration-200' />
                      <small className="error text-red-400 font-bold">{errors.name?.message}</small>
                  </div>
                  <div className='mx-auto mb-4 max-w-xs relative '>
                      <label className="mb-1 block">Email</label>
                      <input {...register('email')}  type="email" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 ark:border-gray-800 dark:focus:bg-gray-700 transition duration-200' />
                      <small className="error text-red-400 font-bold">{errors.email?.message}</small>
                  </div>
                  <div className='mx-auto mb-4 max-w-xs relative '>
                    <label className="mb-1 block">Password</label>
                    <input {...register('password')}  type="password" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 ark:border-gray-800 dark:focus:bg-gray-700 transition duration-200' />
                      <small className="error text-red-400 font-bold">{errors.password?.message}</small>
                  </div>
                  <div className='mx-auto mb-4 max-w-xs relative '>
                      <label className="mb-1 block">Konfirmasi Password</label>
                      <input {...register('password_confirmation')}  type="password" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-600 ark:border-gray-800 dark:focus:bg-gray-700 transition duration-200' />
                      <small className="error text-red-400 font-bold">{errors.password_confirmation?.message}</small>
                  </div>
                <button className='mt-5 mx-auto mb-4 max-w-xs relative tracking-wide font-semibold bg-teal-400 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none dark:bg-teal-600'>Daftar</button>
              </form>
              <p className="mt-4">
                  Sudah punya akun?
                  <Link to="/auth/login">
                      <span className="text-teal-400 ml-3">
                          Login
                      </span>
                  </Link>
              </p>


            {/* //<form
            //   className='w-full flex-1 mt-8 text-teal-500'
            //   onSubmit={handleSubmit}
            // >
            //   <div className='mx-auto max-w-xs relative '>
            //     <input
            //       className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
            //       type='text'
            //       placeholder='Name'
            //       name="name"
            //     //   onChange={handleChange('name')}
            //       // value={name}
            //     />
            //     <input
            //       className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
            //       type='email'
            //       placeholder='Email'
            //       name="email"
            //     //   onChange={handleChange('email')}
            //     //   value={email}
            //     />
            //     <input
            //       className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
            //       type='password'
            //       placeholder='Password'
            //       name="password"
            //     //   onChange={handleChange('password1')}
            //     //   value={password1}
            //     />
            //     <input
            //       className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
            //       type='password'
            //       placeholder='Confirm Password'
            //       name="password_confirmation"
            //     //   onChange={handleChange('password2')}
            //     //   value={password2}
            //     />
            //     <button
            //       type='submit'
            //       className='mt-5 tracking-wide font-semibold bg-teal-500 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
            //     >
            //       <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
            //       <span className='ml-3'>Sign-Up</span>
            //     </button>
            //   </div>
            //   <div className='my-12 border-b text-center'>
            //     <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
            //       Or sign with email or social login
            //     </div>
            //   </div>
            //   <div className='flex flex-col items-center'>
            //     <a
            //       className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
            //       bg-teal-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
            //       // href='/login'
            //       target='_self'
            //     >
            //       <Link to="/auth/login">
            //       <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-teal-500' />
            //       <span className='ml-4'>Sign In</span>
            //       </Link>
            //     </a>
            //   </div>
            // </form> */}
          </div>
        </div>
        <div className='flex-1 bg-teal-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${""})` }}
          >
            <img className="w-full h-screen" alt="illustration" src={illustration} />
          </div>
        </div>
      </div>
      ;
    </div>
    )
}

export default RegisterComponent
