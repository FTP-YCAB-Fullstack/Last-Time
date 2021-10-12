import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../components/auth/Input'
import axios from '../../axios'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Register = () => {
    const history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let {email , password , name , password_confirmation} = e.target
        let data = {
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        }

        let response = await axios.post("/users/register" , data)
        if(response.status === 201) history.push('/auth/login')
    }
    
    return (
        // <div>
        //     <form onSubmit={handleSubmit} >
        //         <div>
        //             <label>Nama</label>
        //             <Input name="name" type="text" />
        //         </div>
        //         <div>
        //             <label>Email</label>
        //             <Input name="email" type="email" />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <Input name="password" type="password" />
        //         </div>
        //         <div>
        //             <label>Konfirmasi Password</label>
        //             <Input name="password_confirmation" type="password" />
        //         </div>
        //         <button>Daftar</button>
        //     </form>
        //     <p>
        //         Sudah punya akun?
        //         <Link to="/auth/login">
        //             <span className="text-blue-400">
        //                 Login
        //             </span>
        //         </Link>
        //     </p>
        // </div>

        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      {/* {isAuth() ? <Redirect to='/' /> : null} */}
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign Up for Tivash
            </h1>

            <form onSubmit={handleSubmit} className='w-full flex-1 mt-8 text-indigo-500'>
                 <div  className='mx-auto max-w-xs relative '>
                     <label>Nama</label>
                     <Input name="name" type="text" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'/>
               
                     <label>Email</label>
                     <Input name="email" type="email" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'/>
                 
                   <label>Password</label>
                     <Input name="password" type="password" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'/>
                 
                     <label>Konfirmasi Password</label>
                     <Input name="password_confirmation" type="password" className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'/>
                 </div>
             <button className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>Daftar</button>
             </form>
             <p>
                 Sudah punya akun?
                 <Link to="/auth/login">
                     <span className="text-blue-400">
                         Login
                     </span>
                 </Link>
             </p>

          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${""})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
    )
}

export default Register
