const data =[
   {
      "firstName":"sandy",
      "lastName":"sandy",
      "email":"sandy@gmail.com",
      "batch":"B46WET",
      "status":false
  },
  {
   "firstName":"anbu",
   "lastName":"selvam",
   "email":"anbu@gmail.com",
   "batch":"B46WET",
   "status":true
},
{
   "firstName":"selvi",
   "lastName":"babu",
   "email":"babu@gmail.com",
   "batch":"B46WET",
   "status":true
}
]
const getUsers = async(req,res)=>{
   try{
    res.status(200).send({
        data:[],
        message:"User Data Fetch Successful"
    })
   } catch(error){

   }
}

const getUsersById = async(req,res)=>{
   try{
      let userId = Number(req.params.id)
      if(userId<data.length)
      {
    res.status(200).send({
        data:data[userId],
        message:"User Data Fetch Successful"
    })

   }
   else{
      res.status(400).send({
        message:"Invalid User ID"
      })
   }
   } catch(error){
      res.status(500).send({
         message:"Internal server error",
         errormessage:error.message
      })
   }
}

const createUser = async(req,res)=>{
   try{
      let validateData = data.filter((e)=>e.email===req.body.email)
      if(validateData.length===0)
      {
         data.push(req.body)
         res.status(201).send({
           message:"User Data Created Successfully"
         })

         
      }
     else
      {
        res.status(400).send({   
             message:`${req.body.email}already exists`
          })
     }
   }
   catch (error){
         
         res.status(500).send({
            message:"Internal server error",
            errormessage:error.message
         })
   }}

const editUserById = async(req,res)=>{
   try{
      let userId = Number(req.params.id)
      if(userId<data.length)
      {
         data.splice(userId,1,req.body)
    res.status(200).send({
      
        message:"User Data Edited Successful"
    })

   }
   else{
      res.status(400).send({
        message:"Invalid User ID"
      })
   }
   } catch(error){
      res.status(500).send({
         message:"Internal server error",
         errormessage:error.message
      })
   }
}


const deleteUserById = async(req,res)=>{
   try{
      let userId = Number(req.params.id)
      if(userId<data.length)
      {
         data.splice(userId,1)
    res.status(200).send({
        
        message:"User Data deleted Successful"
    })

   }
   else{
      res.status(400).send({
        message:"Invalid User ID"
      })
   }
   } catch(error){
      res.status(500).send({
         message:"Internal server error",
         errormessage:error.message
      })
   }
}


   module.exports={
    getUsers,
    getUsersById,
    createUser,
    editUserById,
    deleteUserById
   }
