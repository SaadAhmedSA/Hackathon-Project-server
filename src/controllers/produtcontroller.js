  
  import mongoose from "mongoose";
  import Product from "../models/product.js"
  import jwt from "jsonwebtoken"
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

  const Addproduct = async (req, res) => {

    const {name,description,price,user}= req.body;

    if(!name || !description || !price || !user)
        return res.send({message:"All feild required"})

  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }
let imageurl = null
imageurl = await imageuploadtocloudinary(req.file.path)
  

    const newproduct = await Product.create({
     name,
     description,
     price,
     user,
     image : imageurl ,
    });

    if(!newproduct) return res.json({message : "error occured"})
    const populatedProduct = await Product.findById(newproduct._id).populate('user', 'username email'); 

    res.status(201).json({
      message: "product created successfully",
      product: populatedProduct,
    });
  
};
//getAllblog
const getall = async (req,res) => {
    

   const page = req.query.page || 1
   const limit = req.query.limit || 10
   const skip = (page - 1) * limit
    const All = await Product.find({}).limit(limit).skip(skip).populate('user', 'username email').populate({
        path: "orderitems", 
        populate: {
          path: "user product", 
          select: "username email name description price",
        },
      })
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
  
  
export {Addproduct,getall,Editproduct,Deleteproduct,singleproduct}