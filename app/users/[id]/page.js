"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image"; 
import Link from "next/link";
import Loading from '@/app/loading';

const getUser = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`);
  if (!response.ok) {
    throw new Error('Kullanıcı bulunamadı.');
  }
  return await response.json();
}

const UserDetails = ({ params }) => {
  const [user, setUser] = useState(null);
  const { id } = params; // Kullanıcı parametresiyle kullanıcı bilgisini al

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        setUser(userData);
      } catch (error) {
        console.error('Bir hata oluştu:', error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (!user) {
    return <div><Loading/></div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="usrr  bg-gray-200 mt-5 mb-5 rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-500">Kullanıcı Detayları</h1>
        <Image
                    src="/user.jpg"
                    width={120}
                    height={120}
                    alt="User Avatar"
                    className="rounded-md block mx-auto"
                  />
        <div className='ml-5'>
          <p className="font-bold text-gray-500">Kullanıcı Adı</p>
          <p className='text-lime-700 font-semibold'>{user.username}</p>
        </div>
        <div  className='ml-5'>
          <p className="font-bold text-gray-500">E-posta</p>
          <p className='text-lime-700 font-semibold'>{user.email}</p>
        </div>
        <div  className='ml-5'>
          <p className="font-bold text-gray-500">Telefon</p>
          <p className='text-lime-700 font-semibold'>{user.phone}</p>
        </div>
        <div  className='ml-5'>
          <p className="font-bold text-gray-500">Adres</p>
          <p className='text-lime-700 font-semibold'>{`${user.address.street}, ${user.address.number}, ${user.address.city}, ${user.address.zipcode}`}</p>
        </div>
        <div  className='ml-5'>
          <p className="font-bold text-gray-500">Şehir</p>
          <p className='text-lime-700 font-semibold'>{`${user.address.city}`}</p>
        </div>
        <div  className='ml-5'>
          <p className="font-bold text-gray-500">Sokak</p>
          <p className='text-lime-700 font-semibold pb-5'>{`${user.address.street}`}</p>
        </div>
       
        <Link className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center bg-gray-500 ml-5 mr-5  ' href={`/`}>Geri Dön</Link>
      </div>
    </div>
  );
}

export default UserDetails;
