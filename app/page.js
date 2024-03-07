"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image"; 
import { AiOutlineLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      if (!response.ok) {
        throw new Error('API isteği başarısız oldu.');
      }
      const data = await response.json();
      // Her kullanıcıya başlangıçta 0 oy verildi
      const initialUsers = data.map(user => ({ ...user, votes: 0 }));
      setUsers(initialUsers);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    }
  };

  const vote = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, votes: user.votes + 1 };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const unvote = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId && user.votes > 0) {
        return { ...user, votes: user.votes - 1 };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const sortedUsers = users.slice().sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex justify-center items-center">
      <div className="usr text-center bg-gray-200 mt-5 mb-5 rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-500">Çalışanlar</h1>
        <ul className='pl-3 pr-3'>
          {sortedUsers.map(user => (
           <li key={user.id} className="user-item flex justify-between items-center border-b-2 pb-3 mb-4">

              <Link href={`/users/${user.id}`}>
                
                  <Image
                    src="/user.jpg"
                    width={120}
                    height={120}
                    alt="User Avatar"
                    className="rounded-md"
                  />
                  <p className='ml-3 font-bold text-gray-500'>{user.username}</p>
               
              </Link>
              <div> <p className='text-lime-600 font-bold '>{user.votes}</p></div>
              <div>
               
                <button onClick={() => vote(user.id)} className="flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-12 mr-2 mb-2"><AiOutlineLike /></button>
                <button onClick={() => unvote(user.id)} className="flex justify-center items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-12"><AiFillDislike /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
