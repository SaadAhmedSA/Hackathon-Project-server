  
  import mongoose from "mongoose";
  import loan from "../models/loan.js"
  import { v2 as cloudinary} from "cloudinary"
  import fs from "fs"
  
  
 // Configuration
 cloudinary.config({ 
    cloud_name: 'dlvklue5t', 
    api_key: '437589555533986', 
    api_secret: 'pLmCAlttNk-YV2BHgb4aNENZH_M' // Click 'View API Keys' above to copy your API secret
  });
  // upload image
  const imageuploadtocloudinary = async (localpath) =>{
    try {
      const uploadResult = await cloudinary.uploader
      .upload(
          localpath, {
             resource_type : "auto"
          }
      ) 
      fs.unlinkSync(localpath);
      return uploadResult.url
    } catch (error) {
      fs.unlinkSync(localpath)
     return null
    }
  }
  
  
  //Addproduct

  const Addloan = async (req, res) => {



    const newloan = await loan.create({
    ...req.body
    });

   
    res.status(201).json({
      message: "loan created successfully",
      data: newloan,
    });
  
};

//get
//getAllblog

const getallloan = async (req,res) => {
    
    const All = await loan.find({})
    res.json({
        All
    })
}
const getbyemail = async (req,res) => {
    const {email}=req.body

    const All = await loan.find({email})
    res.json({
        loans:All
    })
}

  
  
export {Addloan,getallloan,getbyemail}