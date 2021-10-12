import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux' 
import { authLogin } from '../../redux/actions/auth'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Login = ({informParent = f => f , clientId, apiUrl}) => {
    const dispatch = useDispatch()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        let {email , password} = e.target
        let data = {
            email: email.value,
            password: password.value,
        }
        dispatch(authLogin(data))
    }

    // const Google = ({ informParent = f => f , clientId, apiUrl}) => {
    //   console.log(clientId);

    const responseGoogle = response => {
      console.log(response);
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_GOOGLE_CLIENT}/google-login`,
        data: { idToken: response.tokenId }
      })
        .then(response => {
          console.log('GOOGLE SIGNIN SUCCESS', response);
          // inform parent component
          informParent(response);
        })
        .catch(error => {
          console.log('GOOGLE SIGNIN ERROR', error.response);
        });
    };
    const fall = response =>{
      console.log("salah bro")
    }
    
    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label>Email</label>
        //             <input className="border-2 border-gray-200" name="email" type="email" />
        //         </div>
        //         <div>
        //             <label>Password</label>
        //             <input className="border-2 border-gray-200" name="password" type="password" />
        //         </div>
        //         <button type="submit" >Login</button>
        //     </form>
        //     <p>
        //         Belum punya akun? 
        //         <Link to="/auth/register" >
        //             <span className="text-blue-400">
        //                 Register
        //             </span>
        //         </Link>
        //     </p>
        // </div>
        <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign In for Tivash
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              <div className='flex flex-col items-center'>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={fall}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                //   callback={responseFacebook}
                  render={renderProps => (
                    <button
                      // onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </button>
                  )}
                />
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
                  bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/register'
                  target='_self'
                >
                  <Link to="/auth/register" >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </Link>
                </a>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign In with e-mail
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" name="email" type="email" />
                </div>
                <div>
                    <label>Password</label>
                    <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" name="password" type="password" />
                </div>
                <button type="submit" className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'>Login</button>
            </form>
            <p>
                Belum punya akun? 
                <Link to="/auth/register" >
                    <span className="text-blue-400">
                        Register
                    </span>
                </Link>
            </p>

    {/* //           <form
    //             className='mx-auto max-w-xs relative '
    //             onSubmit={handleSubmit}
    //           >
    //             <input
    //               className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
    //               type="email"
    //               name="email"
    //               placeholder='Email'
    //             //   onChange={handleChange('email')}
    //             //   value={email}
    //             />
    //             <input
    //               className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
    //               type='password'
    //               name="password"
    //               placeholder='Password'
    //             //   onChange={handleChange('password1')}
    //             //   value={password1}
    //             />
    //             <button
    //               type='submit'
    //               className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
    //             >
    //               <i className='fas fa-sign-in-alt  w-6  -ml-2' />
    //               <span className='ml-3'>Sign In</span>
    //             </button>
    //             <Link
    //               to='/users/password/forget'
    //               className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
    //             >
    //               Forget password?
    //             </Link>
    //           </form> */}
            </div>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            // style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
      </div>
      ;
    </div>
    )
                  // }
                
}

export default Login
