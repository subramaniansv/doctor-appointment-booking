import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
  const {aToken} = useContext(AdminContext)
  return (
    <div className='min-h-screen bg-white border-r'>
      {aToken &&
       <ul className='text-[#515151] mt-5 '>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]':''}`} to={'admin-dashboard'}>
          <img className='' src={assets.home_icon} alt="" />
          <p className=''>Dashboard</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]':''}`} to={'all-appointments'}>
          <img className='' src={assets.appointment_icon} alt="" />
          <p className=''>Appointments</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]':''}`} to={'add-doctor'}>
          <img className='' src={assets.add_icon} alt="" />
          <p className='' >Add Doctor</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff]':''}`} to={'doctor-list'}>
          <img className='' src={assets.people_icon} alt="" />
          <p className='' >Doctor List</p>
        </NavLink>
        </ul>}

    </div>
  )
}

export default Sidebar