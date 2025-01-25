  
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
//getAllblog
const getallloan = async (req,res) => {
    
    const All = await loan.find({})
    res.json({
        All
    })
}

//deleteblog
const Deleteproduct = async (req,res) => {

      const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
    return res.json({message : "Not a vaild Id"})

    const deleteproduct = await Product.findOneAndDelete(id)

    if(!deleteproduct) return res.json({message:"Product not found"})

        res.json({
            message : "deleted successfully"
        })
   
}
//Editblog  
const Editproduct = async (req,res) => {

   const { id } = req.params;
   if(!mongoose.Types.ObjectId.isValid(id))
    return res.json({message : "Not a vaild Id"})
const {name,description,price} = req.body

const edit = await Product.findByIdAndUpdate(
    id,
    { name, description, price },
    { new: true, runValidators: true } 
  ).populate('user', 'username email');

    if(!edit) return res.json({message:"product not found"})

        res.json({
            message : "edited successfully",
            edit
        })
   
}
const singleproduct = async(req,res)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id))
     return res.json({message : "Not a vaild Id"})
    
    // Find the product by ID
    const product = await Product.findById(id).populate('user', 'username email');
    if(!product) res.json({message : "Product Not Found"})
 
   res.json({
    product
   })
}
  
  
export {Addloan,getallloan}