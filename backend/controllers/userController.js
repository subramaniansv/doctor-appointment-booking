import validator from "validator";
import bcrypt from "bcrypt";
import userModel from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "invalid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Use a Strong Password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    res.json({success:true,token})

  } catch (error) {
    console.error(error);
    res.json({
      success:false,
      message:error.message
  })
    
  }
};
// user login

const loginUser = async (req,res)=> {
  try {
    const {email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
     return res.json({
        success:false,
      message:"no user found"
      })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(isMatch){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
      res.json({
        success:true,
        token
      })
    }else{
     res.json({
        success:false,
        message:"incorrect password"
      })
    }

  } catch (error) {
    console.error(error);
    res.json({
      success:false,
      message:error.message
  })
  }
}

//user profile

const getProfile = async(req,res) =>{
  try {
    const {userId} = req.body
    const userData = await userModel.findById(userId).select('-password')

    res.json({
      success:true,userData
    })
  } catch (error) {
    console.error(error);
    res.json({
      success:false,
      message:error.message
  })
  }
}
//api update user profile
const updateProfile = async (req,res) => {
  try {
    const {userId, name, phone, address, dob, gender} = req.body
    const imageFile = req.file
    if(!name || !phone || !gender || !dob){
        return res.json({
          success:false,message:"Data missing"
        })
    }
    await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
      const imageURL = imageUpload.secure_url


      await userModel.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true,message:"Profile updated"})

  } catch (error) {
    console.error(error);
    res.json({
      success:false,
      message:error.message
  })
}
}

export {registerUser , loginUser, getProfile, updateProfile}
