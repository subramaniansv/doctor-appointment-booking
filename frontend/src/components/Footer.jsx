import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>It's a dummy fake website just made for educational purpose and dont make any original payment which will not be returned</p>
            </div>


            <div className="">
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy & Policy</li>
                </ul>
            </div>


            <div className="">
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91 9843471463</li>
                    <li>subramaniansv02@gmail.com</li>
                </ul>
            </div>
        </div>
        <div className="">
            <hr />
            <p className='py-5 text-sm text-center'>Copyrights Subramanian | All rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer