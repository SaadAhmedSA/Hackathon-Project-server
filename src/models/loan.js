import mongoose from "mongoose";



const loanschema = new mongoose.Schema({
    catogory: {
        type:String,
        required : true
    },
    subcatogory: {
        type : String,
        required : true
    },
    deposit: {
        type : String,
        required : true
    },
    loanamount: {
        type : String,
        required : true
    },
    loanperiod: {
        type : String,
        required : true
    },
    monnthlyamount: {
        type : String,
        required : true
    },
   
}
,{timestamps:true}
)

export default mongoose.model("loan" , loanschema)