import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    <div className='w-full md:w-full'>
      
    <nav className=' bg-blue-500 p-5 text-2xl border border-black'>
        <ul className='w-full'>
            <li className='text-white cursor-pointer '><Link to="/" >Home</Link></li>
        </ul>
    </nav>
    </div>
    </>
  )
}

export default Navbar