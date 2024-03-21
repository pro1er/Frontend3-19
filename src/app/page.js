"use client"
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading/page';

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const API_URL = 'http://localhost:8080';
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [school, setSchool] = useState('');
  const [class_name, setClass_name] = useState('');
  const [gpa, setGpa] = useState('');
  const [visibleItemId, setVisibleItemId] = useState(null); // State to track the visible item for update
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    router.push('/Logout');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/students`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error(response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/students/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        fetchData(); 
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast.error(error.response.data);
      }
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/students/${id}`, {
        firstname,
        lastname,
        age,
        gender,
        school,
        class_name,
        gpa,
      });

      if (response.status === 200) {
        toast.success(response.data);
        fetchData(); // Fetch updated data after successful update
        setVisibleItemId(null); // Close the form after successful update
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast.error(error.response.data);
      }
    }
  };

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className='w-full h-screen flex items-center flex-col'>
      <a href='/Login' className='h-14 w-[320px bg-orange-500 rounded-md text-white shadowyellow rounded-tr my-8 p-4'>
        Нэвтрэх
      </a>
      <a href='/Add' className='h-14 w-[320px bg-orange-500 rounded-md text-white shadowyellow rounded-tr my-8 p-4'>
        Сурагч нэмэх
      </a>
      {data.length === 0 ? (
        <p>Сурагчийн мэдээлэл алга</p>
      ) : (
      <table className='border-2'>
        <thead className=' bg-black text-white'>
          <tr>
            <th className=' border-2 p-2'>ID</th>
            <th className=' border-2 p-2'>Нэр</th>
            <th className=' border-2 p-2'>Овог</th>
            <th className=' border-2 p-2'>Нас</th>
            <th className=' border-2 p-2'>Хүйс</th>
            <th className=' border-2 p-2'>Сургууль</th>
            <th className=' border-2 p-2'>Class</th>
            <th className=' border-2 p-2'>Голч Дүн/4.0/</th>
            <th className=' border-2 p-2'>Нээсэн он сар</th>
            <th className=' border-2 p-2'>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className=' border-2 p-2'>{item.id}</td>
              <td className=' border-2 p-2'>{item.firstname}</td>
              <td className=' border-2 p-2'>{item.lastname}</td>
              <td className=' border-2 p-2'>{item.age}</td>
              <td className=' border-2 p-2'>{item.gender}</td>
              <td className=' border-2 p-2'>{item.school}</td>
              <td className=' border-2 p-2'>{item.class_name}</td>
              <td className=' border-2 p-2'>{item.gpa}</td>
              <td className=' border-2 p-2'>{item.created_date}</td>
              <td className=' border-2 p-2'>
                <div className='flex gap-4'>
                <button
                  className='h-10 w-20 bg-orange-500 rounded-md text-white shadowyellow rounded-tr my-1 p-2'
                  onClick={() => handleDelete(item.id)}>
                    Устгах
                </button>
                <button
                  className='h-10 w-20 bg-cyan-500 rounded-md text-white shadowyellow rounded-tr my-1 p-2'
                  onClick={() => {
                    setVisibleItemId(item.id),
                      setFirstname(item.firstname);
                      setLastname(item.lastname);
                      setAge(item.age);
                      setGender(item.gender);
                      setSchool(item.school);
                      setClass_name(item.class_name);
                      setGpa(item.gpa);
                    }}>
                      Шинэчлэх
                </button>
                </div>
                <ToastContainer />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {visibleItemId && (
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <button
            className=' absolute top-0  left-0 h-10 w-20 bg-orange-500 rounded-md text-white shadowyellow rounded-tr my-1 p-2'
            onClick={() => setVisibleItemId(!visibleItemId)}>
            Буцах
          </button>          
          <div className='bg-white p-8 rounded-md'>
            <input
              placeholder='Нэр оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              placeholder='Овог оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              placeholder='Нас оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select
              name='Хүйс'
              id='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'>
              <option value='Male'>Эр</option>
              <option value='Female'>Эм</option>
              <option value='Other'>Бусад</option>
            </select>
            <input
              placeholder='Сургууль оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={school}
              onChange={(e) => setSchool(e.target.value)}
            />
            <input
              placeholder='Анги оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={class_name}
              onChange={(e) => setClass_name(e.target.value)}
            />
            <input
              placeholder='Голч дүн оруулах'
              className='h-10 w-40 pl-4 rounded-md mx-1 border-2'
              value={gpa}
              onChange={(e) => setGpa(e.target.value)}
            />
            <button
              className='h-10 w-40 bg-orange-500 rounded-md text-white shadowyellow rounded-tr mt-4 p-2'
              onClick={() => handleUpdate(visibleItemId)}>
              Шинэчлэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
