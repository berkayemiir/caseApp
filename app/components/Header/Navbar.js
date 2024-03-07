import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='flex items-center h-16 bg-gray-500'>
        <Link href={"/"} className='font-bold text-3xl ml-4 text-gray-200'>CaseApp</Link>
    </div>
  )
}
