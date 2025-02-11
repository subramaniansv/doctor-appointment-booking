import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(userData.image || '');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address)); 
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      
      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block relative cursor-pointer">
              <img className="w-36 rounded opacity-75" src={imagePreview} alt="Profile" />
              <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt="Upload Icon" />
            </div>
            <input type="file" id="image" hidden onChange={handleImageChange} />
          </label>
        ) : (
          <img className="w-36 rounded" src={userData.image} alt="Profile" />
        )}

        {isEdit ? (
          <input
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
        )}

        <hr className="bg-zinc-400 h-[1px] border-none" />

        {/* Contact Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email ID:</p>
            <p className="text-blue-500">{userData.email}</p>

            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="tel"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}

            <p className="font-medium">Address:</p>
            {isEdit ? (
              <div>
                <input
                  className="bg-gray-100 max-w-52 mb-1"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  className="bg-gray-100 max-w-52"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div>
          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}

            <p className="font-medium">DOB:</p>
            {isEdit ? (
              <input
                className="max-w-28 bg-gray-100"
                type="date"
                value={userData.dob}
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
              />
            ) : (
              <p className="text-gray-400">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10">
          {isEdit ? (
            <button
              className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all"
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-[#5f6fff] px-8 py-2 rounded-full hover:bg-[#5f6fff] hover:text-white transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;
