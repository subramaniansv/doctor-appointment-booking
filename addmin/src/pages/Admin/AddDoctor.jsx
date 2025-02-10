import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [education, setEducation] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);
  console.log(aToken +'a token from frontend');
  
  //api call
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
        if (!docImg) {
            return toast.error("Image not selected");
        }

        const address = { line1: address1, line2: address2 }; // Define address object

        const formData = new FormData();
        formData.append('image', docImg); // Use docImg, not selectedImage
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('fees', fees);
        formData.append('experience', experience);
        formData.append('about', about);
        formData.append('speciality', speciality);
        formData.append('address', JSON.stringify(address)); // Now, address is defined

        const response = await axios.post(
            'http://localhost:5000/api/admin/add-doctor',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${aToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (response.data.success) {
            toast.success(response.data.message);
            setDocImg(null);
            setName('');
            setEmail('');
            setPassword('');
            setFees('');
            setExperience('1 Year');
            setAbout('');
            setSpeciality('General Physician');
            setAddress1('');
            setAddress2('');
        } else {
            toast.error(response.data.message);
        }
    } catch (error) {
     
        console.error("API call error:", error.response ? error.response.data : error.message);
        toast.error(error.response?.data?.message || "Something went wrong!");
    
    
    }
};

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Preview"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor
            <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1} Year`}>
                    {i + 1} Year{i > 0 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
              >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setEducation(e.target.value)}
                value={education}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2 mb-2"
                type="text"
                placeholder="Line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Line 2"
                required
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            placeholder="Write about doctor"
            rows={5}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
