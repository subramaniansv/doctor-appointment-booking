import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import userModel from '../models/userModels.js'
import jwt from "jsonwebtoken"
import appointmentModel from '../models/appointmentModel.js';
// API for adding a doctor
const addDoctor = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);  // This will show the uploaded image

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // Validate required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({
                success: false,
                message: 'Missing Details'
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Enter a valid email'
            });
        }

        // Validate password
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Enter a strong password (min. 8 characters)'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Handle image upload
        let imageUrl = '';
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = imageUpload.secure_url;
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address,
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({
            success: true,
            message: 'Doctor added successfully'
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
// admin login
const loginAdmin = async (req,res) =>{
    try {
        
        const{email,password}=req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})

        }else{
            res.json({
                success:false,
                message:"invalid credentials"
            })
        }


    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
        
    }
};
//Api to get all doctors in admin
const allDoctors = async(req,res)=>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
};
//APi to get all appointments list 
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//api to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
      const {appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
  
      
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      // remove doctor slots
      const { docId, slotDate, slotTime } = appointmentData;
      const doctorData = await doctorModel.findById(docId);
      let slots_booked = doctorData.slots_booked;
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
  
      await doctorModel.findByIdAndDelete(docId, { slots_booked });
      res.json({ success: true, message: "Appointment Cancelled" });
    } catch (error) {
      console.error(error);
      res.json({
        success: false,
        message: error.message,
      });
    }
  };
// api for dashboard data 
const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData ={
            doctors:doctors.length,
            appointments:appointments.length,
            patient:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,
            dashData
        })

    } catch (error) {
        console.error(error);
        res.json({
          success: false,
          message: error.message,
        }); 
    }
}
export { addDoctor, loginAdmin , allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard};
