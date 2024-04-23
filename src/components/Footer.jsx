import React from 'react';

const Footer = () => {
    return (
        <div className='bg-gray-800 text-white flex justify-center items-center flex-col'>
            <div className="logo font-bold text-white">
                <span className='text-green-700 text-xl'>&lt;</span>

                Pass
                <span className='text-green-700'>OP / &gt;</span>

            </div>
            <div className='flex justify-center items-center'>created by AbhishekSoni with <img className='w-10 gap-3 px-2 py-1' src="icons/peace.png" alt="" /> by CodeWithHarry</div>
        </div>
    );
}

export default Footer;
