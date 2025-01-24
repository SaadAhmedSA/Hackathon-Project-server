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
    password: {
        type: String,
        required: [true ,"Password is required"],
        minlength: 6
    },
   role:{
     type:String,
     enum:["admin","user"],
     default:"user"
   },
   products:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
}],
   orders:[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "orders"
}]
}
,{timestamps : true}
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  export default mongoose.model("User" , userSchema)
  