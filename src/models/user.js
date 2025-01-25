import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        trim : true
    },
    email :{ 
        type : String,
        unique : true,
        required : [true , "Email is Required"],
        trim : true
    },
    cnic: {
        type: String,
        required: [true ,"cnic is required"],
        minlength: 13,
        // maxlength: 13,
    },
    password: {
        type: String,
        required: [true ,"password is required"],
        unique:true
        // maxlength: 13,
    },
   role:{
     type:String,
     enum:["admin","user"],
     default:"user"
   },
 
}
,{timestamps : true}
)



  export default mongoose.model("User" , userSchema)
  