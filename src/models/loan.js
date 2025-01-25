import mongoose from "mongoose";



const loanschema = new mongoose.Schema({
    selectedCategory: {
        type:String,
        required : true
    },
    selectedSubcategory: {
        type : String,
        required : true
    },
    deposit: {
        type : String,
        required : true
    },
    loanAmount: {
        type : String,
        required : true
    },
    loanPeriod: {
        type : String,
        required : true
    },
    monnthlyPayment: {
        type : String,
        required : true
    },
   
}
,{timestamps:true}
)

export default mongoose.model("loan" , loanschema)