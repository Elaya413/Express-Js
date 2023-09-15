const{mongodb,client,dbName} = require('../config/dbconfig')
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
   await client.connect();
   try {
       let db = await client.db(dbName)
       let data = await db.collection('users').find().toArray();
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
   finally{
       await client.close()
   }
}

const getUsersById = async(req,res)=>{
   await client.connect()
   try{
     let db = await client.db(dbName)
     let userId = new mongodb.ObjectId(req.params.id)
     let data = await db.collection('users').findOne({_id: userId})
      if (data)
      {
    res.status(200).send({
        data,
        message:"User Data Fetch Successful"
    })

      }
      else
      res.status(400).send({message:"Invalid user Id"})
   
   } catch(error){
      res.status(500).send({
         message:"Internal server error",
         errormessage:error.message
      })
   }
   finally{
      await client.close()
   }
}

const createUser = async(req,res)=>{
   await client.connect();
   try{
      const db = client.db(dbName);
      let existingUser = await db.collection('users').findOne({email:req.body.email})
      if(!existingUser )
      {
        await db.collection ('users').insertOne(req.body)
         res.status(200).send({
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
   }
finally{
   await client.close()
}
}

const editUserById = async(req,res)=>{
   await client.connect();
   try{
      let db = await client.db(dbName)
      let userId = new mongodb.ObjectId(req.params.id)
      let data = await db.collection ('users').findOne({_id: userId})
      if(data)
      {
         await db.collection('users').updateOne({_id: userId},{$set:req.body})
         res.status(200).send({
      
        message:"User Data edited Successful"
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
   finally{
      await client.close()
   }
}


const deleteUserById = async(req,res)=>{
   await client.connect();
   try{
      let db = await client.db(dbName)
      let userId = new mongodb.ObjectId(req.params.id)
      let data = await db.collection ('users').findOne({_id: userId})
      if(data)
      {
         await db.collection('users').deleteOne({_id: userId})
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

finally{
   await client.close()
}
}



   module.exports={
    getUsers,
    getUsersById,
    createUser,
    editUserById,
    deleteUserById
   }
