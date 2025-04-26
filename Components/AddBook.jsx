import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddBook({ visible }) {

    const navigate = useNavigate()

    const [ title , setTitle ] = useState()
    const [ auther , setAuther ] = useState()
    const [ description , setDescription ] = useState()
    const [ rating , setRating ] = useState(0)


    const handleBook = async(e) => {
        e.preventDefault();
        try{
            setAuther('');
            setDescription('');
            setTitle('');
            setRating('');
            const data = { title , auther , description , rating };
            console.log(data);
            const res = await axios.post("/api/books",{data});
            console.log("book added",res);
            toast.success("Book Added" , { position:"top-right" , autoClose: 1200 , onClose : () => window.location.reload() })
        }catch(err){
            toast.error("error adding the book" , { position : "top-right" , autoClose : 1200})
            alert("Error" || err);
        }
    }

  return (
    <div className="absolute flex flex-col items-center justify-center top-0 left-0 h-dvh text-white w-full bg-black">
        <ToastContainer />
        <button className='absolute top-20 right-25 p-2 bg-red-600 rounded-md hover:cursor-pointer' onClick={() => visible()}>Close</button>
        <h1 className='text-white font-bold text-3xl'>Add New Book</h1>
        <div className="p-5 w-[50vw] max-sm:w-[70vw]">
            <form onSubmit={handleBook}>
                <fieldset className='border p-2 border-cyan-200 rounded-md'>
                    <legend className='px-5'>Title</legend>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter title.........' className='px-3 w-full border-none outline-none'/>
                </fieldset>
                <fieldset className='border p-2 mt-5 border-cyan-200 rounded-md'>
                    <legend className='px-4'>Auther</legend>
                    <input type="text" value={auther} onChange={(e) => setAuther(e.target.value)} placeholder='Enter Auther Name.........' className='w-full px-3 border-none outline-none'/>
                </fieldset>
                <fieldset className='border p-2 mt-5 border-cyan-200 rounded-md'>
                    <legend className='px-3'>Description</legend>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Enter Description.........' className='w-full p-3 border-none outline-none'/>
                </fieldset>
                <fieldset className='border p-2 mt-5 border-cyan-200 rounded-md'>
                    <legend className='px-5'>Rating</legend>
                    <input type="number" max="5" min="1" value={rating} onChange={(e) => setRating(e.target.value)} placeholder='Enter Rating.........' className='w-full px-3 border-none outline-none'/>
                </fieldset>
                <button className='w-full bg-red-600 mt-5 p-5 font-black text-white text-2xl rounded-xl'>Add Book</button>
            </form>
        </div>
    </div>
  )
}

export default AddBook