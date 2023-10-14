const mongoose = require('./index')

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
   
    },
    lastName:{
        type:String,
       
    },
    email:{
        type:String,
       
        validate:{
            validator:validateEmail,
            message:"Invalid Email Id"
        }    
    },
    password:{
        type:String,
       
    },
    batch:{
        type:String,
        
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