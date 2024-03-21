"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function page() {
    const API_URL = 'http://localhost:8080';
    const [id, setId] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [school, setSchool] = useState('');
    const [class_name, setClass_name] = useState('');
    const [gpa, setGpa] = useState('');
    const handleAdd = async () => {
        try {
            const response = await axios.post(`${API_URL}/students`, {
                id, firstname, lastname, age, gender, school, class_name, gpa
            });

            if (response.status === 200) {

                toast.success(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                toast.error(error.response.data, {
                    // toastId: 'success1',
                })
            }
        }
    };
    return (
        <div className='h-screen w-full flex justify-center items-center flex-col'>
            <a href='/' className='h-14 w-[320px bg-orange-500 rounded-md text-white shadowyellow rounded-tr my-8 p-4'>Гэр</a>            <div className='border-2 p-2'>
                <input
                    placeholder='ID оруулна уу'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    s value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    placeholder='Нэрийг оруулна уу'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <input
                    placeholder='Овог оруулна уу'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <input
                    placeholder='Насыг оруулна уу'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                {/* <input
                    placeholder='Enter Gender'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                /> */}
                <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Female">Other</option>
                </select>
                <input
                    placeholder='Сургуульд оруулна уу?'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
                <input
                    placeholder='Ангидаа орно'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={class_name}
                    onChange={(e) => setClass_name(e.target.value)}
                />
                <input
                    placeholder='Дундаж оноог оруулна уу'
                    className='h-14 w-40 pl-4 rounded-md mx-1 border-2'
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                />
            </div>
            <button
                className='h-14 w-[320px bg-orange-500 rounded-md text-white shadowyellow rounded-tr mt-8 p-4'
                onClick={handleAdd}
            >
                Нэмэх
                <ToastContainer />
            </button>
        </div>
    )
}
