import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { SERVERURL, LOGIN, LOADING, INPUT, SIGNUP } from '../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'


function Login() {
  let navigate = useNavigate()
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [error,setError]=useState(false)

  let dispatch = useDispatch()
  let {userData} = useSelector(state=>state.user)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result = await axios.post(`${SERVERURL}/api/auth/login`, { email, password }, { withCredentials: true })
      dispatch(setUserData(result.data))
      setEmail("")
      setPassword("")
      setLoading(false)
      setError("")


    } catch (error) {  
      console.log(LOGIN.ERROR, error)
      setLoading(false)
      setError(error?.response?.data?.message)
    }
  }


  return (
    <div className='w-full h-screen bg-[#d5f4ec] flex items-center justify-center'>
      <div className='w-full max-w-125 h-150 bg-white rounded-lg  shadow-gray-400 shadow-2xl flex flex-col gap-7.5'>
        <div className='w-full h-50 bg-[#77c8b4] rounded-b-[30%] shadow-gray-400 shadow-2xl flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-3xl'>Login To <span className='text-white'>Lita</span></h1>
        </div>
        <form onSubmit={handleLogin} className='w-full flex flex-col gap-5 items-center'>
          <input type="text" placeholder={INPUT.EMAIL} onChange={(e) => setEmail(e.target.value)} value={email} className='w-[90%] h-12.5 outline-none border-2 border-[#77c8b4] px-5 py-2.5 bg-white rounded-2xl shadow-gray-300 shadow-lg' />
          <div className='w-[90%] h-12.5 border-2 border-[#77c8b4] overflow-hidden rounded-2xl shadow-gray-300 shadow-lg relative'>
            <input type={`${show ? "text" : "password"}`} placeholder={INPUT.PASSWORD} onChange={(e) => setPassword(e.target.value)} value={password} className='w-full h-full outline-none  px-5 py-2.5 bg-white  ' />
            <span className='absolute top-2.5 right-5 text-[16px] text-[#56ad98] font-semibold cursor-pointer ' onClick={() => { setShow(prev => !prev) }}>
              {`${show ? "Hide" : "Show"}`}
            </span>
          </div>
        {error && <p className='text-red-500'>{error}</p>}
          <button disabled={loading} className='px-5 py-2.5 bg-[#77c8b4] rounded-2xl shadow-gray-300 shadow-lg w-50 mt-5 font-semi-bold hover:shadow-inner '>{loading ? LOADING: LOGIN.LOGIN}</button>
          <p className='text-red-500 text-sm font-medium'></p>
          <p onClick={() => navigate("/signup")} className='cursor-pointer'>
            Don't have an Account? <span className='text-[#56ad98] text-bold'>{SIGNUP.SIGNUP}</span>
          </p>
        </form>
      </div>
    </div>
  )
}


export default Login