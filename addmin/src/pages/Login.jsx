import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const {setAToken, backendUrl} = useContext(AdminContext)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const onSubmitHandler= async (event) => {
    event.preventDefault()

    try {
      if(state==='Admin'){
        const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
        if (data.success){
          localStorage.setItem('aToken',data.token)
          setAToken(data.token);
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }

      }else{

      }
    } catch (error) {
      
    }
  }



  return (
    <form onSubmit={onSubmitHandler}className="min-h-[80vh] flex items-center" action="" >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-sm text-[#5e5e5e] shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5f6fff]">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </div>
        <div className="w-full">
          <p>Password</p>
          <input className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
        </div>
        <button className="bg-[#5f6fff] text-white w-full py-2 rounded-md text-base hover:text-[#5f6fff] hover:bg-white transition-all duration-300 hover:border hover:border-[#5f6fff]">
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              onClick={() => setState('Doctor')}
              className="text-[#5f6fff] cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              onClick={() => setState('Admin')}
              className="text-[#5f6fff] cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
