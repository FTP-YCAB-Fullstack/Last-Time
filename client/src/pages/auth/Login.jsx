import React, { useState, Component , useEffect} from 'react'
import axios from 'axios'
import { Link , useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux' 
import { authLogin , setLogin } from '../../redux/actionss/auth'
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import illustration from '../../assests/illustration-1.svg'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import queryString from "query-string";

const loginSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

const Login = ({informParent = f => f , clientId, apiUrl}) => {
    const dispatch = useDispatch()
    const [errMessage, setErrMessage] = useState(null)
    const [loading , setLoading] = useState(false)
    const {register, handleSubmit , formState: {errors}} = useForm({
      resolver: yupResolver(loginSchema)
    })
    
    const onSubmit = async (data) => {
        setLoading(true)
        let response = await dispatch(authLogin(data))
        if(response) {
          setLoading(false)
        }
        if(response.status === 400) {
          setErrMessage(response.message)
        }
    }

    // const Google = ({ informParent = f => f , clientId, apiUrl}) => {
    //   console.log(clientId);

    const responseGoogle = response => {
      // console.log(response);
      // axios({
      //   method: 'POST',
      //   url: `${process.env.REACT_APP_GOOGLE_CLIENT}/google-login`,
      //   data: { idToken: response.tokenId }
      // })
      //   .then(response => {
      //     console.log('GOOGLE SIGNIN SUCCESS', response);
      //     // inform parent component
      //     informParent(response);
      //   })
      //   .catch(error => {
      //     console.log('GOOGLE SIGNIN ERROR', error.response);
      //   });
    };
    const fall = response =>{
      // console.log("salah bro")
    }

  const [mounted, setMounted] = useState(false)
  const history = useHistory()
  if (!mounted) {
    var query = queryString.parse(history.location.search);
    if(query) {
      if (query.payload) {
        const payload = JSON.parse(query.payload)
        // console.log(payload)
        dispatch(setLogin(payload))
        // window.localStorage.setItem("jwt", query.token);
        // this.props.history.push("/");
      }
    }
  }
    
    useEffect(() => {
      setMounted(true)
    } , [])
    // componentWillMount() {
    //   var query = queryString.parse(this.props.location.search);
    //   if (query.token) {
    //     window.localStorage.setItem("jwt", query.token);
    //     this.props.history.push("/");
    //   }
    // };
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
    <div className='min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 overflow-hidden sm:m-20 bg-white dark:text-gray-200 dark:bg-gray-700 shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign In for Tivash
            </h1>
            <div className='w-full flex-1 mt-8 text-teal-500'>
              <div className='flex flex-col items-center'>
                {/* <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={fall}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <a href="http://localhost:8000/auth/google" className="button"></a>
                    // <button
                    //   onClick={renderProps.onClick}
                    //   disabled={renderProps.disabled}
                    //   className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-teal-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    // >
                    //   <div className=' p-2 rounded-full '>
                    //     <i className='fab fa-google ' />
                    //   </div>
                    //   <span className='ml-4'>Sign In with Google</span>
                    // </button>

                  )}
                ></GoogleLogin> */}
                {/* <FacebookLogin
                  appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                  autoLoad={false}
                //   callback={responseFacebook}
                  render={renderProps => (
                    <button
                      // onClick={renderProps.onClick}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-teal-100 text-gray-800 flex items-center justify-center transition-all dark:bg-teal-600 dark:text-teal-200 dark:hover:bg-teal-500 duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-facebook' />
                      </div>
                      <span className='ml-4'>Sign In with Facebook</span>
                    </button>
                  )}
                /> */}
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                
                {errMessage? 
                    <div className="bg-red-50 dark:bg-red-700 dark:text-red-300 rounded-md border mb-4 border-red-500 p-4 text-red-500 text-center">{errMessage}</div>
                : null}
                <div className="mb-4">
                    <label>Email</label>
                    <input {...register('email')} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-800 placeholder-gray-500 text-sm focus:outline-none dark:focus:bg-gray-700 focus:border-gray-400 focus:bg-white transition duration-200"  type="email" />
                    <small className="error text-red-400 font-bold">{errors.email?.message}</small>
                </div>
                <div>
                    <label>Password</label>
                    <input {...register('password')} className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-800 placeholder-gray-500 text-sm focus:outline-none dark:focus:bg-gray-700 focus:border-gray-400 focus:bg-white transition duration-200" type="password" />
                    <small className="error text-red-400 font-bold">{errors.password?.message}</small>
                </div>
                  <button type="submit" disabled={loading ? true : false} className={ (loading ? "opacity-75 " : "") + ' mt-5 tracking-wide disabled:opacity-50 font-semibold bg-teal-400 dark:bg-teal-600 text-gray-100 w-full py-4 rounded-lg hover:bg-teal-500 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'}>
                    {
                      loading ?
                        <svg version="1.1" className="h-6 w-6 animate-spin" strokeWidth="4px" id="L9" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          viewBox="0 0 100 100" enableBackground="new 0 0 0 0" >
                          <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                          </path>
                        </svg>
                      : ""
                    }
                  Login
                </button>
            </form>

                <div className='my-12 border-b text-center'>
                  <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                    Or sign In with e-mail
                  </div>
                </div>
          
                <div className="w-full mx-auto flex-col flex items-center justify-center">
                  <Link to="/auth/register">
                    <div
                      className='w-screen max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-teal-100 dark:bg-teal-600 dark:text-teal-200 dark:hover:bg-teal-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                      target='_self'
                    >
                      <Link to="/auth/register" >
                        <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-teal-500' />
                        <span className='ml-4'>Sign Up</span>
                      </Link>
                    </div>
                  </Link>
                  <div >
                    <a href={process.env.REACT_APP_API+"auth/google"} >
                      <div className='w-screen max-w-xs font-bold shadow-sm rounded-lg py-3
                    bg-teal-100 dark:bg-teal-600 dark:text-teal-200 dark:hover:bg-teal-500 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'>
                        <span class="svgIcon t-popup-svg">
                          <svg
                            class="svgIcon-use"
                            width="25"
                            height="37"
                            viewBox="0 0 25 25"
                          >
                            <g fill="none" fill-rule="evenodd">
                              <path
                                d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                fill="#4285F4"
                              />
                              <path
                                d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                fill="#34A853"
                              />
                              <path
                                d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                fill="#FBBC05"
                              />
                              <path
                                d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                fill="#EA4335"
                              />
                            </g>
                          </svg>
                        </span>
                        <span class="button-label">Sign in with Google</span>
                      </div>
                    </a>
                  </div>
                </div>
            {/* <p>
                Belum punya akun? 
                <Link to="/auth/google" > 
                <a target="_blank" href="/auth/google">
                    <span className="text-black-400">
                        Register
                    </span>
                </a>
                </Link>
            </p> */}
            </div>
          </div>
        </div>
        <div className='flex-1 bg-teal-100 dark:bg-teal-800 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            // style={{ backgroundImage: `url(${authSvg})` }}
          >
            <img className="w-full h-screen" alt="illustration" src={illustration} />
          </div>
        </div>
      </div>
      
    </div>
    )
                  // }
                
}

export default Login
