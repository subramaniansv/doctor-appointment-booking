import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import Related from "../components/Related";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors,currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON','TUE','WED','THU','FRI','SAT']
  
  const [docInfo, setDocInfo] = useState(null);
  const[docSlots, setDocSlots] = useState([])
  const[slotIndex, setSlotIndex] = useState(0)
  const[slotTime,setSlotTime] = useState('')


  const getAvailableSLots = async ()=>{
    setDocSlots([])

    let today = new Date()
    for (let i =0; i<7 ; i++){
      let currentDate = new Date (today)
      currentDate.setDate(today.getDate()+i)

      let endTime =  new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0) 

      if(today.getDate()=== currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() >10 ? currentDate.getHours() +1 :10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ?30:0)
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots = []
      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }
  useEffect(()=>{
    getAvailableSLots()
  },[docInfo]);

  useEffect(() => {
    const docData = doctors.find((doc) => doc._id === docId);
    setDocInfo(docData);
  }, [doctors, docId]);
  useEffect(()=>{
    console.log(docSlots);
    
  },[docSlots])

  if (!docInfo) {
    return <p className="text-center text-gray-500">Loading doctor details...</p>;
  }

  return (
    <div className="">
  <div className="p-6 bg-white rounded-lg shadow-md flex flex-col justify-between h-full mb-10">
    {/* Doctor Profile Section */}
    <div className="flex gap-6 items-center mb-6">
      {/* Doctor Image */}
      <div className="w-75 h-75 overflow-hidden rounded-lg bg-[#5f6fff]">
        <img src={docInfo.image} alt={`${docInfo.name}`} className="w-full h-full object-cover" />
      </div>
  
      {/* Doctor Info Section */}
      <div className="flex flex-col justify-between w-full">
        {/* Name & Verification */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{docInfo.name}</p>
          <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" />
        </div>
  
        {/* Degree, Specialty & Experience */}
        <p className="text-gray-700 text-lg">{docInfo.degree} - {docInfo.speciality}</p>
        <button className="mt-2 px-1 py-2 text-white bg-blue-500 rounded-lg text-sm w-25">
          {docInfo.experience}
        </button>
  
        {/* About Section */}
        <div className="mt-3">
          <p className="flex items-center gap-1 text-gray-700 font-semibold">
            About <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
          </p>
          <p className="text-gray-600 text-sm">{docInfo.about}</p>
        </div>
        <p className="text-gray-500 font-medium mt-4">
          Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span>
        </p>
      </div>
    </div>
  
  </div>
  
    {/* Booking Slots Section */}
    <div className="mt-auto font-medium text-gray-700">
      <p>Booking Slots</p>
  
      {/* Date Selection */}
      <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
        {docSlots.length &&
          docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? "bg-[#5f6fff] text-white" : "border border-gray-200"
              }`}
              key={index}
            >
              <p className="text-sm font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className="text-sm font-light">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
      </div>
  
      {/* Time Slot Selection */}
      {docSlots.length && (
        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                item.time === slotTime ? "bg-[#5f6fff] text-white" : "border border-gray-200"
              }`}
              key={index}
            >
              {/* Display only time */}
              {item.time}
            </p>
          ))}
        </div>
      )}
      <button className="bg-[#5f6fff] text-white p-10 rounded-full my-6 ">Book an Appointment</button>
    </div>
  <Related docId={docId} speciality={docInfo.speciality}/>
  </div>

  );
};

export default Appointment;
