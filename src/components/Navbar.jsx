import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="mycontainer flex items-center px-4 h-14 py-5 justify-between">

        <div><div className="logo font-bold text-white">
          <span className='text-green-700 text-xl'>&lt;</span>

          Pass
          <span className='text-green-700'>OP / &gt;</span>

        </div></div>
        <ul>
          {/* <li className="flex gap-5">
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact Us</a>
          </li> */}
        </ul>
        <button className='bg-green-800 text-white flex justify-between items-center rounded-full p-1 ring-white ring-1 my-5'>
          <img className='invert p-1 w-10 h-10' src="/icons/github.png" alt="github logo" /><span className=' px-2 font-bold'>GitHub</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
