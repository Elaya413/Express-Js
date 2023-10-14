
const userModel = require('../model/users')
const queryModel = require('../model/query')
const auth = require('../common/auth')
const sanitize = require('../common/sanitize')
const getUsers = async(req,res)=>{
    try {
        let data = await userModel.find()
        res.status(200).send({
            data,
            message:"User Data Fetch Successfull"
        })
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}
const getUserById =  async(req,res)=>{
    try {
        let userId = sanitize.isString(req.params.id)
        let data = await userModel.findById(userId)
        if(data)
        {
            res.status(200).send({
                data,
                message:"User Data Fetch Successfull"
            })
        }
        else
            res.status(400).send({message:"Invalid User ID"})
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const createUser = async(req,res)=>{
    try {
        const firstName = sanitize.isString(req.body.firstName)
        const lastName = sanitize.isString(req.body.lastName)
        const email = sanitize.isString(req.body.email)
        const batch = sanitize.isString(req.body.batch)
        const status = sanitize.isBoolean(req.body.status)
        let password = sanitize.isString(req.body.password)

        password = await auth.hashPassword(password)

       let existingUser = await userModel.findOne({email:email})
       if(!existingUser)
       {
            await userModel.create(
                {
                    firstName,
                    lastName,
                    email,
                    batch,
                    status,
                    password
                })

            res.status(200).send({
                message:"User Created Successfully"
            })
       }
       else
       {
        res.status(400).send({
            message:`${req.body.email} already exists`
        })
       }
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const editUserById = async(req,res)=>{
    try {

        const firstName = sanitize.isString(req.body.firstName)
        const lastName = sanitize.isString(req.body.lastName)
        const email = sanitize.isString(req.body.email)
        const batch = sanitize.isString(req.body.batch)
        const status = sanitize.isBoolean(req.body.status)

        let userId = sanitize.isString(req.params.id)
        let user = await userModel.findById(userId)
        if(user)
        {
            // bad approach await userModel.updateOne({_id: userId},{$set:{firstName,lastName,email,batch,status}})
            //suggested approach
            user.firstName = firstName
            user.lastName = lastName
            user.email = email
            user.batch = batch
            user.status = status
            await user.save()

            res.status(200).send({
                message:"User Data Edited Successfully"
            })
        }
        else
            res.status(400).send({message:"Invalid User ID"})
        
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const deleteUserById = async(req,res)=>{
    try {
        let userId = sanitize.isString(req.params.id)
        let data = await userModel.findById(userId)
        if(data)
        {
            await userModel.deleteOne({_id:userId})
            res.status(200).send({
                message:"User Data Deleted Successfully"
            })
        }
        else
        {
            res.status(400).send({
                message:"Invalid User ID"
            })
        }
        
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const loginUser = async(req,res)=>{
    try {
        let email = sanitize.isString(req.body.email)
        let password = sanitize.isString(req.body.password)
       let role = sanitize.isString(req.body.role)
        let user = await userModel.findOne({email:email})
         if(user)
        { 
            
            if(await auth.comparePassword(password,user.password))
            {
                let token = await auth.createToken({email:user.email,role:user.role,firstName:user.firstName,lastName:user.lastName})
                if(token)
                {
                    let payload = await auth.decodeToken(token)
                   let Role = await payload.role
                    if(Role === 'mentor')
                    res.status(200).send({message:"mentor login successfully",token,Role}) 
                    else
                        res.status(200).send({message:"student login successfully",token,Role})
                }
               // res.status(200).send({message:"Login Successfull",token})
            }
            
            else
            {
                res.status(400).send({message:"Invalid password"})
            }
        }
        else
        {
            res.status(400).send({message:"Invalid email address"})
        }
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const changePassword = async(req,res)=>{
    try {
        let userId = sanitize.isString(req.params.id)
        let password = sanitize.isString(req.body.password)
        let user = await userModel.findById(userId)
        if(user)
        {
            user.password = await auth.hashPassword(password)
            await user.save()
            res.status(200).send({
                message:"Password Changed Successfully"
            })
        }
        else
        {
            res.status(400).send({message:"Invalid User"})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}

const createquery = async(req,res)=>{
    try {
        const name= sanitize.isString(req.body.name) 
       
        const query = sanitize.isString(req.body.query) 
       
             await queryModel.create({name,query})
              res.status(200).send({
                 message:"query Created Successfully"
             })
       
     } catch (error) { 
         res.status(500).send({
             message:"Internal Server Error",
             errorMessage: error.message
         })
     }
 }


module.exports={
    getUsers,
    getUserById,
    createUser,
    editUserById,
    deleteUserById,
    loginUser,
    changePassword,
    createquery
}