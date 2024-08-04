import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around p-2 bg-slate-700 '>
      <img src="./src/logo white.png" alt="" width="65px"/>
      <img src="./src/favi.svg" alt="" width="34px" />
      {/* <div className="search flex gap-2">
      <input className="border-none rounded" type="search" name="" id="" placeholder='Search' />
      <button className='bg-green-300 border-none rounded px-2 hover:font-bold transition-all duration-20 cursor-pointer'>Search</button>
      </div> */}
    </nav>
  )
}

export default Navbar
