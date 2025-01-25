import User from "../models/user.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import { v2 as cloudinary} from "cloudinary"
import fs from "fs"



const generateAccessToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET , {expiresIn: '6h'});
}
const generateRefreshToken = (user) =>{ 
    return jwt.sign({ email: user.email }, process.env.REFRESH_JWT_SECRET , {expiresIn: '7d'});
}
const generateRandomPassword = (length = 8) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
//  // Configuration
//  cloudinary.config({ 
//   cloud_name: 'dlvklue5t', 
//   api_key: '437589555533986', 
//   api_secret: 'pLmCAlttNk-YV2BHgb4aNENZH_M' // Click 'View API Keys' above to copy your API secret
// });
// // upload image
// const imageuploadtocloudinary = async (localpath) =>{
//   try {
//     const uploadResult = await cloudinary.uploader
//     .upload(
//         localpath, {
//            resource_type : "auto"
//         }
//     ) 
//     fs.unlinkSync(localpath);
//     return uploadResult.url
//   } catch (error) {
//     fs.unlinkSync(localpath)
//    return null
//   }
// }

// Register user

const registeruser = async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'celestine.monahan@ethereal.email',
        pass: 'wj9FWKQewfZ2nGsPUW'
    }
});
  try {
    const { email, cnic, name } = req.body;

    // Validate required fields
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!cnic) return res.status(400).json({ message: "Password is required" });
    if (!name) return res.status(400).json({ message: "Username is required" });
   

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });
   const password = generateRandomPassword()
  //  const hashedPassword = await bcrypt.hash(password, 8);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password,
      cnic,
  
    });
    const mailOptions = {
      from: "celestine.monahan@ethereal.email",
      to: email,
      subject: "Welcome! Your Account Details",
      text: `Hello ${name},\n\nYour account has been created successfully.\nHere are your login details:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and change your password.\n\nBest regards,\nYour Team`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

 // login user
const loginUser = async (req,res) =>{

    const {email,password} = req.body;

    if(!email)return res.json({mesaage:"email is required"})
     if(!password)return res.json({mesaage:"password is required"})

     const user = await User.findOne({email})   
     if(!user) return res.status(404).json({mesaage : "User not found"})
      
    //   const validpassword = await bcrypt.compare(password,user.password)  
    //  if(!validpassword) return res.status(400).json({message :"inncorrect password"}) 
  //     //Token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
      // cookies
  res.cookie("refreshToken", refreshToken, { http: true, secure: true });

  res.json({
    message: "user loggedIn successfully",
    accessToken,
    refreshToken,
    data: user,
  
  });  
}
/// logout
const logout = async (req,res) => {
    res.clearCookie("refreshToken");
    res.send({
     mesaage:"logout Successfully"
    })
 
 }
// refresh tokrn
const authcheck = async(req,res)=>{
    const Token = req.cookies.refreshToken || req.body.refreshToken;
    if(!Token) return res.send({message : "Token not found"})
  
    const decoded = jwt.verify(Token, process.env.REFRESH_JWT_SECRET);
  
     const user = await User.find({email : decoded.email}) 
     
    if (!user) return res.status(404).json({ message: "invalid token" });
  
    const generatedToken = generateAccessToken(user);

    res.json({ message: "new access token generated", accesstoken: generatedToken,decoded });
  
  }


 export {registeruser,loginUser,logout,authcheck}