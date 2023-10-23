const userQuery = require ('../model/query')

const sanitize = require('../common/sanitize')

const getquery = async(req,res)=>{
    try {
        let query = await userQuery.find()
        res.status(200).send({
            query,
            message:"User Data Fetch Successfull"
        })
    } catch (error) { 
        res.status(500).send({
            message:"Internal Server Error",
            errorMessage: error.message
        })
    }
}
const getqueryById =  async(req,res)=>{
    try {
        let queryId = sanitize.isString(req.params.queryId)
        let query = await userQuery.find({queryId:queryId})
        if(query)
        {
            res.status(200).send({
                query,
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

const createquery = async (req, res) => {
   
  
    try {
        const id = await sanitize.isString(req.params.id)
         console.log(id)
        if (id) {
           await userQuery.create({
            queryId:id,
            username: req.body?.username,
            query: req.body?.query,
             reply:req.body?.reply   
            })

            res.status(201).send({ message:"query created Successfully"})
        } else {
            res.status(404).json({ message: 'user with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting query From Server', error: error.message });
    }
}

const addReply = async (req, res) => {
   
    try {
        const id =sanitize.isString(req.params.id)
        
        if (id) {

            const reply = {
                queryId: id,
                username: req.body?.username,
                reply: req.body?.reply,
            }
        
           
            let query = await userQuery.findByIdAndUpdate({_id:id}, { $push: { replies: reply }},  {new: true} )
                res.json(query);

        } else {
            res.status(404).json({ message: 'query with this id not found!' })
        }

    } catch (error) {
        res.status(401).json({ message: 'Problem with Getting query From Server', error: error });
    }
}
const editqueryById = async(req,res)=>{
    try {

        const username = sanitize.isString(req.body.username)
        const query = sanitize.isString(req.body.query)
        const reply = sanitize.isString(req.body.reply)
       let userId = sanitize.isString(req.params.id)
        let user = await userQuery.findById(userId)
        console.log(userId)
        if(user)
        {
            // bad approach await userModel.updateOne({_id: userId},{$set:{firstName,lastName,email,batch,status}})
            //suggested approach
            user.username = username
            user.query = query
            user.reply = reply
           
          
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



module.exports={
     createquery, 
     getquery,
     getqueryById,
     addReply,
     editqueryById
     }



