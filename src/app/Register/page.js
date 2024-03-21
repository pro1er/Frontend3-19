"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Page() {

  const API_URL = 'http://localhost:8080';

  const [visible, setVisible] = useState(false)
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        firstname,
        lastname,
        email,
        password,
      });
  
      if (response.status === 200) {
        toast.success(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast.error(error.response.data);
      } 
    }
  };
  

  
  return (
    <div className='w-full h-screen  py-8 px-16 bg-gray-100'>
      <div className='w-full h-full p-4 flex bg-gray-100 rounded-[40px]  justify-center '>
        <div className='w-[60%]'>
          <div className='w-full text-right pt-8 pr-20 text-sm'>Бүртгэлтэй юу? <a href='./Login' className='text-blue-500'>Одоо нэвтэрнэ үү</a></div>
          <div className='w-full flex flex-col items-center mt-[60px]'>
            <div className='w-[360px] flex justify-center flex-col'>
              <h1 className='text-[32px] font-semibold text-center mb-[20px]'>Энд бүртгүүлнэ үү</h1>
              <p className='text-black/80 mb-8 text-center'>Бүртгүүлэхийн тулд дэлгэрэнгүй мэдээллийг оруулна уу</p>
              <input
                placeholder='Хэрэглэгчийн нэрийг оруулна уу'
                className='h-14 w-full mb-4 pl-4 rounded-md'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                placeholder='Хэрэглэгчийн овог оруулна уу'
                className='h-14 w-full mb-4 pl-4 rounded-md'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <input
                placeholder='Имэйл оруулна уу'
                className='h-14 w-full mb-4 pl-4 rounded-md'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='relative flex items-center justify-end'>
                <input
                  placeholder='Нууц үгээ оруулна уу'
                  className='h-14 w-full pl-4 rounded-md'
                  type={`${visible ? 'text' : 'password'}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 absolute mr-4 opacity-40 ${visible ? "hidden" : "visible"} cursor-pointer`} onClick={() => setVisible(!visible)}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 absolute mr-4 opacity-40 ${visible ? "visible" : "hidden"} cursor-pointer`} onClick={() => setVisible(!visible)}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>

              </div>
              <button
                className='h-14 w-[320px bg-orange-500 rounded-md text-white shadowyellow rounded-tr mt-8'
                onClick={handleRegister}
              >
                Бүртгүүлэх
                <ToastContainer/>
              </button> 
              </div>
          </div>
        </div>
      </div>
    </div >
  )
}
