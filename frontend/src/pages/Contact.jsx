import React from 'react'
import {assets} from '../assets/assets_frontend/assets';

const Contact = () => {
  return (
    <div className="">
    <div className="text-center text-2xl pt-10 text-gray-500">
      <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
    </div>
    <div className="my-10 flex flex-col md:flex-row gap-12">
      <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
      <div className=" flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque voluptas perferendis quisquam ab numquam accusamus ut ad expedita sequi commodi. Sint, earum quaerat illum deleniti et cumque suscipit exercitationem unde!</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum enim odit impedit sunt laborum inventore totam voluptate dolor tenetur modi soluta aliquid, doloremque eius autem magni culpa? Facilis, repellat aut.</p>
        <b className='text-gray-500'>summa</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos repellendus corporis cum commodi, fugit provident aliquid dolorem est iusto repellat cupiditate rerum, pariatur necessitatibus asperiores! Fugiat optio maxime at iste.</p>
      </div>
    </div>
  </div>
  )
}

export default Contact