import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../redux/demoAuthSlice';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [ name , setName ] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { user , isAuthenticated} = useSelector((state) => state.demoAuth);
    console.log( user , isAuthenticated);
    const handleLogin = () => {
        dispatch(LoginUser({ name : name }));
        navigate("/home");
    }

    useEffect(() => {
        if(isAuthenticated){
            console.log("ture",isAuthenticated)
            navigate("/home")
        }else{
            navigate("/");
        }
    },[handleLogin])

  return (
    <>
    <div className="h-dvh w-full flex flex-col items-center justify-center">
        <h1 className='font-bold mb-10 text-2xl'>Login!</h1>
        <div className="border border-cyan-300 rounded-lg">
            <input type="text" placeholder='Enter Name...' value={name} onChange={(e) => setName(e.target.value)} className='p-3 border-none outline-none'/>
        </div>
        <button className='w-24 h-12 hover:cursor-pointer bg-blue-800 rounded-md mt-5 text-white' onClick={handleLogin}>Enter</button>
    </div>
    </>
  )
}

export default Login
