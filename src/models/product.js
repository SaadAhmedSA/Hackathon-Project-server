import mongoose from "mongoose";



const prouctSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    price: {
        type : Number,
        required : true
    },
    image: {
        type : String,
        required : true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    orderitems:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order"
    }]
}
,{timestamps:true}
)

export default mongoose.model("Product" , prouctSchema)