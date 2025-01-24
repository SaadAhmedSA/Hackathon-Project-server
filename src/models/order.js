import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref:"User"
    },
    product: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required : true
    },
    price: {
        type : Number,
        required : true,
        min:[0,"Must be positive number"]
    },
    orderdate: {
     type:Date,
     default :Date.now
    },
    status: {
        type : String,
        enum : ["pending","completed","shipped"],
        default :"pending"
    }
   
}
,{timestamps:true}
)

export default mongoose.model("Order" , orderSchema)