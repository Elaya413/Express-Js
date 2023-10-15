const mongoose = require('./index')

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:validateEmail,
            message:"Invalid Email Id"
        }    
    },
    password:{
        type:String,
        required:true
    },
    batch:{
        type:String,
        required:true
    },
   
    role:{
        type:String,
        default:'student'
    },
    query:{
        type:String
    }
    

},{versionKey:false,collection:"users"})

const userModel = mongoose.model('users',userSchema)

module.exports = userModel;