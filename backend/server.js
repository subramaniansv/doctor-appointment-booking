import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'



//app configuration
const app = express()

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
//middlewares
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both user and admin frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'atoken'], // Add "token"
    credentials: true 
}));


//api endpoint
app.use('/api/admin', adminRouter);
        //localhost:5000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get('/', (req,res)=>{
    res.send("home is great")
})
app.listen(port, ()=>{
    console.log("Server started", port)
})