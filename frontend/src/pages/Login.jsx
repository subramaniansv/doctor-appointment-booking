import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios' 
import {useNavigate} from'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
  const[state ,setState] = useState('Sign Up')
  const [email,setEmail] = useState('');
  const navigate = useNavigate()
  const[password ,setPassword] = useState('')
  const [name,setName] = useState('');
  const {backendUrl, token, setToken} = useContext(AppContext)
  const onSubmitHandler= async (event)=>{
    event.preventDefault()
    try {
      if (state==='Sign Up') {
        const {data} = await axios.post(backendUrl +'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{toast.error(data.message)}
          
      
      }else{
        const {data} = await axios.post(backendUrl +'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{toast.error(data.message)}
        
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className='flex justify-center text-2xl font-semibold items-center text-[#5f6fff]'>{state === 'Sign Up' ? 'Create Account': 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'Sign Up': 'Login'} to book an appointment</p>
        {
          state ==='Sign Up'?
          <div className="w-full">
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'value={name} type="text" onChange={(e)=>{setName(e.target.value); } }/>
        </div>
        : ""}
        <div className="w-full">
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' value={email} type="email" onChange={(e)=>{setEmail(e.target.value); }}/>
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'  value={password} type="password" onChange={(e)=>{setPassword(e.target.value);}}/>
        </div>
        <button type='submit' className='bg-[#5f6fff] text-white w-full py-2 rounded-md text-base'>
  {state === 'Sign Up' ? 'Sign Up': 'Login'}
</button>

               {
          state ==="Sign Up"
          ?<p>Already an user?<span onClick={()=>setState('Login')} className='text-[#5f6fff] underline cursor-pointer'>Login here</span> </p>
          :<p>Create an Account? <span  onClick={()=>setState('Sign Up')} className='text-[#5f6fff] underline cursor-pointer'>click here</span></p>
        }
      </div>

    </form>
  )
}

export default Login